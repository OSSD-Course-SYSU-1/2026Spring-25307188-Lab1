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
import { Size } from '@kit.ArkUI';

/**
 * Obtain the width and height of the video display
 * @param windowHeight Window height
 * @param windowWidth Window width
 * @param videoRatio The width/height ratio of the original video
 * @returns Return the width and height displayed in the final video
 */
export function getVideoSize(windowHeight: number, windowWidth: number, videoRatio: number): Size {
  const screenRatio = windowWidth / windowHeight;
  let videoHeight = 0;
  let videoWidth = 0;

  if (videoRatio >= screenRatio) {
    // Based on width
    videoWidth = windowWidth;
    videoHeight = windowWidth / videoRatio;
  } else {
    // Based on high standards
    videoHeight = windowHeight;
    videoWidth = windowHeight * videoRatio;
  }
  return { width: videoWidth, height: videoHeight };
}