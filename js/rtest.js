import {Component, Property} from '@wonderlandengine/api';

/**
 * rtest
 */
export class Rtest extends Component {
    static TypeName = 'rtest';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    start() {
        console.log('start() with param', this.param);
    }

    update(dt) {
        this.object.rotateAxisAngleDegObject([1, 0, 0], .055555);
        /* Called every frame. */
    }
}
