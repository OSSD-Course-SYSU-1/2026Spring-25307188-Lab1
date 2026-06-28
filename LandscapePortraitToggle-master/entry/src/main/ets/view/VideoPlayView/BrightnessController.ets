import { BusinessError } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError1 } from '@kit.BasicServicesKit';
import { display } from '@kit.ArkUI';
import { BrightnessState } from './AdjustmentState';

/**
 * 亮度控制器
 */
export class BrightnessController {
  brightnessState: BrightnessState = new BrightnessState();

  constructor() {
    this.init();
  }

  init() {
    try {
      this.brightnessState.currentBrightness = 50;
    } catch (error) {
      let err: BusinessError1 = error as BusinessError1;
      console.error(`Failed to obtain the current brightness. Cause: ${JSON.stringify(err)}`);
    }
  }

  /**
   * 调节亮度
   * @param distance 滑动距离
   * @param screenHeight 屏幕高度
   * @returns 调整后的亮度值
   */
  adjust(distance: number, screenHeight: number): number {
    const delta = (distance / screenHeight) * (this.brightnessState.maxBrightness - this.brightnessState.minBrightness);
    const current: number = this.brightnessState.currentBrightness;
    const newValue: number = current + delta;
    const result: number = Math.max(this.brightnessState.minBrightness, Math.min(this.brightnessState.maxBrightness, newValue));
    this.brightnessState.currentBrightness = result;
    return result;
  }

  /**
   * 获取当前亮度
   * @returns 当前亮度值
   */
  getCurrentBrightness(): number {
    return this.brightnessState.currentBrightness;
  }

  getBrightnessState(): BrightnessState {
    return this.brightnessState;
  }
}
