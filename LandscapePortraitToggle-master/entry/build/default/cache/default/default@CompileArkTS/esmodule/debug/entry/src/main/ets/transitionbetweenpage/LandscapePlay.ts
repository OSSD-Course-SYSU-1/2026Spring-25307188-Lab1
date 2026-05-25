if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MyPageLandscape_Params {
    videoBackgroundColor?: Color;
    statusBarHeight?: number;
    navBarHeight?: number;
    animationProperties?: AnimationProperties;
    nodeController?: VideoNodeController;
    displayOrientation?: window.Orientation;
    stack?: NavPathStack | null;
    pageId?: string;
    prePageDoFinishTransition?: () => void;
    nodeRectInfo?: RectInfoInPx;
}
import { AnimationProperties } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/AnimationProperties";
import { RectInfoInPx } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/ComponentAttrUtils";
import { CustomTransition } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/CustomTransition";
import { VideoNodeController } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/VideoNodeController";
import display from "@ohos:display";
import window from "@ohos:window";
import { WindowUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/WindowUtils";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
export function LandscapePlayBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MyPageLandscape(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/transitionbetweenpage/LandscapePlay.ets", line: 11, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MyPageLandscape" });
    }
}
const TAG = 'MyPageLandscapeTag';
export class MyPageLandscape extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__videoBackgroundColor = this.createStorageLink('videoBackgroundColor', Color.Transparent, "videoBackgroundColor");
        this.__statusBarHeight = this.createStorageLink('statusBarHeight', 0, "statusBarHeight");
        this.__navBarHeight = this.createStorageLink('navBarHeight', 0, "navBarHeight");
        this.__animationProperties = new ObservedPropertyObjectPU(new AnimationProperties(this.getUIContext()), this, "animationProperties");
        this.__nodeController = new ObservedPropertyObjectPU(VideoNodeController.getInstance(), this, "nodeController");
        this.__displayOrientation = new ObservedPropertySimplePU(window.Orientation.LANDSCAPE, this, "displayOrientation");
        this.stack = null;
        this.pageId = '-1';
        this.prePageDoFinishTransition = () => {
        };
        this.nodeRectInfo = new RectInfoInPx();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MyPageLandscape_Params) {
        if (params.animationProperties !== undefined) {
            this.animationProperties = params.animationProperties;
        }
        if (params.nodeController !== undefined) {
            this.nodeController = params.nodeController;
        }
        if (params.displayOrientation !== undefined) {
            this.displayOrientation = params.displayOrientation;
        }
        if (params.stack !== undefined) {
            this.stack = params.stack;
        }
        if (params.pageId !== undefined) {
            this.pageId = params.pageId;
        }
        if (params.prePageDoFinishTransition !== undefined) {
            this.prePageDoFinishTransition = params.prePageDoFinishTransition;
        }
        if (params.nodeRectInfo !== undefined) {
            this.nodeRectInfo = params.nodeRectInfo;
        }
    }
    updateStateVars(params: MyPageLandscape_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__videoBackgroundColor.purgeDependencyOnElmtId(rmElmtId);
        this.__statusBarHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__navBarHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__animationProperties.purgeDependencyOnElmtId(rmElmtId);
        this.__nodeController.purgeDependencyOnElmtId(rmElmtId);
        this.__displayOrientation.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__videoBackgroundColor.aboutToBeDeleted();
        this.__statusBarHeight.aboutToBeDeleted();
        this.__navBarHeight.aboutToBeDeleted();
        this.__animationProperties.aboutToBeDeleted();
        this.__nodeController.aboutToBeDeleted();
        this.__displayOrientation.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // [StartExclude landscape_bind_controller]
    private __videoBackgroundColor: ObservedPropertyAbstractPU<Color>;
    get videoBackgroundColor() {
        return this.__videoBackgroundColor.get();
    }
    set videoBackgroundColor(newValue: Color) {
        this.__videoBackgroundColor.set(newValue);
    }
    private __statusBarHeight: ObservedPropertyAbstractPU<number>;
    get statusBarHeight() {
        return this.__statusBarHeight.get();
    }
    set statusBarHeight(newValue: number) {
        this.__statusBarHeight.set(newValue);
    }
    private __navBarHeight: ObservedPropertyAbstractPU<number>;
    get navBarHeight() {
        return this.__navBarHeight.get();
    }
    set navBarHeight(newValue: number) {
        this.__navBarHeight.set(newValue);
    }
    private __animationProperties: ObservedPropertyObjectPU<AnimationProperties>;
    get animationProperties() {
        return this.__animationProperties.get();
    }
    set animationProperties(newValue: AnimationProperties) {
        this.__animationProperties.set(newValue);
    }
    // [EndExclude landscape_bind_controller]
    // Obtaining the VideoNodeController instance
    private __nodeController: ObservedPropertyObjectPU<VideoNodeController>;
    get nodeController() {
        return this.__nodeController.get();
    }
    set nodeController(newValue: VideoNodeController) {
        this.__nodeController.set(newValue);
    }
    // Page display orientation, default is landscape.
    private __displayOrientation: ObservedPropertySimplePU<window.Orientation>;
    get displayOrientation() {
        return this.__displayOrientation.get();
    }
    set displayOrientation(newValue: window.Orientation) {
        this.__displayOrientation.set(newValue);
    }
    // [StartExclude landscape_bind_controller]
    private stack: NavPathStack | null;
    private pageId: string;
    private prePageDoFinishTransition: () => void;
    private nodeRectInfo: RectInfoInPx;
    aboutToAppear(): void {
        if (WindowUtils.isExpandedOrHalfFolded()) {
            this.displayOrientation = window.Orientation.PORTRAIT;
        }
        else {
            this.displayOrientation = window.Orientation.LANDSCAPE;
        }
        this.foldStatusChangeUI();
    }
    // [Start folded_status_change]
    // Handling UI adaptation for video playback with collapse and expand functionality
    foldStatusChangeUI() {
        try {
            let beforeFoldedStatus: display.FoldStatus = display.getFoldStatus();
            // Handling UI adaptation for video playback with collapse and expand functionality
            let callback: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
                // Full-screen playback: Expanded / Semi-expanded -> Collapsed detail page playback
                if ((beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_EXPANDED ||
                    beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED) &&
                    data === display.FoldStatus.FOLD_STATUS_FOLDED) {
                    CustomTransition.getInstance().unRegisterNavParam(this.pageId);
                    this.stack?.pop(false);
                    this.prePageDoFinishTransition();
                }
                // Full-screen playback: collapsed state -> expanded state full playback
                if (beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED &&
                    data === display.FoldStatus.FOLD_STATUS_EXPANDED) {
                    this.displayOrientation = window.Orientation.PORTRAIT;
                }
                beforeFoldedStatus = data;
            };
            display.on('foldStatusChange', callback);
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `on foldStatusChangeUI err, code: ${error.code}, message: ${error.message}`);
        }
    }
    // [End folded_status_change]
    aboutToDisappear(): void {
        try {
            display.off('foldStatusChange');
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `off foldStatusChange err, code: ${error.code}, message: ${error.message}`);
        }
    }
    // [EndExclude landscape_bind_controller]
    // [Start bind_transition_animation]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                    Stack.alignContent(Alignment.Center);
                    Stack.width(this.animationProperties.width);
                    Stack.height(this.animationProperties.height);
                    Stack.translate({ x: this.animationProperties.translateX, y: this.animationProperties.translateY });
                    Stack.rotate({ angle: this.animationProperties.rotate });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Bind the NodeController to the NodeContainer
                    NodeContainer.create(this.nodeController);
                }, NodeContainer);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // [StartExclude landscape_bind_controller]
                    Stack.create();
                    // [StartExclude landscape_bind_controller]
                    Stack.alignContent(Alignment.TopStart);
                    // [StartExclude landscape_bind_controller]
                    Stack.width('100%');
                    // [StartExclude landscape_bind_controller]
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithChild({ type: ButtonType.Circle });
                    Button.height(40);
                    Button.aspectRatio(1);
                    Button.backgroundColor('#19FFFFFF');
                    Button.margin({
                        left: 16,
                        top: 8
                    });
                    Button.alignRules({
                        top: { anchor: '__container__', align: VerticalAlign.Top },
                        left: { anchor: '__container__', align: HorizontalAlign.Start }
                    });
                    Button.onClick(() => {
                        this.stack?.pop();
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    SymbolGlyph.create({ "id": 125833534, "type": 40000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                    SymbolGlyph.fontColor([{ "id": 125831057, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }]);
                    SymbolGlyph.fontSize({ "id": 125830965, "type": 10002, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                }, SymbolGlyph);
                Button.pop();
                // [StartExclude landscape_bind_controller]
                Stack.pop();
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/transitionbetweenpage/LandscapePlay" });
            NavDestination.preferredOrientation(this.displayOrientation);
            NavDestination.enableStatusBar(WindowUtils.isExpandedOrHalfFolded());
            NavDestination.enableNavigationIndicator(WindowUtils.isExpandedOrHalfFolded());
            NavDestination.width('100%');
            NavDestination.height('100%');
            NavDestination.backgroundColor(this.videoBackgroundColor);
            NavDestination.hideTitleBar(true);
            NavDestination.hideToolBar(true);
            NavDestination.onBackPressed(() => {
                return true;
            });
            NavDestination.onDisAppear(() => {
                if (this.pageId !== '-1') {
                    CustomTransition.getInstance().unRegisterNavParam(this.pageId);
                }
            });
            NavDestination.onReady((ctx: NavDestinationContext) => {
                if (ctx.navDestinationId) {
                    this.pageId = ctx.navDestinationId;
                    this.stack = ctx.pathStack;
                    let param = ctx.pathInfo.param as Record<string, object>;
                    this.nodeRectInfo = param.nodeRectInfo as RectInfoInPx;
                    this.prePageDoFinishTransition = param.DoDefaultTransition as () => void;
                    // [Start register_nav_param]
                    // Register the animation callback of the current page.
                    CustomTransition.getInstance().registerNavParam(this.pageId, (isPush: boolean, isExit: boolean, transitionProxy: NavigationTransitionProxy) => {
                        if (WindowUtils.isExpandedOrHalfFolded()) {
                            // Play animation, foldable screen in unfolded state
                            this.animationProperties.doAnimationFoldable(this.nodeRectInfo, isPush, isExit, transitionProxy, this.prePageDoFinishTransition);
                        }
                        else {
                            // Perform animation, non-foldable screen expanded state
                            this.animationProperties.doAnimation(this.nodeRectInfo, isPush, isExit, transitionProxy, this.prePageDoFinishTransition);
                        }
                    }, 2000);
                    // [End register_nav_param]
                }
                // [EndExclude landscape_bind_controller]
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("LandscapePlay", wrapBuilder(LandscapePlayBuilder));
    }
})();
