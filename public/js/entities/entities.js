game.PokemonEntity = me.ObjectEntity.extend({
  init: function(x, y, pokeID) {
    var settings = {
        spritewidth: 32,
        spriteheight: 32,
        width: 32,
        height: 32,
        image: "pokemon",
      };
    this.parent(x, y, settings);
    this.destination = { x: this.pos.x + this.hWidth, y: this.pos.y + this.hHeight };

    function getAnimation(direction) {
      var offset = 0;
      offset = (Math.floor((pokeID - 1) / 2) * 16);
      if (pokeID % 2 === 0) { offset += 2; }
      if (direction === 'still') { return [offset + 12]; }
      if (direction === 'left') { offset += 1; }
      else if (direction === 'down') { offset += 8; }
      else if (direction === 'right') { offset += 9; }
      return [offset, offset + 4];
    }

    this.renderable.addAnimation('still', getAnimation('still'));
    this.renderable.addAnimation('up', getAnimation('up'));
    this.renderable.addAnimation('left', getAnimation('left'));
    this.renderable.addAnimation('down', getAnimation('down'));
    this.renderable.addAnimation('right', getAnimation('right'));
    this.renderable.setCurrentAnimation("still");
    //this.collidable = false;
  },

  move: function(x, y) {
    this.destination = { x: x, y: y };

    var angle = this.angleToPoint(this.destination);
    var distance = this.distanceToPoint(this.destination);
    if (distance < 1) {
      this.vel.x = 0;
      this.vel.y = 0;
    } else {
      this.vel.x = Math.cos(angle);
      this.vel.y = Math.sin(angle);
      var minAngle = Math.PI / 4;
      var animation =  (-minAngle < angle && angle < minAngle) ? 'right' :
                       (-minAngle*3 < angle && angle < -minAngle) ? 'up' :
                       (minAngle < angle && angle < minAngle*3) ? 'down' :
                       (minAngle*3 < angle || angle < -minAngle*3) ? 'left' :
                       'still';
      this.renderable.setCurrentAnimation(animation);
    }
    this.updateMovement();
  },

  update: function() {
    var distance = this.distanceToPoint(this.destination);
    if (distance < 1) {
      this.vel.x = this.vel.y = 0;
    }

    this.updateMovement();

    if (this.vel.x !== 0 || this.vel.y !== 0) {
      this.parent();
      return true;
    }
  }
});

game.PlayerEntity = game.PokemonEntity.extend({
  init: function(x, y, pokeID) {
    this.parent(x, y, pokeID);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
  },

  update: function() {
    var distance = this.distanceToPoint(this.destination);
    if (distance > 1) {
      return this.parent();
    }

    var change = { x: 0, y: 0 };
    if (me.input.isKeyPressed('left')) {
      change.x = -32;
    } else if (me.input.isKeyPressed('right')) {
      change.x = +32;
    } else if (me.input.isKeyPressed('up')) {
      change.y = -32;
    } else if (me.input.isKeyPressed('down')) {
      change.y = +32;
    }
    if (change.x !== 0 || change.y !== 0) {
      var movement = {
        x: this.pos.x + change.x + this.hWidth,
        y: this.pos.y + change.y + this.hHeight
      };
      socket.emit('game.move', movement);
    }
    return this.parent();
  }
});
