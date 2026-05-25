if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabsView_Params {
    isLayoutFullScreen?: boolean;
}
interface VideoDetailView_Params {
}
interface VideoPlayView_Params {
    statusBarHeight?: number;
    navStack?: NavPathStack | null;
    aspect?: number;
    xComponentWidth?: number;
    xComponentHeight?: number;
    windowHeight?: number;
    windowWidth?: number;
    isLandscape?: boolean;
    isVideoLock?: boolean;
    orientationLockState?: string;
    xComponentController?: XComponentController;
    player?: AVPlayerUtil;
    windowClass?: window.Window | undefined;
    context?;
    // [StartExclude set_orientation]
    onBackPressedCall?: () => boolean;
}
import display from "@ohos:display";
import window from "@ohos:window";
import type common from "@ohos:app.ability.common";
import type { BusinessError } from "@ohos:base";
import settings from "@ohos:settings";
import { AVPlayerUtil } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/AVPlayerUtil";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
import { WindowUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/WindowUtils";
import { getVideoSize } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/CommonUtils";
const TAG = 'VideoPlayViewLogTag';
export class VideoPlayView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__statusBarHeight = this.createStorageLink('statusBarHeight', 0, "statusBarHeight");
        this.__navStack = this.initializeConsume("navStack", "navStack", null);
        this.__aspect = new ObservedPropertySimplePU(16 / 9, this, "aspect");
        this.__xComponentWidth = new ObservedPropertySimplePU(0, this, "xComponentWidth");
        this.__xComponentHeight = new ObservedPropertySimplePU(0, this, "xComponentHeight");
        this.__windowHeight = new ObservedPropertySimplePU(0, this, "windowHeight");
        this.__windowWidth = new ObservedPropertySimplePU(0, this, "windowWidth");
        this.__isLandscape = this.createStorageLink('isLandscape', false, "isLandscape");
        this.__isVideoLock = this.createStorageLink('isVideoLock', false, "isVideoLock");
        this.__orientationLockState = new ObservedPropertySimplePU('1', this, "orientationLockState");
        this.xComponentController = new XComponentController();
        this.player = undefined;
        this.windowClass = undefined;
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.onBackPressedCall = () => {
            return true;
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoPlayView_Params) {
        if (params.aspect !== undefined) {
            this.aspect = params.aspect;
        }
        if (params.xComponentWidth !== undefined) {
            this.xComponentWidth = params.xComponentWidth;
        }
        if (params.xComponentHeight !== undefined) {
            this.xComponentHeight = params.xComponentHeight;
        }
        if (params.windowHeight !== undefined) {
            this.windowHeight = params.windowHeight;
        }
        if (params.windowWidth !== undefined) {
            this.windowWidth = params.windowWidth;
        }
        if (params.orientationLockState !== undefined) {
            this.orientationLockState = params.orientationLockState;
        }
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.player !== undefined) {
            this.player = params.player;
        }
        if (params.windowClass !== undefined) {
            this.windowClass = params.windowClass;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.onBackPressedCall !== undefined) {
            this.onBackPressedCall = params.onBackPressedCall;
        }
    }
    updateStateVars(params: VideoPlayView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__statusBarHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__navStack.purgeDependencyOnElmtId(rmElmtId);
        this.__aspect.purgeDependencyOnElmtId(rmElmtId);
        this.__xComponentWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__xComponentHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__windowHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__windowWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__isLandscape.purgeDependencyOnElmtId(rmElmtId);
        this.__isVideoLock.purgeDependencyOnElmtId(rmElmtId);
        this.__orientationLockState.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__statusBarHeight.aboutToBeDeleted();
        this.__navStack.aboutToBeDeleted();
        this.__aspect.aboutToBeDeleted();
        this.__xComponentWidth.aboutToBeDeleted();
        this.__xComponentHeight.aboutToBeDeleted();
        this.__windowHeight.aboutToBeDeleted();
        this.__windowWidth.aboutToBeDeleted();
        this.__isLandscape.aboutToBeDeleted();
        this.__isVideoLock.aboutToBeDeleted();
        this.__orientationLockState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // [StartExclude set_orientation]
    private __statusBarHeight: ObservedPropertyAbstractPU<number>;
    get statusBarHeight() {
        return this.__statusBarHeight.get();
    }
    set statusBarHeight(newValue: number) {
        this.__statusBarHeight.set(newValue);
    }
    private __navStack: ObservedPropertyAbstractPU<NavPathStack | null>;
    get navStack() {
        return this.__navStack.get();
    }
    set navStack(newValue: NavPathStack | null) {
        this.__navStack.set(newValue);
    }
    private __aspect: ObservedPropertySimplePU<number>; // default video height/width ratio value
    get aspect() {
        return this.__aspect.get();
    }
    set aspect(newValue: number) {
        this.__aspect.set(newValue);
    }
    // [Start xComponent_size]
    private __xComponentWidth: ObservedPropertySimplePU<number>;
    get xComponentWidth() {
        return this.__xComponentWidth.get();
    }
    set xComponentWidth(newValue: number) {
        this.__xComponentWidth.set(newValue);
    }
    private __xComponentHeight: ObservedPropertySimplePU<number>;
    get xComponentHeight() {
        return this.__xComponentHeight.get();
    }
    set xComponentHeight(newValue: number) {
        this.__xComponentHeight.set(newValue);
    }
    // [End xComponent_size]
    private __windowHeight: ObservedPropertySimplePU<number>;
    get windowHeight() {
        return this.__windowHeight.get();
    }
    set windowHeight(newValue: number) {
        this.__windowHeight.set(newValue);
    }
    private __windowWidth: ObservedPropertySimplePU<number>;
    get windowWidth() {
        return this.__windowWidth.get();
    }
    set windowWidth(newValue: number) {
        this.__windowWidth.set(newValue);
    }
    private __isLandscape: ObservedPropertyAbstractPU<boolean>; // Whether it is in full-screen playback state
    get isLandscape() {
        return this.__isLandscape.get();
    }
    set isLandscape(newValue: boolean) {
        this.__isLandscape.set(newValue);
    }
    private __isVideoLock: ObservedPropertyAbstractPU<boolean>; // Whether the video playback is locked
    get isVideoLock() {
        return this.__isVideoLock.get();
    }
    set isVideoLock(newValue: boolean) {
        this.__isVideoLock.set(newValue);
    }
    private __orientationLockState: ObservedPropertySimplePU<string>; // control center switch rotation ,value 1:enable 0：disable
    get orientationLockState() {
        return this.__orientationLockState.get();
    }
    set orientationLockState(newValue: string) {
        this.__orientationLockState.set(newValue);
    }
    private xComponentController: XComponentController;
    private player?: AVPlayerUtil;
    // [EndExclude set_orientation]
    private windowClass: window.Window | undefined;
    private context;
    // [StartExclude set_orientation]
    private onBackPressedCall: () => boolean;
    // [EndExclude set_orientation]
    aboutToAppear(): void {
        // [StartExclude set_orientation]
        // Status bar rotation lock switch status
        this.getOrientationLockState();
        try {
            // [EndExclude set_orientation]
            this.windowClass = this.context.windowStage.getMainWindowSync(); // Obtains the window instance
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
                }
                else {
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
            });
            // [End on_window_size_change_detail]
            // [End calculate_video_size]
            // [End on_window_size_change]
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `aboutToAppear err, error code: ${error.code}, error message: ${error.message}`);
        }
        // [EndExclude set_orientation]
    }
    // [StartExclude set_orientation]
    setXComponentSize(): void {
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
        });
    }
    // [StartExclude set_orientation]
    getOrientationLockState(): void {
        // Get the rotation lock on state
        this.orientationLockState = settings.getValueSync(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS, settings.domainName.DEVICE_SHARED);
        // [Start lock_status_change]
        // Monitor the status of the rotation lock switch in the status bar
        settings.registerKeyObserver(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS, settings.domainName.DEVICE_SHARED, () => {
            this.orientationLockState =
                settings.getValueSync(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS, settings.domainName.DEVICE_SHARED);
        });
        // [End lock_status_change]
    }
    aboutToDisappear(): void {
        settings.unregisterKeyObserver(this.context, settings.general.ACCELEROMETER_ROTATION_STATUS, settings.domainName.DEVICE_SHARED);
        this.player?.release();
        this.setOrientation(window.Orientation.PORTRAIT);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.backgroundColor({ "id": 125831015, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Stack.height(this.isLandscape ? '100%' : this.xComponentHeight + this.statusBarHeight);
            Stack.backgroundColor(Color.Black);
            Stack.padding({ top: this.isLandscape ? 0 : this.statusBarHeight });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start X_component]
            // [Start X_component_size]
            XComponent.create({ id: 'video_player_id', type: XComponentType.SURFACE, controller: this.xComponentController }, "com.example.landscapeportraittoggle/entry");
            // [Start X_component]
            // [Start X_component_size]
            XComponent.onLoad(() => {
                // [StartExclude X_component]
                try {
                    this.player = new AVPlayerUtil(this.context);
                    this.player.setSurfaceId(this.xComponentController.getXComponentSurfaceId());
                    this.player.initPlayer('videoTest.mp4', (aspect: number) => {
                        this.aspect = aspect;
                        this.setXComponentSize();
                    });
                }
                catch (err) {
                    let error = err as BusinessError;
                    Logger.error(TAG, `initPlayer err, error code: ${error.code}, error message: ${error.message}`);
                }
                // [EndExclude X_component]
            });
            // [Start X_component]
            // [Start X_component_size]
            XComponent.width(this.xComponentWidth);
            // [Start X_component]
            // [Start X_component_size]
            XComponent.height(this.xComponentHeight);
        }, XComponent);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.width('100%');
            RelativeContainer.height('100%');
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isVideoLock) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // [Start icon_back]
                        Button.createWithChild({ type: ButtonType.Circle });
                        // [Start icon_back]
                        Button.height(40);
                        // [Start icon_back]
                        Button.aspectRatio(1);
                        // [Start icon_back]
                        Button.backgroundColor('#19FFFFFF');
                        // [Start icon_back]
                        Button.margin({
                            left: 16,
                            top: this.isLandscape ? this.statusBarHeight : 8
                        });
                        // [Start icon_back]
                        Button.onClick(() => {
                            // Exit the current page if not in landscape mode
                            if (!this.isLandscape) {
                                this.navStack?.pop();
                                return;
                            }
                            // [StartExclude icon_back]
                            if (WindowUtils.isExpandedOrHalfFolded()) {
                                this.isLandscape = false;
                            }
                            else {
                                // [EndExclude icon_back]
                                // Set the window orientation to portrait
                                this.setOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
                                // [StartExclude icon_back]
                            }
                            // [EndExclude icon_back]
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        SymbolGlyph.create({ "id": 125833534, "type": 40000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                        SymbolGlyph.fontColor([{ "id": 125831057, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }]);
                        SymbolGlyph.fontSize({ "id": 125830965, "type": 10002, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                    }, SymbolGlyph);
                    // [Start icon_back]
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLandscape) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // [Start is_video_lock_image]
                        Image.create(this.isVideoLock ? { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" } : { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                        // [Start is_video_lock_image]
                        Image.height(24);
                        // [Start is_video_lock_image]
                        Image.width(24);
                        // [Start is_video_lock_image]
                        Image.fillColor(Color.White);
                        // [Start is_video_lock_image]
                        Image.alignRules({
                            top: { anchor: '__container__', align: VerticalAlign.Center },
                            left: { anchor: '__container__', align: HorizontalAlign.Start }
                        });
                        // [Start is_video_lock_image]
                        Image.margin({ left: this.statusBarHeight });
                        // [Start is_video_lock_image]
                        Image.offset({ y: -12 });
                        // [Start is_video_lock_image]
                        Image.onClick(() => {
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
                            }
                            else {
                                // Otherwise, set the window orientation to auto-rotate.
                                this.setOrientation(window.Orientation.AUTO_ROTATION);
                            }
                            // [End is_video_lock]
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isLandscape) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // [Start icon_zoom_in]
                        SymbolGlyph.create({ "id": 125832700, "type": 40000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                        // [Start icon_zoom_in]
                        SymbolGlyph.fontColor([{ "id": 125831057, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }]);
                        // [Start icon_zoom_in]
                        SymbolGlyph.fontSize(24);
                        // [Start icon_zoom_in]
                        SymbolGlyph.alignRules({
                            bottom: { anchor: '__container__', align: VerticalAlign.Bottom },
                            right: { anchor: '__container__', align: HorizontalAlign.End }
                        });
                        // [Start icon_zoom_in]
                        SymbolGlyph.margin({
                            right: 16,
                            bottom: 8
                        });
                        // [Start icon_zoom_in]
                        SymbolGlyph.onClick(() => {
                            if (WindowUtils.isExpandedOrHalfFolded()) {
                                // When the device is folded or half-folded,
                                // the playback mode is set to landscape mode, and the window rotation is set to auto-rotate.
                                this.isLandscape = true;
                                this.setOrientation(window.Orientation.AUTO_ROTATION);
                            }
                            else {
                                // In a non-expanded state, such as when folded, set the window orientation to landscape.
                                this.setOrientation(window.Orientation.USER_ROTATION_LANDSCAPE);
                            }
                        });
                    }, SymbolGlyph);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        RelativeContainer.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class VideoDetailView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        if (super["initAllowComponentFreeze"] && typeof super["initAllowComponentFreeze"] === "function") {
            super["initAllowComponentFreeze"](true);
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoDetailView_Params) {
    }
    updateStateVars(params: VideoDetailView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude freeze_when_inactive]
            Text.create('Hello');
            // [StartExclude freeze_when_inactive]
            Text.fontSize(14);
            // [StartExclude freeze_when_inactive]
            Text.fontColor({ "id": 125830998, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        }, Text);
        // [StartExclude freeze_when_inactive]
        Text.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
// [End freeze_when_inactive]
// [Start Image_item]
function ImageItem(imageSrc: ResourceStr, parent = null) {
    const __imageSrc__ = imageSrc;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, imageSrc = __imageSrc__) => {
        Stack.create({});
    }, Stack);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, imageSrc = __imageSrc__) => {
        Image.create(imageSrc);
        Image.width('100%');
        Image.height('100%');
        Image.autoResize(true);
        Image.borderRadius(8);
        Image.objectFit(ImageFit.Fill);
        Image.backgroundColor('#1AFFFFFF');
    }, Image);
    Stack.pop();
}
class TabsView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isLayoutFullScreen = new ObservedPropertySimplePU(false, this, "isLayoutFullScreen");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabsView_Params) {
        if (params.isLayoutFullScreen !== undefined) {
            this.isLayoutFullScreen = params.isLayoutFullScreen;
        }
    }
    updateStateVars(params: TabsView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isLayoutFullScreen.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isLayoutFullScreen.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isLayoutFullScreen: ObservedPropertySimplePU<boolean>;
    get isLayoutFullScreen() {
        return this.__isLayoutFullScreen.get();
    }
    set isLayoutFullScreen(newValue: boolean) {
        this.__isLayoutFullScreen.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.barHeight(this.isLayoutFullScreen ? 0 : 50);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('Hello');
                    Text.fontWeight(FontWeight.Regular);
                    Text.fontColor(Color.Red);
                }, Text);
                Text.pop();
            });
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
