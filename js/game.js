
/**
 * game and state together hold the random functions and game information that needs to be accessed across the file.
 * update it whenever you need to add something at agame level 
 */
export const state = {
    EnemySpawner : [],
    spawn: null,
    currentEnemies : [],
    currency: 0,
    health:100,
     test: function() { return this.health.toString()},
     currUI: null,
     turretSpawner: [],
     turrets: [],
     buildT : null, 
     spawned:0,
     currency: 0,

}