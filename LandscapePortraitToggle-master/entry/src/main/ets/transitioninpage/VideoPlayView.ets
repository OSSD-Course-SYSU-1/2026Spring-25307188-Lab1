/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { display, window } from '@kit.ArkUI'
import { common } from '@kit.AbilityKit'
import { BusinessError, settings } from '@kit.BasicServicesKit'
import { AVPlayerUtil } from '../utils/AVPlayerUtil'
import Logger from '../common/Logger'
import { WindowUtils } from '../utils/WindowUtils'
import { getVideoSize } from '../common/CommonUtils'

const TAG = 'VideoPlayViewLogTag';

// [Start set_orientation]
@Component
export struct VideoPlayView {
  // [StartExclude set_orientation]
  @StorageLink('statusBarHeight') statusBarHeight: number = 0;
  @Consume navStack: NavPathStack | null = null;
  @State aspect: number = 16 / 9; // default video height/width ratio value
  // [Start xComponent_size]
  @State xComponentWidth: number = 0;
  @State xComponentHeight: number = 0;
  // [End xComponent_size]
  @State windowHeight: number = 0;
  @State windowWidth: number = 0;
  @StorageLink('isLandscape') isLandscape: boolean = false; // Whether it is in full-screen playback state
  @StorageLink('isVideoLock') isVideoLock: boolean = false; // Whether the video playback is locked
  @State orientationLockState: string = '1'; // control center switch rotation ,value 1:enable 0：disable
  private xComponentController: XComponentController = new XComponentController();
  private player?: AVPlayerUtil;
  // [EndExclude set_orientation]
  private windowClass: window.Window | undefined;
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
  // [StartExclude set_orientation]
   onBackPressedCall: () => boolean = () => {
    return true;
  };
  // [EndExclude set_orientation]
  aboutToAppear(): void {
    // [StartExclude set_orientation]
    // Status bar rotation lock switch status
    this.getOrientationLockState();
    try {
    // [EndExclude set_orientation]
      this.windowClass = this.context.windowStage.getMainWindowSync();  // Obtains the window instance
    // [StartExclude set_orientation]
      // Initialize window orientation
      this.setOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
      this.windowHeight = this.getUIContext().px2vp(this.windowClass.getWindowProperties().windowRect.height);
      this.windowWidth = this.getUIContext().px2vp(this.windowClass.getWindowProperties().windowRect.width);
      this.setXComponentSize();
      // [Start on_window_size_change]
      // [Start calculate_video_size]
      // [Start on_window_size_change_detail]
      // Listen for window size changes.
      this.windowClass.on('windowSizeChange', (size) => {
        // [StartExclude on_window_size_change]
        // Detect screen orientation in the window resize listener
        this.windowHeight = this.getUIContext().px2vp(size.height);
        this.windowWidth = this.getUIContext().px2vp(size.width);
        this.setXComponentSize();
        // [StartExclude calculate_video_size]
        let displayClass: display.Display = display.getDefaultDisplaySync();
        let orientation: display.Orientation = displayClass.orientation;

        if (orientation === display.Orientation.LANDSCAPE || orientation === display.Orientation.LANDSCAPE_INVERTED) {
          // Set full-screen playback to true in landscape mode
          this.isLandscape = true;
        } else {
          if (!WindowUtils.isExpandedOrHalfFolded() && !this.isVideoLock) {
            // When not expanded and unlocked, set the fullscreen playback flag to false
            this.isLandscape = false;
            this.setOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
          }
        }
        // Folded mode landscape playback, set to auto-rotate with the sensor
        if (this.isLandscape && WindowUtils.isFolded() && this.isVideoLock) {
          this.setOrientation(window.Orientation.AUTO_ROTATION_LANDSCAPE);
        }
        // Play in full-screen mode and set to rotate automatically according to the sensor
        if (this.isLandscape && WindowUtils.isExpandedOrHalfFolded()) {
          this.setOrientation(window.Orientation.AUTO_ROTATION);
        }
        // [EndExclude calculate_video_size]
        // [EndExclude on_window_size_change]
      })
      // [End on_window_size_change_detail]
      // [End calculate_video_size]
      // [End on_window_size_change]
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `aboutToAppear err, error code: ${error.code}, error message: ${error.message}`);
    }
    // [EndExclude set_orientation]
  }
  // [StartExclude set_orientation]
  setXComponentSize():void{
    let videoSize: Size = getVideoSize(this.windowHeight, this.windowWidth, this.aspect);
    this.xComponentHeight = videoSize.height;
    this.xComponentWidth = videoSize.width;
  }
  // [EndExclude set_orientation]

  // Set window orientation.
  setOrientation(orientation: window.Orientation) {
    // Encapsulates the setPreferredOrientation interface
    this.windowClass?.setPreferredOrientation(orientation).then(() => {
      Logger.info(`setWin0dowOrientation ${orientation} Succeeded`);
    }).catch((err: BusinessError) => {
      let error = err as BusinessError;
      Logger.error(TAG, `setWindowOrientation ${orientation} err, code: ${error.code}, message: ${error.message}`);
    })
  }
  // [StartExclude set_orientation]

  getOrientationLockState(): void {
    // Get the rotation lock on state
    this.orientationLockState = settings.getValueSync(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS,
      settings.domainName.DEVICE_SHARED);
    // [Start lock_status_change]
    // Monitor the status of the rotation lock switch in the status bar
    settings.registerKeyObserver(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS,
      settings.domainName.DEVICE_SHARED, () => {
        this.orientationLockState =
          settings.getValueSync(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS,
            settings.domainName.DEVICE_SHARED);
      })
    // [End lock_status_change]
  }

  aboutToDisappear(): void {
    settings.unregisterKeyObserver(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS,
      settings.domainName.DEVICE_SHARED);
    this.player?.release();
    this.setOrientation(window.Orientation.PORTRAIT);
  }

  build() {
    Stack() {
      Column() {
        // [Start X_component]
        // [Start X_component_size]
        XComponent({ id: 'video_player_id', type: XComponentType.SURFACE, controller: this.xComponentController })
          // [Start X_component_size]
          .onLoad(() => {
            // [StartExclude X_component]
            try {
              this.player = new AVPlayerUtil(this.context);
              this.player.setSurfaceId(this.xComponentController.getXComponentSurfaceId());
              this.player.initPlayer('videoTest.mp4', (aspect: number) => {
                this.aspect = aspect;
                this.setXComponentSize();
              });
            } catch (err) {
              let error = err as BusinessError;
              Logger.error(TAG, `initPlayer err, error code: ${error.code}, error message: ${error.message}`);
            }
            // [EndExclude X_component]
          })
          // [End X_component_size]
          // Bind the width and height state variables to the XComponent.
          .width(this.xComponentWidth)
          .height(this.xComponentHeight)
        // [End X_component]
        // [End X_component_size]
      }

      RelativeContainer() {
        if (!this.isVideoLock) {
          // [Start icon_back]
          Button({ type: ButtonType.Circle }) {
            SymbolGlyph($r('sys.symbol.chevron_backward'))
              .fontColor([$r('sys.color.icon_on_primary')])
              .fontSize($r('sys.float.Title_M'))
          }
          // [StartExclude icon_back]
          .height(40)
          .aspectRatio(1)
          .backgroundColor('#19FFFFFF')
          .margin({
            left: 16,
            top: this.isLandscape ? this.statusBarHeight : 8
          })
          // [EndExclude icon_back]
          .onClick(() => {
            // Exit the current page if not in landscape mode
            if (!this.isLandscape) {
              this.navStack?.pop();
              return;
            }
            // [StartExclude icon_back]
            if (WindowUtils.isExpandedOrHalfFolded()) {
              this.isLandscape = false;
            } else {
              // [EndExclude icon_back]
              // Set the window orientation to portrait
              this.setOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
              // [StartExclude icon_back]
            }
            // [EndExclude icon_back]
          })
          // [End icon_back]
        }

        if (this.isLandscape) {
          // [Start is_video_lock_image]
          Image(this.isVideoLock ? $r('app.media.icon_lock') : $r('app.media.icon_lock_open'))
          // [StartExclude is_video_lock_image]
            .height(24)
            .width(24)
            .fillColor(Color.White)
            .alignRules({
              top: { anchor: '__container__', align: VerticalAlign.Center },
              left: { anchor: '__container__', align: HorizontalAlign.Start }
            })
            .margin({ left: this.statusBarHeight })
            .offset({ y: -12 })
            // [EndExclude is_video_lock_image]
            .onClick(() => {
              // Set video lock status
              this.isVideoLock = !this.isVideoLock;
              // [StartExclude is_video_lock_image]
              // If the device is in an expanded state or the rotation lock in the status bar is turned on,
              // the window rotation policy will not be changed.
              if (WindowUtils.isExpandedOrHalfFolded() || this.orientationLockState === '0') {
                return;
              }
              // [EndExclude is_video_lock_image]
              // [Start is_video_lock]
              if (this.isVideoLock) {
                // If landscape mode is locked, then set to AUTO_ROTATION_LANDSCAPE.
                this.setOrientation(window.Orientation.AUTO_ROTATION_LANDSCAPE);
              } else {
                // Otherwise, set the window orientation to auto-rotate.
                this.setOrientation(window.Orientation.AUTO_ROTATION);
              }
              // [End is_video_lock]
            })
          // [End is_video_lock_image]
        }

        if (!this.isLandscape) {
          // [Start icon_zoom_in]
          SymbolGlyph($r('sys.symbol.arrow_up_left_and_arrow_down_right'))
          // [StartExclude icon_zoom_in]
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
            // [EndExclude icon_zoom_in]
            .onClick(() => {
              if (WindowUtils.isExpandedOrHalfFolded()) {
                // When the device is folded or half-folded,
                // the playback mode is set to landscape mode, and the window rotation is set to auto-rotate.
                this.isLandscape = true;
                this.setOrientation(window.Orientation.AUTO_ROTATION);
              } else {
                // In a non-expanded state, such as when folded, set the window orientation to landscape.
                this.setOrientation(window.Orientation.USER_ROTATION_LANDSCAPE);
              }
            })
          // [End icon_zoom_in]
        }
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .backgroundColor($r('sys.color.comp_background_focus'))
    .height(this.isLandscape ? '100%' : this.xComponentHeight + this.statusBarHeight)
    .backgroundColor(Color.Black)
    .padding({ top: this.isLandscape ? 0 : this.statusBarHeight })
  }
  // [EndExclude set_orientation]
}
// [End set_orientation]

// [Start freeze_when_inactive]
@Component({ freezeWhenInactive: true })
  // Added custom component freezing function
struct VideoDetailView {
  build() {
    Scroll() {
      // [StartExclude freeze_when_inactive]
      Text('Hello')
        .fontSize(14)
        .fontColor($r('sys.color.mask_secondary'))
      // [EndExclude freeze_when_inactive]
    }
  }
}

// [End freeze_when_inactive]

// [Start Image_item]
@Builder
function ImageItem(imageSrc: ResourceStr) {
  Stack({}) {
    Image(imageSrc)
      .width('100%')
      .height('100%')
      .autoResize(true)// Use auto_resize attributes on images
      .borderRadius(8)
      .objectFit(ImageFit.Fill)
      .backgroundColor('#1AFFFFFF')
  }
}

// [End Image_item]

// [Start Tabs_view]
@Component
struct TabsView {
  @State isLayoutFullScreen: boolean = false

  build() {
    Tabs() {
      // [StartExclude Tabs_view]
      TabContent() {
        Text('Hello')
          .fontWeight(FontWeight.Regular)
          .fontColor(Color.Red)
      }

      // [EndExclude Tabs_view]
    }
    // Hide the height of the Tabs tab bar by whether the user needs to click to enter the full screen and hide it
    .barHeight(this.isLayoutFullScreen ? 0 : 50)
  }
}

// [End Tabs_view]