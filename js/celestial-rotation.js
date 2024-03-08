import { Component, Property } from '@wonderlandengine/api';
import { glMatrix } from 'gl-matrix';
import { state } from './game';
/**
 * rtest
 */
const x = new Float32Array(4);
export class CelestialRotation extends Component {
  static TypeName = 'celestial-rotation';
  /* Properties that are configurable in the editor */
  static Properties = {
    param: Property.float(1.0),
    timer: Property.float(0.0),
    rotated: Property.float(0.0),
  };

  update(dt) {
    this.timer += dt;
    this.object.rotateAxisAngleDegObject([1, 0, 0], 0.05);
    this.rotated += 0.05;
    if(this.rotated > 65 && this.rotated < 295){
      if(state.day == true )
      {
        state.levelUp();
      }
      state.pauseEnemies = false;
      state.pauseBuilding = true;
      state.day = false;
    }
    else 
    {
      state.pauseEnemies = true;
      state.pauseBuilding = false;
      state.day = true;
    }
  }
}
