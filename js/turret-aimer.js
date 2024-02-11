import { Component, Property } from '@wonderlandengine/api';

/**
 * Turretaimer
 */
export class turretAimer extends Component {
    static TypeName = 'turret-aimer';
    /* Properties that are configurable in the editor */
    static Properties = {
    };

    start() {
        console.log('start() with param', this.param);
    }
    init() {
        this.timer = 0;
        this.hits = 0;
    }
    seek() {
        let g = new Float32Array(3);
        this.object.getForwardWorld(g);
        let ray = WL.scene.rayCast(this.object.getTranslationWorld(), g, 1 << 1, 1 << 2);
        let hits = ray.hitCount;
        this.loc = ray.locations;
        this.dis = ray.distances;
        let obs = ray.objects;
        if (hits > 0) {
            this.object.target = obs[0];
            this.object.lookAt(this.object.target.getPositionWorld())
        }
        else {
            this.object.rotateAxisAngleDegObject([0, 1, 0], 5);
        }
    }

    update(dt) {
        this.timer += dt;
        let g = new Float32Array(3);


        // this function checks to see if there is an enemy target in default range
        if (this.object.target == null || this.object.target.objectId < 0) {
            this.seek();
        }
        // if there is a target in range, makes the turret look at and then fire at said target,
        // TODO find some way to lock the non Y axis rotation
        if (this.object.target && this.dis < 90 && this.object.target.isDestroyed == false) {
            this.object.lookAt(this.object.target.getPositionWorld(), [0, 1, 0]);
            if (this.timer > this.object.cd) {
                this.object.shoot(this.object.getForwardWorld(g));
                this.object.target.health -= 25;
                this.timer = 0;
            }
            this.object.target = null;
        }
    }

}
