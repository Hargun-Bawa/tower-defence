import {Component, Property} from '@wonderlandengine/api';

/**
 * ship
 */
export class Ship extends Component {
    static TypeName = 'ship';
    /* Properties that are configurable in the editor */
    static Properties = {
        health: Property.int(100)
    };

    start() {
        console.log('start() with param', this.param);
    }

    update(dt) {
        /* Called every frame. */
    }
}
