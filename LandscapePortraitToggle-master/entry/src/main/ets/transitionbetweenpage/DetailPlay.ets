/*
* Copyright (C) 2026 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { display, window } from '@kit.ArkUI';
import { ComponentAttrUtils, RectInfoInPx } from '../utils/ComponentAttrUtils';
import { CustomTransition } from '../common/CustomTransition';
import { WindowUtils } from '../utils/WindowUtils';
import Logger from '../common/Logger';
import { BottomView } from '../views/BottomView';
import { CommentsView } from '../views/CommentsView';
import { RelatedListView } from '../views/RelatedListView';
import { VideoNodeController } from '../common/VideoNodeController';

const TAG = 'MyPagePortraitTag';

@Builder
export function DetailPlayBuilder() {
  DetailPlay();
}

// [Start portrait_bind_controller]
@Component
export struct DetailPlay {
  // [StartExclude portrait_bind_controller]
  @StorageLink('videoRatio') @Watch('videoRatioChange') videoRatio: number = 16 / 9
  @StorageLink('statusBarHeight') statusBarHeight: number = 0;
  @StorageLink('navBarHeight') navBarHeight: number = 0;
  // [EndExclude portrait_bind_controller]
  @State nodeController: VideoNodeController = VideoNodeController.getInstance();
  @State isTablet: boolean = false;
  @State deviceScale: number = 1.0;
  // [StartExclude portrait_bind_controller]
  @State defaultVideoHeight: number = 0;
  @State defaultVideoWidth: number = 0;
  @State isDetailShow: boolean = false;
  @StorageLink('currentVolume') currentVolume: number = 50;
  @State volumeSliderVisible: boolean = false;
  @StorageLink('currentBrightness') currentBrightness: number = 50;
  @State brightnessSliderVisible: boolean = false;
  @StorageLink('currentTime') currentTime: number = 0;
  @StorageLink('duration') duration: number = 0;
  @State isSeeking: boolean = false;
  private navStack: NavPathStack | null = null;
  private pageId: string = '-1';
  videoRatioChange(ratio: number) {
    try {
      this.defaultVideoWidth = this.getUIContext().px2vp(display.getDefaultDisplaySync().width);
      this.defaultVideoHeight = this.getUIContext().px2vp(display.getDefaultDisplaySync().width / ratio);
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `getDefaultDisplaySync err, code: ${error.code}, message: ${error.message}`);
    }
  }

  aboutToAppear(): void {
    this.isTablet = WindowUtils.isTablet();
    this.deviceScale = WindowUtils.getDeviceScale();
    try {
      // [Start window_size_change]
      window.getLastWindow(this.getUIContext().getHostContext()).then((windowClass) => {
        WindowUtils.windowWidthPx = windowClass.getWindowProperties().windowRect.width;
        WindowUtils.windowHeightPx = windowClass.getWindowProperties().windowRect.height;
        this.defaultVideoWidth = this.getUIContext().px2vp(WindowUtils.windowWidthPx);
        this.defaultVideoHeight = this.getUIContext().px2vp(WindowUtils.windowWidthPx / this.videoRatio);
        windowClass.on('windowSizeChange', (data) => {
          // [StartExclude window_size_change]
          Logger.info(TAG, `windowWidth:${data.width}`);
          Logger.info(TAG, `windowHeight:${data.height}`);
          // [EndExclude window_size_change]
          // Updating the window size during the orientation switching between landscape and portrait modes.
          WindowUtils.windowWidthPx = data.width;
          WindowUtils.windowHeightPx = data.height;
          // Only dynamically change the size of the video component container
          // when the page is displayed, such as when collapsing or expanding.
          if (this.isDetailShow) {
            this.defaultVideoWidth = this.getUIContext().px2vp(data.width);
            this.defaultVideoHeight = this.getUIContext().px2vp(data.width / this.videoRatio);
          }
          // Foldable screen expanded state settings page video width and height
          if (WindowUtils.isExpandedOrHalfFolded() && !this.isDetailShow) {
            this.defaultVideoWidth = this.getUIContext().px2vp(data.width);
            this.defaultVideoHeight = this.getUIContext().px2vp(data.width / this.videoRatio);
            AppStorage.setOrCreate('defaultVideoHeight', this.defaultVideoHeight);
          }
        });
        // [End window_size_change]
      })
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `getLastWindow err, code: ${error.code}, message: ${error.message}`);
    }
  }

  // [Start finish_transition]
  // This method is called when the page transition animation is completed.
  private doFinishTransition(): void {
    // [StartExclude finish_transition]
    if (AppStorage.has('defaultVideoHeight')) {
      AppStorage.delete('defaultVideoHeight');
    }
    // [EndExclude finish_transition]
    // Remove the video node from the original page.
    this.nodeController.onRemove();
  }
  // [End finish_transition]

  private registerCustomTransition(pageId: string): void {
    CustomTransition.getInstance().registerNavParam(pageId, () => {
      Logger.info(TAG, 'registerCustomTransition');
    }, 500)
  }

  pushLandscape(): void {
    let param: Record<string, object> = {};
    let nodeInfo: RectInfoInPx | null = ComponentAttrUtils.getRectInfoById(this.getUIContext(), 'myVideoComponent');
    if (!nodeInfo) {
      Logger.error(TAG, 'pushLandscape nodeInfo is null');
      return;
    }
    param.nodeRectInfo = nodeInfo;
    param.DoDefaultTransition = () => {
      this.doFinishTransition();
    };
    if (this.navStack) {
      // Jump to landscape playback page
      this.navStack.pushPath({ name: 'LandscapePlay', param: param });
    }
    if (this.nodeController !== undefined) {
      // Custom node removed from the detail page tree
      this.nodeController.onRemove();
    }
  }

  aboutToDisappear(): void {
    Logger.info(TAG, 'aboutToDisappear');
    this.nodeController.dispose();
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  // [EndExclude portrait_bind_controller]
  build() {
    NavDestination() {
      Column() {
        Stack({ alignContent: Alignment.Center }) {
          RelativeContainer() {
            // Bind the NodeController to the NodeContainer
            NodeContainer(this.nodeController)
            // [StartExclude portrait_bind_controller]
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
              this.navStack?.pop();
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

              SymbolGlyph($r('sys.symbol.arrow_up_left_and_arrow_down_right'))
                .fontColor([$r('sys.color.icon_on_primary')])
                .fontSize(20 * this.deviceScale)
                .margin({ left: 8 * this.deviceScale })
                .onClick(() => {
                  this.pushLandscape();
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
              bottom: 8 * this.deviceScale
            })
            // [EndExclude portrait_bind_controller]
          }
          // [StartExclude portrait_bind_controller]
          .backgroundColor(Color.Black)
          .height('100%')
          .width('100%')
          .id('myVideo')

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
        .height(this.defaultVideoHeight)
        .width(this.defaultVideoWidth)

        Scroll() {
          Column() {
            RelatedListView()
            CommentsView()
          }
        }
        .layoutWeight(1)
        .scrollBar(BarState.Off)
        .padding({ bottom: 16 })
        .backgroundColor($r('sys.color.background_primary'))

        BottomView()
          .margin({ bottom: this.navBarHeight })

      }
      .height('100%')
      .width('100%')
      // [EndExclude portrait_bind_controller]
    }
    // Set the page display orientation portrait.
    .preferredOrientation(window.Orientation.PORTRAIT)
    // [StartExclude portrait_bind_controller]
    .backgroundColor($r('sys.color.background_primary'))
    .width('100%')
    .height('100%')
    .hideTitleBar(true)
    .hideToolBar(true)
    .onDisAppear(() => {
      // Delete animation parameter data.
      CustomTransition.getInstance().unRegisterNavParam(this.pageId)
    })
    .onReady((ctx: NavDestinationContext) => {
      if (ctx.navDestinationId) {
        this.pageId = ctx.navDestinationId;
        this.navStack = ctx.pathStack;
        this.registerCustomTransition(this.pageId)
      }
    })
    .onAppear(() => {
      WindowUtils.setStatusbarAndContentColor('#000000', '#F1F3F5');
    })
    .onHidden(() => {
      this.isDetailShow = false;
    })
    .onShown(() => {
      this.isDetailShow = true;
    })
    .onWillDisappear(() => {
      WindowUtils.setStatusbarAndContentColor('#F1F3F5', '#000000');
    })
    // [EndExclude portrait_bind_controller]
  }
}
// [End portrait_bind_controller]
