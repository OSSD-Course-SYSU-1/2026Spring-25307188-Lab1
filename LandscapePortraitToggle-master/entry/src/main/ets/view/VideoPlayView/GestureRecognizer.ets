import { GestureResult, GestureType } from './AdjustmentState'

/**
 * 手势识别器
 */
export class GestureRecognizer {
  private gestureType: GestureType = GestureType.NONE;
  private startX: number = 0;
  private startY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;
  private screenWidth: number = 0;
  private screenHeight: number = 0;

  constructor(screenWidth: number, screenHeight: number) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  /**
   * 识别手势类型
   * @param event PanGestureEvent 滑动手势事件
   * @returns 手势识别结果
   */
  recognize(event: PanGestureEvent): GestureResult {
    if (event.fingerList.length < 1) {
      return {
        type: GestureType.NONE,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        distance: 0
      };
    }

    const finger = event.fingerList[0];
    this.currentX = finger.localX;
    this.currentY = finger.localY;

    const distance = this.calculateDistance(this.startX, this.startY, this.currentX, this.currentY);

    return {
      type: this.gestureType,
      startX: this.startX,
      startY: this.startY,
      currentX: this.currentX,
      currentY: this.currentY,
      distance: distance
    };
  }

  /**
   * 开始识别手势
   * @param event PanGestureEvent 滑动手势事件
   */
  start(event: PanGestureEvent): void {
    if (event.fingerList.length < 1) {
      return;
    }

    const finger = event.fingerList[0];
    this.startX = finger.localX;
    this.startY = finger.localY;
    this.currentX = this.startX;
    this.currentY = this.startY;

    this.gestureType = this.getGestureType(this.startX, this.screenWidth);
  }

  /**
   * 结束识别手势
   */
  end(): void {
    this.gestureType = GestureType.NONE;
  }

  /**
   * 获取手势类型
   * @param x 起始位置 X 坐标
   * @param screenWidth 屏幕宽度
   * @returns 手势类型
   */
  private getGestureType(x: number, screenWidth: number): GestureType {
    const ratio = x / screenWidth;
    if (ratio <= 0.3) {
      return GestureType.BRIGHTNESS;
    }
    if (ratio >= 0.7) {
      return GestureType.VOLUME;
    }
    return GestureType.NONE;
  }

  /**
   * 计算滑动距离
   * @param start 起始位置
   * @param current 当前位置
   * @returns 滑动距离
   */
  private calculateDistance(startX: number, startY: number, currentX: number, currentY: number): number {
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
}
