import { Component, Type, Property } from '@wonderlandengine/api';
import { state } from './game';
/**
 * level-tracker
 */
export class LevelTracker extends Component {
    static TypeName = 'level-tracker';
    /* Properties that are configurable in the editor */
    static Properties = {
        level: { type: Type.Int, default: 1 },
        timer: { type: Type.Int, default: state.timer },
        day: { type: Type.Bool, default: true },

    };

    init() {
        this.level = 0;
    }
    start(){
    }
    update(dt) {
        if (this.day) {
            this.timer += dt;
            if (this.timer > state.buildTime) {
                this.day = false;
                this.timer = 0;
                state.pauseEnemies = false;
                state.pauseBuilding = true;
            }
        }
        if(state.enemiesDestroyed > state.maxEnemies)
        {
            levelUp();
            state.currency += this.level * 5;
            this.day = true;
            state.enemiesDestroyed = 0; 
            state.maxEnemies += 5;
            state.pauseEnemies = true;
            state.pauseBuilding = false;
        }
    }

    levelUp(){
        this.level +=1;
        this.maxEnemies += 10;
        for(spawner in state.EnemySpawner)
        {
            spawner.defaultReward += 1;
        }
        if(this.level % 2 === 0 )
        {
            for(spawner in state.EnemySpawner)
            {
                spawner.defaultHeath += 25;
            }
        }
        if(this.level % 3 === 0){
            for(spawner in state.EnemySpawner)
            {
                spawner.defaultDamage += 5;
            }
        }
        if(this.level % 4 === 0)
        {
            for(spawner in state.EnemySpawner)
            {
                spawner.defaultSpeed += .1;
            }
        }
        if(this.level % 5 === 0 )
        {      for(spawner in state.EnemySpawner)
            {
                spawner.spawnTimer -= .3;
            }
        }
    }

}
