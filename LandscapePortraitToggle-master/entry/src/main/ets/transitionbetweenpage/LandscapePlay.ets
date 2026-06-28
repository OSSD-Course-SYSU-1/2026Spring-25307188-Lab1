import { AnimationProperties } from '../common/AnimationProperties';
import { RectInfoInPx } from '../utils/ComponentAttrUtils';
import { CustomTransition } from '../common/CustomTransition';
import { VideoNodeController } from '../common/VideoNodeController';
import { display, window } from '@kit.ArkUI';
import { WindowUtils } from '../utils/WindowUtils';
import Logger from '../common/Logger';

@Builder
export function LandscapePlayBuilder() {
  MyPageLandscape();
}

const TAG = 'MyPageLandscapeTag';

// [Start landscape_bind_controller]
@Component
export struct MyPageLandscape {
  // [StartExclude landscape_bind_controller]
  @StorageLink('videoBackgroundColor') videoBackgroundColor: Color = Color.Transparent;
  @StorageLink('statusBarHeight') statusBarHeight: number = 0;
  @StorageLink('navBarHeight') navBarHeight: number = 0;
  @State animationProperties: AnimationProperties = new AnimationProperties(this.getUIContext());
  // [EndExclude landscape_bind_controller]
  // Obtaining the VideoNodeController instance
  @State nodeController: VideoNodeController = VideoNodeController.getInstance();
  // Page display orientation, default is landscape.
  @State displayOrientation: window.Orientation = window.Orientation.LANDSCAPE;
  @StorageLink('currentVolume') currentVolume: number = 50;
  @State volumeSliderVisible: boolean = false;
  @StorageLink('currentBrightness') currentBrightness: number = 50;
  @State brightnessSliderVisible: boolean = false;
  @StorageLink('currentTime') currentTime: number = 0;
  @StorageLink('duration') duration: number = 0;
  @State isSeeking: boolean = false;
  @State isTablet: boolean = false;
  @State deviceScale: number = 1.0;
  // [StartExclude landscape_bind_controller]
  private stack: NavPathStack | null = null;
  private pageId: string = '-1';
  private prePageDoFinishTransition: () => void = () => {
  };
  private nodeRectInfo: RectInfoInPx = new RectInfoInPx();

  aboutToAppear(): void {
    this.isTablet = WindowUtils.isTablet();
    this.deviceScale = WindowUtils.getDeviceScale();
    if (WindowUtils.isExpandedOrHalfFolded()) {
      this.displayOrientation = window.Orientation.PORTRAIT;
    } else {
      this.displayOrientation = window.Orientation.LANDSCAPE;
    }

    this.foldStatusChangeUI();
  }

