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

/**
 *  Get the component's position relative to the window
 */
import { componentUtils } from '@kit.ArkUI';
import Logger from '../common/Logger';

const TAG = 'ComponentAttrUtilsTag';

export class RectInfoInPx {
  left: number = 0;
  top: number = 0;
  right: number = 0;
  bottom: number = 0;
  width: number = 0;
  height: number = 0;
}

export class ComponentAttrUtils {
  /**
   * Get the position information of a component based on its ID
   * @param context UIContext object
   * @param id Component id
   * @returns Component information
   */
  public static getRectInfoById(context: UIContext, id: string): RectInfoInPx {
    let rstRect: RectInfoInPx = new RectInfoInPx();
    try {
      let componentInfo: componentUtils.ComponentInfo = context.getComponentUtils().getRectangleById(id);
      const widthScaleGap = componentInfo.size.width * (1 - componentInfo.scale.x) / 2;
      const heightScaleGap = componentInfo.size.height * (1 - componentInfo.scale.y) / 2;
      rstRect.left = componentInfo.translate.x + componentInfo.windowOffset.x + widthScaleGap;
      rstRect.top = componentInfo.translate.y + componentInfo.windowOffset.y + heightScaleGap;
      rstRect.right =
        componentInfo.translate.x + componentInfo.windowOffset.x + componentInfo.size.width - widthScaleGap;
      rstRect.bottom =
        componentInfo.translate.y + componentInfo.windowOffset.y + componentInfo.size.height - heightScaleGap;
      rstRect.width = rstRect.right - rstRect.left;
      rstRect.height = rstRect.bottom - rstRect.top;
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `getRectInfoById err, code: ${error.code}, message: ${error.message}`);
    }
    return rstRect;
  }
}