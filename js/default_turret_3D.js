import {Component, Object3D, Property, Type} from '@wonderlandengine/api';
import {state } from './game';
/**
 * default_turret_3D
 */
export class DefaultTurret3D extends Component {
    static TypeName = 'default_turret_3D';
    /* Properties that are configurable in the editor */
    static Properties = {
        turret: {type: Type.Object},
        base:{type: Type.Object},
        bulletMesh: {type: Type.Mesh},
        bulletMaterial: {type: Type.Material}
    };

    start() {
        state.defaultTurret3D = this; }
}
