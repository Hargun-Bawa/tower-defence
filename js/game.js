
/**
 * game and state together hold the random functions and game information that needs to be accessed across the file.
 * update it whenever you need to add something at agame level 
 */
// Global TODO
// Music/sound
// Levels/increasing difficulty . Maybe a day night cycle to signify increased difficulty?
// Extra types of towers
// Turret UPgrades
// Hud for turret selection
// Enemy types
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
    gameOver: false,
    selectedTurret : "default",
    endGame: null,
    timer: 0,
    maxEnemies: 0,
    enemiesDestroyed: 0,
    buildTime: 15,
}
 