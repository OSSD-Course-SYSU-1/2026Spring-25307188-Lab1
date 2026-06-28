/**
 * 手势类型枚举
 */
export enum GestureType {
  /** 音量调节 */
  VOLUME,
  /** 亮度调节 */
  BRIGHTNESS,
  /** 未识别 */
  NONE
}

/**
 * 手势识别结果
 */
export interface GestureResult {
  /** 手势类型 */
  type: GestureType;
  /** 起始位置 X 坐标 */
  startX: number;
  /** 起始位置 Y 坐标 */
  startY: number;
  /** 当前位置 X 坐标 */
  currentX: number;
  /** 当前位置 Y 坐标 */
  currentY: number;
  /** 滑动距离 */
  distance: number;
}

/**
 * 音量调节状态
 */
@Observed
export class VolumeState {
  @Track currentVolume: number = 50;
  @Track minVolume: number = 0;
  @Track maxVolume: number = 100;
  @Track isAdjusting: boolean = false;

  constructor(currentVolume?: number, minVolume?: number, maxVolume?: number) {
    if (currentVolume !== undefined) {
      this.currentVolume = currentVolume;
    }
    if (minVolume !== undefined) {
      this.minVolume = minVolume;
    }
    if (maxVolume !== undefined) {
      this.maxVolume = maxVolume;
    }
  }
}

/**
 * 亮度调节状态
 */
@Observed
export class BrightnessState {
  @Track currentBrightness: number = 0;
  @Track minBrightness: number = 0;
  @Track maxBrightness: number = 100;
  @Track isAdjusting: boolean = false;
}

/**
 * 调节状态
 */
@Observed
export class AdjustmentState {
  @Track volumeState: VolumeState = new VolumeState();
  @Track brightnessState: BrightnessState = new BrightnessState();
  @Track activeType: GestureType = GestureType.NONE;
}
