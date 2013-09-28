(function () {
  var Pokemon = me.ObjectEntity.extend({
    init: function(x, y, pokeID) {
      var settings = {
          spritewidth: 32,
          spriteheight: 32,
          width: 32,
          height: 32,
          image: "pokemon",
        };
      this.parent(x, y, settings);
      this.destination = [];//{ x: this.pos.x + this.hWidth, y: this.pos.y + this.hHeight };

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
    },

    calculateVelocity: function calculateVelocity(pos) {
      var angle = this.angleToPoint(pos)
        , distance = this.distanceToPoint(pos);

      if (distance < 1) {
        return { x: 0, y: 0 };
      }
      return { x: Math.cos(angle), y: Math.sin(angle) };
    },

    stop: function stop() {
      this.vel.x = this.vel.y = 0;
      this.updateMovement();
    },

    update: function update() {
      if (this.destination.length === 0) { this.stop(); return false; }
      var destination = this.destination[0]
        , distance = this.distanceToPoint(destination);
      if (distance < 1) {
        this.destination.shift();
        return this.update();
      }

      this.vel = this.calculateVelocity(destination);
      var angle = this.angleToPoint(destination)
        , minAngle = Math.PI / 4
        , animation =  (-minAngle < angle && angle < minAngle) ? 'right' :
                       (-minAngle*3 < angle && angle < -minAngle) ? 'up' :
                       (minAngle < angle && angle < minAngle*3) ? 'down' :
                       (minAngle*3 < angle || angle < -minAngle*3) ? 'left' :
                       'still';
      this.renderable.setCurrentAnimation(animation);

      this.updateMovement();

      if (this.vel.x !== 0 || this.vel.y !== 0) {
        this.parent();
        return true;
      }
      return false;
    },
  });

  ap.Renderer.loadEntityType('Pokemon', Pokemon);
}());
