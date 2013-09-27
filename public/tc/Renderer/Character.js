(function () {
  var Character = Class({
    construct: function construct(options) {
      this.pos = { x: options.x, y: options.y };
      this.entity = me.entityPool.newInstanceOf('npc', 0, 0, options.pokeID);
      var enginePosition = this.enginePosition();
      this.entity.pos.x = enginePosition.x - this.entity.hWidth;
      this.entity.pos.y = enginePosition.y - this.entity.hHeight;
      this.show();
    },

    enginePosition: function enginePosition(pos) {
      if (typeof pos === 'undefined') { pos = this.pos; }
      return {
        x: pos.x * 16 + this.entity.hWidth,
        y: pos.y * 16 + this.entity.hHeight
      };
    },

    show: function show() {
      me.game.add(this.entity, 2);
      me.game.sort();
    },

    hide: function hide() {
      me.game.remove(this.entity);
      me.game.sort();
    },

    move: function move(direction) {
      if (['up', 'down', 'left', 'right'].indexOf(direction) === -1) { return; }

           if (direction === 'up')    { this.pos.y -= 1; }
      else if (direction === 'down')  { this.pos.y += 1; }
      else if (direction === 'left')  { this.pos.x -= 1; }
      else if (direction === 'right') { this.pos.x += 1; }
      this.updatePosition(this.pos);
    },

    updatePosition: function updatePosition(pos) {
      this.entity.destination.push(this.enginePosition(pos));
      this.entity.updateMovement();
    },

    setAnimation: function setAnimation(name, nextAnimation) {
      if (arguments.length > 1) {
        console.log('TCClient.Renderer.Character.setAnimation() has not been tested with two animations');
      }
      this.entity.renderable.setCurrentAnimation.apply(this.entity.renderable, arguments);
      tc.Renderer.engine.game.sort();
    },
  });

  tc.Renderer.CharacterManager.CharacterClass = Character;
}());
