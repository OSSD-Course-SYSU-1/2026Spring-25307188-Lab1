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
  // [StartExclude portrait_bind_controller]
  @State defaultVideoHeight: number = 0;
  @State defaultVideoWidth: number = 0;
  @State isDetailShow: boolean = false;
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
  // [EndExclude portrait_bind_controller]
  build() {
    NavDestination() {
      Column() {
        RelativeContainer() {
          // Bind the NodeController to the NodeContainer
          NodeContainer(this.nodeController)
          // [StartExclude portrait_bind_controller]
          Button({ type: ButtonType.Circle }) {
            SymbolGlyph($r('sys.symbol.chevron_backward'))
              .fontColor([$r('sys.color.icon_on_primary')])
              .fontSize($r('sys.float.Title_M'))
          }
          .height(40)
          .aspectRatio(1)
          .backgroundColor('#19FFFFFF')
          .margin({
            left: 16,
            top: 8
          })
          .alignRules({
            top: { anchor: '__container__', align: VerticalAlign.Top },
            left: { anchor: '__container__', align: HorizontalAlign.Start }
          })
          .onClick(() => {
            this.navStack?.pop();
          })

          SymbolGlyph($r('sys.symbol.arrow_up_left_and_arrow_down_right'))
            .fontColor([$r('sys.color.icon_on_primary')])
            .fontSize(24)
            .alignRules({
              bottom: { anchor: '__container__', align: VerticalAlign.Bottom },
              right: { anchor: '__container__', align: HorizontalAlign.End }
            })
            .margin({
              right: 16,
              bottom: 8
            })
            .onClick(() => {
              this.pushLandscape();
            })
          // [EndExclude portrait_bind_controller]
        }
        // [StartExclude portrait_bind_controller]
        .backgroundColor(Color.Black)
        .height(this.defaultVideoHeight)
        .width(this.defaultVideoWidth)
        .id('myVideo')

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