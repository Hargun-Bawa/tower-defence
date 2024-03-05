import {Component, Object3D, Property} from '@wonderlandengine/api';
import {state } from './game';
/**
 * default_turret_3D
 */
export class DefaultTurret3D extends Component {
    static TypeName = 'default_turret_3D';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    start() {

        state.defaultTurret3D = this; }
    init(){
        
        this.turret = this.object.children[0].getComponent("mesh");
        this.base = this.object.children[1].getComponent("mesh");

    }
    update(dt) {
        /* Called every frame. */
    }
}
