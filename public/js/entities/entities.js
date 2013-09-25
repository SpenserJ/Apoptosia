game.PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, pokeID) {
    var settings = {
        spritewidth: 32,
        spriteheight: 32,
        width: 32,
        height: 32,
        image: "pokemon",
      };
    this.parent(x, y, settings);

    function getAnimation(direction) {
      var offset = 0;
      offset = (Math.floor((pokeID - 1) / 2) * 16);
      if (pokeID % 2 === 0) { offset += 2; }
      console.log(offset);
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
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    //this.collidable = false;
  },

  update: function() {
    this.vel.x = 0;
    this.vel.y = 0;

    if (me.input.isKeyPressed('left')) {
      this.vel.x -= 1;
      this.renderable.setCurrentAnimation('left');
    } else if (me.input.isKeyPressed('right')) {
      this.vel.x += 1;
      this.renderable.setCurrentAnimation('right');
    } else if (me.input.isKeyPressed('up')) {
      this.vel.y -= 1;
      this.renderable.setCurrentAnimation('up');
    } else if (me.input.isKeyPressed('down')) {
      this.vel.y += 1;
      this.renderable.setCurrentAnimation('down');
    }

    this.updateMovement();

    if (this.vel.x !== 0 || this.vel.y !== 0) {
      this.parent();
      return true;
    }
  }
});
