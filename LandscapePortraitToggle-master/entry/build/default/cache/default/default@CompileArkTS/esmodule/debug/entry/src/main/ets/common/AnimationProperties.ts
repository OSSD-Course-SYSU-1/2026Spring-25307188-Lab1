import type { RectInfoInPx } from '../utils/ComponentAttrUtils';
import { WindowUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/WindowUtils";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'AnimationPropertiesTag';
export class AnimationProperties {
    public width: number | string = '100%';
    public height: number | string = '100%';
    public translateX: number | string = 0;
    public translateY: number | string = 0;
    public rotate: number = 0;
    public uiContext: UIContext | undefined;
    constructor(uiContext: UIContext) {
        this.uiContext = uiContext;
    }
    public doAnimation(nodeInfoPx: RectInfoInPx, isPush: boolean, isExit: boolean, transitionProxy: NavigationTransitionProxy, prePageOnFinish: () => void): void {
        if (this.uiContext === undefined) {
            Logger.error(TAG, 'uiContext is undefined');
            return;
        }
        Logger.info(TAG, `windowWidth:${WindowUtils.windowWidthPx}`);
        Logger.info(TAG, `windowHeight:${WindowUtils.windowHeightPx}`);
        if (isPush && !isExit) { // Transition to a new page (landscape playback page)
            // [Start push_animation]
            // Calculate the center point of the vertical screen
            let notFullCenterX: number = nodeInfoPx.top + nodeInfoPx.height / 2;
            let notFullCenterY: number = WindowUtils.windowWidthPx - (nodeInfoPx.left + nodeInfoPx.width / 2);
            // Calculate the center coordinates after landscape rotation
            let fullCenterX: number = WindowUtils.windowHeightPx / 2;
            let fullCenterY: number = nodeInfoPx.height / 2;
            // Offset position required to calculate the center point
            let initTranslateX: number = notFullCenterX - fullCenterX;
            let initTranslateY: number = notFullCenterY - fullCenterY;
            // Set the video width, height, translation, and rotation angle properties before animation.
            this.width = this.uiContext.px2vp(nodeInfoPx.width);
            this.height = this.uiContext.px2vp(nodeInfoPx.height);
            this.translateX = this.uiContext.px2vp(initTranslateX);
            this.translateY = this.uiContext.px2vp(initTranslateY);
            this.rotate = -90;
            this.uiContext.animateTo({
                duration: 500,
                curve: Curve.EaseInOut,
                onFinish: () => {
                    if (transitionProxy) {
                        // Complete transition animation
                        transitionProxy.finishTransition();
                    }
                    AppStorage.setOrCreate('videoBackgroundColor', Color.Black);
                }
            }, () => {
                // Properties after setting the animation
                // Changes to properties in a closure function will trigger animation effects
                this.width = '100%';
                this.height = '100%';
                this.translateX = 0;
                this.translateY = 0;
                this.rotate = 0;
            });
            // [End push_animation]
        }
        else if (!isPush && isExit) { // Back to old page (video details page)
            AppStorage.setOrCreate('videoBackgroundColor', Color.Transparent);
            // [Start exit_animation]
            let notFullCenterX: number = nodeInfoPx.top + nodeInfoPx.height / 2;
            let notFullCenterY: number = WindowUtils.windowHeightPx - (nodeInfoPx.left + nodeInfoPx.width / 2);
            let fullCenterX: number = WindowUtils.windowWidthPx / 2;
            let fullCenterY: number = nodeInfoPx.height / 2;
            let initTranslateX: number = notFullCenterX - fullCenterX;
            let initTranslateY: number = notFullCenterY - fullCenterY;
            this.uiContext.animateTo({
                duration: 500,
                curve: Curve.EaseInOut,
                onFinish: () => {
                    if (transitionProxy) {
                        transitionProxy.finishTransition();
                    }
                    prePageOnFinish();
                }
            }, () => {
                // Changes to properties in a closure function will trigger animation effects
                this.width = this.uiContext!.px2vp(nodeInfoPx.width);
                this.height = this.uiContext!.px2vp(nodeInfoPx.height);
                this.translateX = this.uiContext!.px2vp(initTranslateX);
                this.translateY = this.uiContext!.px2vp(initTranslateY);
                this.rotate = -90;
            });
            // [End exit_animation]
        }
    }
    public doAnimationFoldable(nodeInfoPx: RectInfoInPx, isPush: boolean, isExit: boolean, transitionProxy: NavigationTransitionProxy, prePageOnFinish: () => void): void {
        if (this.uiContext === undefined) {
            Logger.error(TAG, 'uiContext is undefined');
            return;
        }
        AppStorage.setOrCreate('videoBackgroundColor', Color.Black);
        if (isPush && !isExit) { // Transition to a new page (landscape playback page)
            // Calculate the center point of the vertical screen
            let notFullCenterY: number = nodeInfoPx.top + nodeInfoPx.height / 2;
            // Calculate the center point of the full screen
            let fullCenterY: number = WindowUtils.windowHeightPx / 2;
            // Offset position required to calculate the center point
            let initTranslateY: number = notFullCenterY - fullCenterY;
            this.translateY = this.uiContext.px2vp(initTranslateY);
            this.uiContext.animateTo({
                duration: 500,
                curve: Curve.EaseInOut,
                onFinish: () => {
                    if (transitionProxy) {
                        transitionProxy.finishTransition();
                    }
                }
            }, () => {
                this.translateY = 0;
            });
        }
        else if (!isPush && isExit) { // Return to the previous page (video details page)
            // Calculate the center point of the vertical screen
            let notFullCenterY: number = nodeInfoPx.top + (AppStorage.has('defaultVideoHeight') ?
                (this.uiContext.vp2px(AppStorage.get('defaultVideoHeight') as number)) / 2 :
                nodeInfoPx.height / 2);
            // Calculate the center point of the full screen
            let fullCenterY: number = WindowUtils.windowHeightPx / 2 + 10;
            // Offset position required to calculate the center point
            let initTranslateY: number = notFullCenterY - fullCenterY;
            this.translateY = 0;
            this.uiContext.animateTo({
                duration: 500,
                curve: Curve.EaseInOut,
                onFinish: () => {
                    if (transitionProxy) {
                        transitionProxy.finishTransition();
                    }
                    prePageOnFinish();
                }
            }, () => {
                // When returning to the details page, reset the custom node attributes
                this.translateY = this.uiContext!.px2vp(initTranslateY);
                AppStorage.setOrCreate('videoBackgroundColor', Color.Transparent);
            });
        }
    }
}
