import {Component, Property, Type} from '@wonderlandengine/api';
import { ProjectilePhysics } from './projectile-physics';
import {state} from './game'
/**
 * projectile-spawner
 */
const tempquat2 = new Float32Array(8);
export class ProjectileSpawner extends Component {
    static TypeName = 'projectile-spawner';

    static onRegister(engine)
    {
        engine.registerComponent(ProjectilePhysics);
    }
    init() {    

        // grants the shoot function to the Object3D that projectileSpawner is attatcehd to
        // also sets the physics object that will be attatched to the projectiles, and the direction to be launched
        console.log("Projectile spawner new+!");
        this.timer = 0;    
        this.object.shoot =function(dir){
           let projectile = this.spawn();
            projectile.physics.dir.set(dir);
                        projectile.object.setDirty();
            projectile.physics.active = true;       
    }.bind(this);

    };
    start() {
        console.log("projectile-spawner");
    }    
    spawn(){
        const obj = this.engine.scene.addObject();
        let mesh = obj.addComponent('mesh', this.object.getComponent('mesh'));
        mesh.active= true;
        obj.addComponent('collision', {shape:WL.Collider.Sphere, extents: [ 0.05, 0,0], group: 1 << 0 })
        obj.name = "steven";
        obj.setPositionLocal(this.object.getPositionWorld());
        const physics = obj.addComponent(ProjectilePhysics, { speed: .2});
        physics.active = true;
        return { object: obj, physics: physics};
    }




}
