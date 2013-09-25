game.PlayScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
    me.levelDirector.loadLevel("area01");
    var player = new game.PlayerEntity(192, 192, 7);
    me.game.add(player, 1001);

    //me.game.add(new game.PlayerEntity(32,32,3));
    //me.game.add(new game.PlayerEntity(64,64,4));
    //me.game.add(new game.PlayerEntity(96,96,5));

    me.game.sort();
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});
