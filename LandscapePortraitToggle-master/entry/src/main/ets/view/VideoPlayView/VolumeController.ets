import { BusinessError } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError1 } from '@kit.BasicServicesKit';
import { audio } from '@kit.AudioKit';
import { VolumeState } from './AdjustmentState';

/**
 * 音量控制器
 */
export class VolumeController {
  private volumeState: VolumeState = new VolumeState();

  constructor() {
    this.init();
  }

  private init() {
    try {
      this.volumeState.currentVolume = 50;
    } catch (error) {
      let err: BusinessError1 = error as BusinessError1;
      console.error(`Failed to obtain the current volume. Cause: ${JSON.stringify(err)}`);
    }
  }

  /**
   * 调节音量
   * @param distance 滑动距离
   * @param screenWidth 屏幕宽度
   * @returns 调整后的音量值
   */
  adjust(distance: number, screenWidth: number): number {
    const delta = (distance / screenWidth) * (this.volumeState.maxVolume - this.volumeState.minVolume);
    const current: number = this.volumeState.currentVolume;
    const newValue: number = current + delta;
    const result: number = Math.max(this.volumeState.minVolume, Math.min(this.volumeState.maxVolume, newValue));
    this.volumeState.currentVolume = result;
    return result;
  }

  /**
   * 获取当前音量
   * @returns 当前音量值
   */
  getCurrentVolume(): number {
    return this.volumeState.currentVolume;
  }

  getVolumeState(): VolumeState {
    return this.volumeState;
  }
}
