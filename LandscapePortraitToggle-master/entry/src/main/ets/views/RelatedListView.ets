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

import { Related, RELATED_LIST_DATA } from '../model/RelatedModel';

@Builder
export function RelatedListView() {
  Column() {
    Row() {
      Text($r('app.string.related_list'))
        .fontSize(16)
        .fontColor($r('sys.color.font_primary'))
        .fontWeight(500)

      Row({ space: 4 }) {
        Text($r('app.string.more'))
          .fontSize(14)
          .fontColor($r('sys.color.mask_secondary'))
        Image($r('app.media.chevron_right'))
          .height(24)
          .width(12)
      }
    }
    .justifyContent(FlexAlign.SpaceBetween)
    .height(48)
    .width('100%')
    .padding({
      left: 16,
      right: 16
    })

    List({ space: 8 }) {
      ForEach(RELATED_LIST_DATA, (item: Related, index: number) => {
        RelatedItem(item, index === 0, index === RELATED_LIST_DATA.length - 1)
      }, (item: Related) => JSON.stringify(item))
    }
    .listDirection(Axis.Horizontal)
    .scrollBar(BarState.Off)
    .width('100%')
    .height(100)
  }
}

@Builder
function RelatedItem(itemData: Related, isFirstItem: boolean, isLastItem: boolean) {

  ListItem() {
    Column() {
      Image(itemData.cover)
        .width('100%')
        .margin({ bottom: 8 })
      Text(itemData.title)
        .fontSize(14)
        .fontWeight(500)
        .width('100%')
        .fontColor(isFirstItem ? $r('sys.color.brand_font') : $r('sys.color.font_primary'))
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .textAlign(TextAlign.Start)
    }
    .width(140)
    .margin({
      left: isFirstItem ? 16 : 0,
      right: isLastItem ? 16 : 0
    })
  }
}