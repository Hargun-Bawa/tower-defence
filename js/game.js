
/**
 * game and state together hold the random functions and game information that needs to be accessed across the file.
 * update it whenever you need to add something at agame level 
 */
// Global TODO
// Music/sound - Ron
// Levels/increasing difficulty . Maybe a day night cycle to signify increased difficulty? - Hargun
// Extra types of towers - Hieu
// Turret UPgrades
// Hud for turret selection
// Enemy types - Saul
// Flying enemy 
// Boss monster/ seige weapon
// High Score
// terrain collision
// Turrets spawn at cursor instead of where player is standing 
// Off limit building paths
// See through/semi transparent hud 

// onHOver?  cursor hover for upgrade details for individual towers?
// alternatively, 
export const state = {
    EnemySpawner: [],
    //this is the function that spawns enemeies
    spawn: null,
    spawnedEnemies: 0,
    currentEnemies: [],
    maxEnemies: 15,
    enemiesDestroyed: 0,


    health: 100,
    getHealth: function () { return this.health.toString() },
    getCurrency: function () { return this.currency.toString() },

    turretSpawner: [],
    turrets: [],
    buildT: null, 
    spawnedTurrets: 0,
    maxTurrets: 10,
    currency: 50,

    needsUpdate: false,
    gameOver: false,
    selectedTurret : "drone",
    ship: null,
    shipHit:null,
    buildTime : 15,

    levelUp : null,
    pauseEnemies: true,
    pauseBuilding: false,

}
 