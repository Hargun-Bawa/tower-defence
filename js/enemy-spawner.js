import { Component, Type, Property } from '@wonderlandengine/api';
import { state } from "./game";
import { WaypointMovement } from "./waypoint-movement";


/**
 * enemy-spawner
 */

const tempQuat2 = new Float32Array(8);
export class EnemySpawner extends Component {
    static TypeName = 'enemy-spawner';
    /* Properties that are configurable in the editor */
    static Properties = {
        defaultMesh: { type: Type.Mesh },
        defaultMaterial: { type: Type.Material },
        spawnTimer: { type: Type.Int, default: 15 },
    };

    // The game file contains the state object, the init function adds a function
    // called spawn to the state file, assigns the calling object as the spawnpoint,
    // and instatniates the timer for spawn delay
    init() {
        this.timer = 0;
        state.EnemySpawner.push(this);
        this.name = "paul";
        state.spawn = function (object) {

            let enemy = object.spawnEnemy();
        }.bind(this);
    }
    start() {
        console.log("start");
        console.log(this.name);
    }
    // Not exactly sure why we need this but we do
    static onRegister(engine) {
        engine.registerComponent(WaypointMovement);
    }
    // spawns a new enemy every 5 seconds 
    // TODO add a spawntimer function and use that instead of hardcoding the time
    update(dt) {
        this.timer += dt;
        if (this.timer > 5) {
            this.timer = 0;
            state.spawn(this);
        }
    }
    // TODO add a onHIt function to the object that is spawned 

    spawnEnemy() {
        // this creates an object and adds it to the current wonderland scene
        const obj = this.engine.scene.addObject();
        state.currentEnemies.push(obj);
        // Sets the location of the new object to be the same as the spawn point
        obj.setTransformLocal(this.object.getTransformWorld(tempQuat2));
        // adds mesh to the new object referenving the mesh designated by the
        //spawning object in the editor
        const mesh = obj.addComponent('mesh');
        mesh.mesh = this.defaultMesh;
        mesh.material = this.defaultMaterial;
        mesh.active = true;
        // grants the new enemy object a collision box

        const trigger = this.engine.scene.addObject(obj);
        trigger.addComponent("collision", {
            shape: WL.Collider.Sphere,
            extents: [5, 0, 0],
            group: 1 << 1,
            active: true,
        });
        // potential distance traveled for enemy selection
        obj.walked = 0;

        obj.health = 50;
        // create a new object that is a copt of the Waypoint Movement object 
        // belonging to the spawner
        let o = this.object.getComponent(WaypointMovement);

        //This code is meant to be how we track the health of the enemies, currently not doing anything
        obj.f = function () {
            state.health -= 5;
            const index = state.currentEnemies.indexOf(obj);
            const x = state.currentEnemies.splice(index, 1);
            console.log('boop');
            obj.destroy()
        };

        // Add the copied movement object to the new enemy, including
        // the pathObject of the parent specified in the editor

        obj.addComponent(WaypointMovement, o);
        obj.active = true;
        obj.name = "dave";
        obj.setDirty();
    }
}