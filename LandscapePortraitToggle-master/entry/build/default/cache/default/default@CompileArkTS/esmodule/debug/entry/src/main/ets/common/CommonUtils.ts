import type { Size } from "@ohos:arkui.node";
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
    }
    else {
        // Based on high standards
        videoHeight = windowHeight;
        videoWidth = windowHeight * videoRatio;
    }
    return { width: videoWidth, height: videoHeight };
}