  // [Start folded_status_change]
  // Handling UI adaptation for video playback with collapse and expand functionality
  foldStatusChangeUI() {
    try {
      let beforeFoldedStatus: display.FoldStatus = display.getFoldStatus();
      // Handling UI adaptation for video playback with collapse and expand functionality
      let callback: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
        // Full-screen playback: Expanded / Semi-expanded -> Collapsed detail page playback
        if ((beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_EXPANDED ||
          beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED) &&
          data === display.FoldStatus.FOLD_STATUS_FOLDED) {
          CustomTransition.getInstance().unRegisterNavParam(this.pageId);
          this.stack?.pop(false);
          this.prePageDoFinishTransition();
        }
        // Full-screen playback: collapsed state -> expanded state full playback
        if (beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED &&
          data === display.FoldStatus.FOLD_STATUS_EXPANDED) {
          this.displayOrientation = window.Orientation.PORTRAIT;
        }
        beforeFoldedStatus = data;
      };
      display.on('foldStatusChange', callback);
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `on foldStatusChangeUI err, code: ${error.code}, message: ${error.message}`);
    }
  }
  // [End folded_status_change]

  aboutToDisappear(): void {
    try {
      display.off('foldStatusChange');
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `off foldStatusChange err, code: ${error.code}, message: ${error.message}`);
    }
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  // [EndExclude landscape_bind_controller]
  // [Start bind_transition_animation]
  build() {
    // [StartExclude bind_transition_animation]
    NavDestination() {
      Stack({ alignContent: Alignment.Center }) {
        // Bind the NodeController to the NodeContainer
        NodeContainer(this.nodeController)
        // [StartExclude landscape_bind_controller]
        RelativeContainer() {
          Button({ type: ButtonType.Circle }) {
            SymbolGlyph($r('sys.symbol.chevron_backward'))
              .fontColor([$r('sys.color.icon_on_primary')])
              .fontSize($r('sys.float.Title_M'))
          }
          .height(40 * this.deviceScale)
          .aspectRatio(1)
          .backgroundColor('#19FFFFFF')
          .margin({
            left: 16 * this.deviceScale,
            top: 8 * this.deviceScale
          })
          .alignRules({
            top: { anchor: '__container__', align: VerticalAlign.Top },
            left: { anchor: '__container__', align: HorizontalAlign.Start }
          })
          .onClick(() => {
            this.stack?.pop();
          })

          Row() {
            Text(this.formatTime(this.currentTime))
              .fontSize(12 * this.deviceScale)
              .fontColor(Color.White)
              .margin({ right: 8 * this.deviceScale })

            Slider({
              value: this.currentTime,
              min: 0,
              max: this.duration > 0 ? this.duration : 100,
              style: SliderStyle.OutSet
            })
              .blockColor(Color.White)
              .trackColor('#80FFFFFF')
              .selectedColor('#FFFFFF')
              .layoutWeight(1)
              .height(4 * this.deviceScale)
              .trackThickness(4 * this.deviceScale)
              .onChange((value: number) => {
                this.currentTime = value;
                AppStorage.setOrCreate('currentTime', value);
                if (this.isSeeking) {
                  AppStorage.setOrCreate('seekTime', value);
                }
              })
              .onTouch((event: TouchEvent) => {
                if (event.type === TouchType.Down) {
                  this.isSeeking = true;
                  AppStorage.setOrCreate('isSeekingGlobal', true);
                } else if (event.type === TouchType.Up) {
                  AppStorage.setOrCreate('seekTime', this.currentTime);
                  this.isSeeking = false;
                  setTimeout(() => {
                    AppStorage.setOrCreate('isSeekingGlobal', false);
                  }, 100);
                }
              })

            Text(this.formatTime(this.duration))
              .fontSize(12 * this.deviceScale)
              .fontColor(Color.White)
              .margin({ left: 8 * this.deviceScale, right: 8 * this.deviceScale })

            Button({ type: ButtonType.Circle }) {
              SymbolGlyph($r('sys.symbol.sun_max_fill'))
                .fontColor([$r('sys.color.icon_on_primary')])
                .fontSize(16 * this.deviceScale)
            }
            .height(28 * this.deviceScale)
            .aspectRatio(1)
            .backgroundColor('#19FFFFFF')
            .onClick(() => {
              this.brightnessSliderVisible = !this.brightnessSliderVisible;
            })

            Button({ type: ButtonType.Circle }) {
              SymbolGlyph($r('sys.symbol.speaker_wave_2_fill'))
                .fontColor([$r('sys.color.icon_on_primary')])
                .fontSize(16 * this.deviceScale)
            }
            .height(28 * this.deviceScale)
            .aspectRatio(1)
            .backgroundColor('#19FFFFFF')
            .margin({ left: 8 * this.deviceScale })
            .onClick(() => {
              this.volumeSliderVisible = !this.volumeSliderVisible;
            })
          }
          .width('100%')
          .height(48 * this.deviceScale)
          .justifyContent(FlexAlign.Start)
          .alignItems(VerticalAlign.Center)
          .padding({ left: 16 * this.deviceScale, right: 16 * this.deviceScale })
          .alignRules({
            bottom: { anchor: '__container__', align: VerticalAlign.Bottom },
            left: { anchor: '__container__', align: HorizontalAlign.Start }
          })
          .margin({
            bottom: 16 * this.deviceScale
          })
        }
        .width('100%')
        .height('100%')
        // [EndExclude landscape_bind_controller]

        // 音量滑块 - 视频正中间
        if (this.volumeSliderVisible) {
          Column() {
            SymbolGlyph($r('sys.symbol.speaker_wave_2_fill'))
              .fontSize(24 * this.deviceScale)
              .fontColor([Color.White])
              .margin({ bottom: 8 * this.deviceScale })
            Slider({
              value: this.currentVolume,
              min: 0,
              max: 100,
              style: SliderStyle.OutSet
            })
              .blockColor(Color.White)
              .trackColor('#80FFFFFF')
              .selectedColor('#FFFFFF')
              .width(120 * this.deviceScale)
              .height(4 * this.deviceScale)
              .trackThickness(4 * this.deviceScale)
              .onChange((value: number) => {
                this.currentVolume = value;
              })
          }
          .width(48 * this.deviceScale)
          .padding(12 * this.deviceScale)
          .borderRadius(16 * this.deviceScale)
          .backgroundColor('#80182431')
        }

        // 亮度滑块 - 视频正中间
        if (this.brightnessSliderVisible) {
          Column() {
            SymbolGlyph($r('sys.symbol.sun_max_fill'))
              .fontSize(24 * this.deviceScale)
              .fontColor([Color.White])
              .margin({ bottom: 8 * this.deviceScale })
            Slider({
              value: this.currentBrightness,
              min: 0,
              max: 100,
              style: SliderStyle.OutSet
            })
              .blockColor(Color.White)
              .trackColor('#80FFFFFF')
              .selectedColor('#FFFFFF')
              .width(120 * this.deviceScale)
              .height(4 * this.deviceScale)
              .trackThickness(4 * this.deviceScale)
              .onChange((value: number) => {
                this.currentBrightness = value;
              })
          }
          .width(48 * this.deviceScale)
          .padding(12 * this.deviceScale)
          .borderRadius(16 * this.deviceScale)
          .backgroundColor('#80182431')
        }
      }
      // [StartExclude landscape_bind_controller]
      .alignContent(Alignment.Center)
      .width(this.animationProperties.width)
      .height(this.animationProperties.height)
      .translate({ x: this.animationProperties.translateX, y: this.animationProperties.translateY })
      .rotate({ angle: this.animationProperties.rotate })
      // [EndExclude landscape_bind_controller]
    }
    // Set the page display orientation.
    .preferredOrientation(this.displayOrientation)
    // [StartExclude landscape_bind_controller]
    .enableStatusBar(WindowUtils.isExpandedOrHalfFolded())
    .enableNavigationIndicator(WindowUtils.isExpandedOrHalfFolded())
    .width('100%')
    .height('100%')
    .backgroundColor(this.videoBackgroundColor)
    .hideTitleBar(true)
    .hideToolBar(true)
    .onBackPressed(() => {
      return true;
    })
    .onDisAppear(() => {
      if (this.pageId !== '-1') {
        CustomTransition.getInstance().unRegisterNavParam(this.pageId);
      }
    })
    // [EndExclude bind_transition_animation]
    .onReady((ctx: NavDestinationContext) => {
      if (ctx.navDestinationId) {
        this.pageId = ctx.navDestinationId;
        this.stack = ctx.pathStack;
        let param = ctx.pathInfo.param as Record<string, object>
        this.nodeRectInfo = param.nodeRectInfo as RectInfoInPx;
        this.prePageDoFinishTransition = param.DoDefaultTransition as () => void;
        // [Start register_nav_param]
        // Register the animation callback of the current page.
        CustomTransition.getInstance().registerNavParam(this.pageId,
          (isPush: boolean, isExit: boolean, transitionProxy: NavigationTransitionProxy) => {
            if (WindowUtils.isExpandedOrHalfFolded()) {
              // Play animation, foldable screen in unfolded state
              this.animationProperties.doAnimationFoldable(this.nodeRectInfo, isPush, isExit, transitionProxy,
                this.prePageDoFinishTransition);
            } else {
              // Perform animation, non-foldable screen expanded state
              this.animationProperties.doAnimation(this.nodeRectInfo, isPush, isExit, transitionProxy,
                this.prePageDoFinishTransition);
            }
          }, 2000);
        // [End register_nav_param]
      }
    // [EndExclude landscape_bind_controller]
    })
  }
  // [End bind_transition_animation]
}
// [End landscape_bind_controller]
