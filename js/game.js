
/**
 * game and state together hold the random functions and game information that needs to be accessed across the file.
 * update it whenever you need to add something at agame level 
 */
export const state = {
    EnemySpawner: [],
    spawn: null,
    currentEnemies: [],
    health: 100,
    getHealth: function () { return this.health.toString() },
    getCurrency: function () { return this.currency.toString() },
    currUI: null,
    turretSpawner: [],
    turrets: [],
    buildT: null, spawned: 0,
    currency: 50,
    needsUpdate: false,

}