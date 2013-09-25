game.PlayScreen = me.ScreenObject.extend({
	onResetEvent: function() {	
    me.levelDirector.loadLevel("area01");
    me.entityPool.add("player", game.PlayerEntity);
    me.entityPool.add("npc", game.PokemonEntity);
	},
	
	onDestroyEvent: function() {
	}
});
