import { GestureType, VolumeState, BrightnessState } from './AdjustmentState'

/**
 * 调节反馈组件
 */
@Component
export struct AdjustmentOverlay {
  @ObjectLink volumeState: VolumeState;
  @ObjectLink brightnessState: BrightnessState;
  @Prop activeType: GestureType = GestureType.NONE;
  private isAdjusting: boolean = false;
  private hideTimer: number = -1;

  aboutToAppear(): void {
    this.resetHideTimer();
  }

  aboutToDisappear(): void {
    this.clearHideTimer();
  }

  build() {
    if (this.isAdjusting) {
      Row() {
        if (this.activeType === GestureType.VOLUME) {
          this.VolumeIndicator()
        } else if (this.activeType === GestureType.BRIGHTNESS) {
          this.BrightnessIndicator()
        }
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    }
  }

  @Builder
  VolumeIndicator() {
    Column({ space: 8 }) {
      SymbolGlyph($r('sys.symbol.speaker_slash_fill'))
        .fontSize(36)
        .fontColor([Color.Black])
        .width(36)
        .height(36)
        .visibility(this.volumeState.currentVolume < 30 ? Visibility.Visible : Visibility.Hidden)
        .fontWeight(400)
      SymbolGlyph($r('sys.symbol.speaker_wave_2_fill'))
        .fontSize(36)
        .fontColor([Color.Black])
        .width(36)
        .height(36)
        .visibility(this.volumeState.currentVolume >= 30 ? Visibility.Visible : Visibility.Hidden)
        .fontWeight(400)
      Line()
        .width(4)
        .height(120)
        .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
      Line()
        .width(4)
        .height(120 * (this.volumeState.currentVolume / 100))
        .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
    }
    .width(96)
    .height(180)
    .padding({ top: 12, bottom: 12 })
    .borderRadius(24)
    .backgroundColor($r('sys.color.ohos_id_color_sub_background_transparent'))
  }

  @Builder
  BrightnessIndicator() {
    Column({ space: 8 }) {
      SymbolGlyph($r('sys.symbol.sun_max_fill'))
        .fontSize(36)
        .fontColor([Color.Black])
        .width(36)
        .height(36)
        .fontWeight(400)
      Line()
        .width(4)
        .height(120)
        .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
      Line()
        .width(4)
        .height(120 * (this.brightnessState.currentBrightness / 100))
        .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
    }
    .width(96)
    .height(180)
    .padding({ top: 12, bottom: 12 })
    .borderRadius(24)
    .backgroundColor($r('sys.color.ohos_id_color_sub_background_transparent'))
  }

  resetHideTimer(): void {
    this.isAdjusting = true;
    this.clearHideTimer();
    this.hideTimer = setTimeout(() => {
      this.isAdjusting = false;
    }, 1000);
  }

  clearHideTimer(): void {
    if (this.hideTimer !== -1) {
      clearTimeout(this.hideTimer);
      this.hideTimer = -1;
    }
  }
}
