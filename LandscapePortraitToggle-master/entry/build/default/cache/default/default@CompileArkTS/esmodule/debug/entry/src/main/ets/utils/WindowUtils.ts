import display from "@ohos:display";
import window from "@ohos:window";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'WindowUtilsTag';
/**
 * Window Utility Class
 */
export class WindowUtils {
    public static windowWidthPx: number;
    public static windowHeightPx: number;
    public static windowStage: window.WindowStage;
    public static windowClass: window.Window;
    /**
     * Initialize the window object and get the height of the status bar and bottom navigation bar
     * @param windowStage window object
     */
    public static initWindow(windowStage: window.WindowStage) {
        WindowUtils.windowStage = windowStage;
        try {
            let windowClass: window.Window = windowStage.getMainWindowSync();
            WindowUtils.windowClass = windowClass;
            let context: UIContext = windowClass.getUIContext();
            let statusBarArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
            let statusBarHeight = context.px2vp(statusBarArea.topRect.height);
            AppStorage.setOrCreate('statusBarHeight', statusBarHeight);
            let navBarArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
            let navBarHeight = context.px2vp(navBarArea.bottomRect.height);
            AppStorage.setOrCreate('navBarHeight', navBarHeight);
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `initWindow err, code: ${error.code}, message: ${error.message}`);
        }
    }
    /**
     * Set the status bar background and content color
     * @param statusbarColor Status bar background color
     * @param contentColor Status difficult content color
     */
    public static setStatusbarAndContentColor(statusbarColor: string, contentColor: string) {
        try {
            let mainWindow = WindowUtils.windowStage.getMainWindowSync();
            let SystemBarProperties: window.SystemBarProperties = {
                statusBarColor: statusbarColor,
                statusBarContentColor: contentColor
            };
            mainWindow.setWindowSystemBarProperties(SystemBarProperties).catch((error: BusinessError) => {
                Logger.error(TAG, `setStatusbarAndContentColor err, code: ${error.code}, message: ${error.message}`);
            });
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `setStatusbarContentColor err, code: ${error.code}, message: ${error.message}`);
        }
    }
    /**
     * Is device in expanded or half expanded state.
     *
     * @returns Return to collapsed state
     */
    // [Start is_expanded_or_half]
    static isExpandedOrHalfFolded(): boolean {
        let isExpandedOrHalfFolded: boolean = false;
        try {
            isExpandedOrHalfFolded = display.getFoldStatus() === display.FoldStatus.FOLD_STATUS_EXPANDED ||
                display.getFoldStatus() === display.FoldStatus.FOLD_STATUS_HALF_FOLDED;
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `isExpandedOrHalfFolded err, error code: ${error.code}, error message: ${error.message}`);
        }
        return isExpandedOrHalfFolded;
    }
    // [End is_expanded_or_half]
    /**
     * Is device in folded state.
     *
     * @returns Return to collapsed state
     */
    static isFolded(): boolean {
        let isFolded: boolean = false;
        try {
            isFolded = display.getFoldStatus() === display.FoldStatus.FOLD_STATUS_FOLDED;
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `isFolded err, error code: ${error.code}, error message: ${error.message}`);
        }
        return isFolded;
    }
    /**
     * Set window orientation
     * @param orientation window orientation value
     */
    static setOrientation(orientation: window.Orientation) {
        WindowUtils.windowClass.setPreferredOrientation(orientation).then(() => {
            Logger.info(`setWindowOrientation ${orientation} Succeeded`);
        }).catch((err: BusinessError) => {
            let error = err as BusinessError;
            Logger.error(TAG, `setWindowOrientation ${orientation} err, code: ${error.code}, message: ${error.message}`);
        });
    }
}
