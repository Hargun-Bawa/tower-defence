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
  
    }
    update(dt) {
        if (this.day) {
            this.timer += dt;
            if (this.timer > state.buildTime) {
                this.timer = 0;
                state.pauseEnemies = false;
                state.pauseBuilding = true;
            }
        }
        if(state.enemiesDestroyed >= 2)
        {
            this.levelUp();
            state.currency += this.level * 5;
            state.enemiesDestroyed = 0; 
            state.maxEnemies += 5;
            state.pauseEnemies = true;
            state.pauseBuilding = false;
        }
    }

    levelUp(){
        console.log("levelup!");
        this.level +=1;
        this.maxEnemies += 10;
        let spawner = state.EnemySpawner;
            for(let i = 0; i < state.EnemySpawner.length; i++)
        {
            spawner[i].defaultReward += 1;
        }
        if(this.level % 2 === 0 )
        {
            for(let i = 0; i < state.EnemySpawner.length; i++)
            {

                spawner[i].defaultHeath += 25;
            }
        }
        if(this.level % 3 === 0){
            for(let i = 0; i < state.EnemySpawner.length; i++)
            {
                spawner[i].defaultDamage += 5;
            }
        }
        if(this.level % 4 === 0)
        {
            for(let i = 0; i < state.EnemySpawner.length; i++)
            {
                spawner[i].defaultSpeed += .1;
            }
        }
        if(this.level % 5 === 0 )
        {   
            for(let i = 0; i < state.EnemySpawner.length; i++)
            {
                spawner[i].spawnTimer -= .3;
            }
        }
    }
}
