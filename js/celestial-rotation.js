import { Component, Property } from '@wonderlandengine/api';

/**
 * rtest
 */
export class CelestialRotation extends Component {
  static TypeName = 'celestial-rotation';
  /* Properties that are configurable in the editor */
  static Properties = {
    param: Property.float(1.0),
  };

  update(dt) {
    this.object.rotateAxisAngleDegObject([1, 0, 0], 0.055555);
  }
}
