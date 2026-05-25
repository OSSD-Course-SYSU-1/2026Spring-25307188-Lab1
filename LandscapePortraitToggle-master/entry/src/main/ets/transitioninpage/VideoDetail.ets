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

import { VideoPlayView } from './VideoPlayView';
import { BottomView } from '../views/BottomView';
import { RelatedListView } from '../views/RelatedListView';
import { CommentsView } from '../views/CommentsView';
import { WindowUtils } from '../utils/WindowUtils';
import { window } from '@kit.ArkUI';

@Builder
export function VideoDetailBuilder() {
  VideoDetail();
}

@Component
struct VideoDetail {
  @StorageLink('navBarHeight') navBarHeight: number = 0;
  @Provide navStack: NavPathStack | null = null;
  @StorageLink('isLandscape') isLandscape: boolean = false;
  @StorageLink('isVideoLock') isVideoLock: boolean = false;

  build() {
    NavDestination() {
      Column() {
        VideoPlayView()

        Scroll() {
          Column() {
            RelatedListView()
            CommentsView()
          }
        }
        .backgroundColor($r('sys.color.background_primary'))
        .layoutWeight(1)
        .scrollBar(BarState.Off)
        .padding({ bottom: 16 })

        BottomView()
          .margin({ bottom: this.navBarHeight })
      }
      .height('100%')
      .width('100%')
    }
    .backgroundColor($r('sys.color.background_primary'))
    .hideTitleBar(true)
    .ignoreLayoutSafeArea()
    .enableNavigationIndicator(!this.isLandscape)
    .onAppear(() => {
      WindowUtils.setStatusbarAndContentColor('#000000', '#F1F3F5');
    })
    .onWillDisappear(() => {
      WindowUtils.setStatusbarAndContentColor('#F1F3F5', '#000000');
    })
    .onBackPressed(() => {
      if (this.isVideoLock) {
        return true;
      }
      if (this.isLandscape) {
        this.isLandscape = false;
        if (!WindowUtils.isExpandedOrHalfFolded()) {
          WindowUtils.setOrientation(window.Orientation.PORTRAIT);
        }
        return true;
      } else {
        return false;
      }
    })
    .onReady((ctx: NavDestinationContext) => {
      if (ctx.navDestinationId) {
        this.navStack = ctx.pathStack;
      }
    })
  }
}