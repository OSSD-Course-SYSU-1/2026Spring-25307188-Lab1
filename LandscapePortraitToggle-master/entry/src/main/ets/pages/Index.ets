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

import { AnimateCallback, CustomTransition } from '../common/CustomTransition';
import Logger from '../common/Logger';
import { WindowUtils } from '../utils/WindowUtils';

// Page name that allows custom transitions
let allowedCustomTransitionFromPageName: string[] = ['DetailPlay'];
let allowedCustomTransitionToPageName: string[] = ['LandscapePlay'];

// Both clicking and returning require custom transitions, so each needs to be handled separately.
function isCustomTransitionEnable(from: string, to: string): boolean {
  return (allowedCustomTransitionFromPageName.includes(from) && allowedCustomTransitionToPageName.includes(to)) ||
    (allowedCustomTransitionFromPageName.includes(to) && allowedCustomTransitionToPageName.includes(from));
}

@Entry
@Component
struct Index {
  @StorageLink('statusBarHeight') statusBarHeight: number = 0;
  @StorageLink('navBarHeight') navBarHeight: number = 0;
  @State isTablet: boolean = false;
  @State deviceScale: number = 1.0;
  private pageStack: NavPathStack = new NavPathStack();

  customTransition(from: NavContentInfo, to: NavContentInfo,
    operation: NavigationOperation): NavigationAnimatedTransition | undefined {
    // [Start check_transition1]
    // If the parameters related to jumping are not defined, no custom animation will be performed.
    if (!from || !to || !from.name || !to.name || !from.navDestinationId || !to.navDestinationId) {
      return undefined;
    }

    // If it is the homepage, no custom animation will be performed.
    if (from.index === -1 || to.index === -1) {
      return undefined;
    }

    // Control custom transition routes using the names of from and to.
    if (!isCustomTransitionEnable(from.name, to.name)) {
      return undefined;
    }
    // [End check_transition1]

    // [Start check_transition2]
    // It is necessary to check whether the transition page has registered an animation
    // in order to decide whether to perform a custom transition.
    let fromParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(from.navDestinationId);
    let toParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(to.navDestinationId);
    if (!fromParam.animation || !toParam.animation) {
      return undefined;
    }
    // [End check_transition2]

    // [Start create_transition_animation]
    // After all judgments are made, construct customAnimation for the system to call
    // and execute the custom transition animation.
    let customAnimation: NavigationAnimatedTransition = {
      // Transition Completed Callback
      onTransitionEnd: (isSuccess: boolean) => {
        Logger.info(`onTransitionEnd success: ${isSuccess}`)
      },
      // Animation timeout end time
      timeout: 1000,
      // Custom transition animation execution callback.
      // transitionProxy: Custom transition animation delegate object
      transition: (transitionProxy: NavigationTransitionProxy) => {
        Logger.info('customAnimation transition');
        // Run the current page animation
        if (fromParam.animation) {
          fromParam.animation(operation === NavigationOperation.PUSH, true, transitionProxy)
        }

        // Execute jump-to-target page animation
        if (toParam.animation) {
          toParam.animation(operation === NavigationOperation.PUSH, false, transitionProxy)
        }
      }
    }
    return customAnimation;
  }
  // [End create_transition_animation]

  // [Start off_window_size_change]
  aboutToAppear(): void {
    // Remove window size listener
    WindowUtils.windowClass.off('windowSizeChange');
    this.isTablet = WindowUtils.isTablet();
    this.deviceScale = WindowUtils.getDeviceScale();
  }
  // [End off_window_size_change]

  // [Start bind_transition_animation]
  build() {
    Navigation(this.pageStack) {
      // [StartExclude bind_transition_animation]
      Column({ space: 12 * this.deviceScale }) {
        Button($r('app.string.transition_in_page'), { buttonStyle: ButtonStyleMode.NORMAL })
          .width('100%')
          .height(40 * this.deviceScale)
          .fontSize(16 * this.deviceScale)
          .onClick(() => {
            this.pageStack.pushPath({ name: 'VideoDetail' })
          })

        Button($r('app.string.transition_between_page'), { buttonStyle: ButtonStyleMode.NORMAL })
          .width('100%')
          .height(40 * this.deviceScale)
          .fontSize(16 * this.deviceScale)
          .onClick(() => {
            this.pageStack.pushPath({ name: 'DetailPlay' });
          })
      }
      .justifyContent(FlexAlign.End)
      .height('100%')
      .width('100%')
      .padding({
        left: 16 * this.deviceScale,
        right: 16 * this.deviceScale,
        bottom: 16 * this.deviceScale
      })
      // [EndExclude bind_transition_animation]
    }
    // [StartExclude bind_transition_animation]
    .height('100%')
    .width('100%')
    .mode(NavigationMode.Stack)
    .backgroundColor($r('sys.color.background_secondary'))
    .title($r('app.string.page_title'))
    // [EndExclude bind_transition_animation]
    // Bind custom transition animation.
    .customNavContentTransition(this.customTransition)
  }
  // [End bind_transition_animation]
}