if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DetailPlay_Params {
    videoRatio?: number;
    statusBarHeight?: number;
    navBarHeight?: number;
    nodeController?: VideoNodeController;
    defaultVideoHeight?: number;
    defaultVideoWidth?: number;
    isDetailShow?: boolean;
    navStack?: NavPathStack | null;
    pageId?: string;
}
import display from "@ohos:display";
import window from "@ohos:window";
import { ComponentAttrUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/ComponentAttrUtils";
import type { RectInfoInPx } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/ComponentAttrUtils";
import { CustomTransition } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/CustomTransition";
import { WindowUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/WindowUtils";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
import { BottomView } from "@bundle:com.example.landscapeportraittoggle/entry/ets/views/BottomView";
import { CommentsView } from "@bundle:com.example.landscapeportraittoggle/entry/ets/views/CommentsView";
import { RelatedListView } from "@bundle:com.example.landscapeportraittoggle/entry/ets/views/RelatedListView";
import { VideoNodeController } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/VideoNodeController";
const TAG = 'MyPagePortraitTag';
export function DetailPlayBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new DetailPlay(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/transitionbetweenpage/DetailPlay.ets", line: 29, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "DetailPlay" });
    }
}
export class DetailPlay extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__videoRatio = this.createStorageLink('videoRatio', 16 / 9, "videoRatio");
        this.__statusBarHeight = this.createStorageLink('statusBarHeight', 0, "statusBarHeight");
        this.__navBarHeight = this.createStorageLink('navBarHeight', 0, "navBarHeight");
        this.__nodeController = new ObservedPropertyObjectPU(VideoNodeController.getInstance(), this, "nodeController");
        this.__defaultVideoHeight = new ObservedPropertySimplePU(0, this, "defaultVideoHeight");
        this.__defaultVideoWidth = new ObservedPropertySimplePU(0, this, "defaultVideoWidth");
        this.__isDetailShow = new ObservedPropertySimplePU(false, this, "isDetailShow");
        this.navStack = null;
        this.pageId = '-1';
        this.setInitiallyProvidedValue(params);
        this.declareWatch("videoRatio", this.videoRatioChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DetailPlay_Params) {
        if (params.nodeController !== undefined) {
            this.nodeController = params.nodeController;
        }
        if (params.defaultVideoHeight !== undefined) {
            this.defaultVideoHeight = params.defaultVideoHeight;
        }
        if (params.defaultVideoWidth !== undefined) {
            this.defaultVideoWidth = params.defaultVideoWidth;
        }
        if (params.isDetailShow !== undefined) {
            this.isDetailShow = params.isDetailShow;
        }
        if (params.navStack !== undefined) {
            this.navStack = params.navStack;
        }
        if (params.pageId !== undefined) {
            this.pageId = params.pageId;
        }
    }
    updateStateVars(params: DetailPlay_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__videoRatio.purgeDependencyOnElmtId(rmElmtId);
        this.__statusBarHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__navBarHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__nodeController.purgeDependencyOnElmtId(rmElmtId);
        this.__defaultVideoHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__defaultVideoWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__isDetailShow.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__videoRatio.aboutToBeDeleted();
        this.__statusBarHeight.aboutToBeDeleted();
        this.__navBarHeight.aboutToBeDeleted();
        this.__nodeController.aboutToBeDeleted();
        this.__defaultVideoHeight.aboutToBeDeleted();
        this.__defaultVideoWidth.aboutToBeDeleted();
        this.__isDetailShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // [StartExclude portrait_bind_controller]
    private __videoRatio: ObservedPropertyAbstractPU<number>;
    get videoRatio() {
        return this.__videoRatio.get();
    }
    set videoRatio(newValue: number) {
        this.__videoRatio.set(newValue);
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
    // [EndExclude portrait_bind_controller]
    private __nodeController: ObservedPropertyObjectPU<VideoNodeController>;
    get nodeController() {
        return this.__nodeController.get();
    }
    set nodeController(newValue: VideoNodeController) {
        this.__nodeController.set(newValue);
    }
    // [StartExclude portrait_bind_controller]
    private __defaultVideoHeight: ObservedPropertySimplePU<number>;
    get defaultVideoHeight() {
        return this.__defaultVideoHeight.get();
    }
    set defaultVideoHeight(newValue: number) {
        this.__defaultVideoHeight.set(newValue);
    }
    private __defaultVideoWidth: ObservedPropertySimplePU<number>;
    get defaultVideoWidth() {
        return this.__defaultVideoWidth.get();
    }
    set defaultVideoWidth(newValue: number) {
        this.__defaultVideoWidth.set(newValue);
    }
    private __isDetailShow: ObservedPropertySimplePU<boolean>;
    get isDetailShow() {
        return this.__isDetailShow.get();
    }
    set isDetailShow(newValue: boolean) {
        this.__isDetailShow.set(newValue);
    }
    private navStack: NavPathStack | null;
    private pageId: string;
    videoRatioChange(ratio: number) {
        try {
            this.defaultVideoWidth = this.getUIContext().px2vp(display.getDefaultDisplaySync().width);
            this.defaultVideoHeight = this.getUIContext().px2vp(display.getDefaultDisplaySync().width / ratio);
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `getDefaultDisplaySync err, code: ${error.code}, message: ${error.message}`);
        }
    }
    aboutToAppear(): void {
        try {
            // [Start window_size_change]
            window.getLastWindow(this.getUIContext().getHostContext()).then((windowClass) => {
                WindowUtils.windowWidthPx = windowClass.getWindowProperties().windowRect.width;
                WindowUtils.windowHeightPx = windowClass.getWindowProperties().windowRect.height;
                this.defaultVideoWidth = this.getUIContext().px2vp(WindowUtils.windowWidthPx);
                this.defaultVideoHeight = this.getUIContext().px2vp(WindowUtils.windowWidthPx / this.videoRatio);
                windowClass.on('windowSizeChange', (data) => {
                    // [StartExclude window_size_change]
                    Logger.info(TAG, `windowWidth:${data.width}`);
                    Logger.info(TAG, `windowHeight:${data.height}`);
                    // [EndExclude window_size_change]
                    // Updating the window size during the orientation switching between landscape and portrait modes.
                    WindowUtils.windowWidthPx = data.width;
                    WindowUtils.windowHeightPx = data.height;
                    // Only dynamically change the size of the video component container
                    // when the page is displayed, such as when collapsing or expanding.
                    if (this.isDetailShow) {
                        this.defaultVideoWidth = this.getUIContext().px2vp(data.width);
                        this.defaultVideoHeight = this.getUIContext().px2vp(data.width / this.videoRatio);
                    }
                    // Foldable screen expanded state settings page video width and height
                    if (WindowUtils.isExpandedOrHalfFolded() && !this.isDetailShow) {
                        this.defaultVideoWidth = this.getUIContext().px2vp(data.width);
                        this.defaultVideoHeight = this.getUIContext().px2vp(data.width / this.videoRatio);
                        AppStorage.setOrCreate('defaultVideoHeight', this.defaultVideoHeight);
                    }
                });
                // [End window_size_change]
            });
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `getLastWindow err, code: ${error.code}, message: ${error.message}`);
        }
    }
    // [Start finish_transition]
    // This method is called when the page transition animation is completed.
    private doFinishTransition(): void {
        // [StartExclude finish_transition]
        if (AppStorage.has('defaultVideoHeight')) {
            AppStorage.delete('defaultVideoHeight');
        }
        // [EndExclude finish_transition]
        // Remove the video node from the original page.
        this.nodeController.onRemove();
    }
    // [End finish_transition]
    private registerCustomTransition(pageId: string): void {
        CustomTransition.getInstance().registerNavParam(pageId, () => {
            Logger.info(TAG, 'registerCustomTransition');
        }, 500);
    }
    pushLandscape(): void {
        let param: Record<string, object> = {};
        let nodeInfo: RectInfoInPx | null = ComponentAttrUtils.getRectInfoById(this.getUIContext(), 'myVideoComponent');
        if (!nodeInfo) {
            Logger.error(TAG, 'pushLandscape nodeInfo is null');
            return;
        }
        param.nodeRectInfo = nodeInfo;
        param.DoDefaultTransition = () => {
            this.doFinishTransition();
        };
        if (this.navStack) {
            // Jump to landscape playback page
            this.navStack.pushPath({ name: 'LandscapePlay', param: param });
        }
        if (this.nodeController !== undefined) {
            // Custom node removed from the detail page tree
            this.nodeController.onRemove();
        }
    }
    aboutToDisappear(): void {
        Logger.info(TAG, 'aboutToDisappear');
        this.nodeController.dispose();
    }
    // [EndExclude portrait_bind_controller]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.height('100%');
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    RelativeContainer.create();
                    RelativeContainer.backgroundColor(Color.Black);
                    RelativeContainer.height(this.defaultVideoHeight);
                    RelativeContainer.width(this.defaultVideoWidth);
                    RelativeContainer.id('myVideo');
                }, RelativeContainer);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Bind the NodeController to the NodeContainer
                    NodeContainer.create(this.nodeController);
                }, NodeContainer);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // [StartExclude portrait_bind_controller]
                    Button.createWithChild({ type: ButtonType.Circle });
                    // [StartExclude portrait_bind_controller]
                    Button.height(40);
                    // [StartExclude portrait_bind_controller]
                    Button.aspectRatio(1);
                    // [StartExclude portrait_bind_controller]
                    Button.backgroundColor('#19FFFFFF');
                    // [StartExclude portrait_bind_controller]
                    Button.margin({
                        left: 16,
                        top: 8
                    });
                    // [StartExclude portrait_bind_controller]
                    Button.alignRules({
                        top: { anchor: '__container__', align: VerticalAlign.Top },
                        left: { anchor: '__container__', align: HorizontalAlign.Start }
                    });
                    // [StartExclude portrait_bind_controller]
                    Button.onClick(() => {
                        this.navStack?.pop();
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    SymbolGlyph.create({ "id": 125833534, "type": 40000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                    SymbolGlyph.fontColor([{ "id": 125831057, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }]);
                    SymbolGlyph.fontSize({ "id": 125830965, "type": 10002, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                }, SymbolGlyph);
                // [StartExclude portrait_bind_controller]
                Button.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    SymbolGlyph.create({ "id": 125832700, "type": 40000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                    SymbolGlyph.fontColor([{ "id": 125831057, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }]);
                    SymbolGlyph.fontSize(24);
                    SymbolGlyph.alignRules({
                        bottom: { anchor: '__container__', align: VerticalAlign.Bottom },
                        right: { anchor: '__container__', align: HorizontalAlign.End }
                    });
                    SymbolGlyph.margin({
                        right: 16,
                        bottom: 8
                    });
                    SymbolGlyph.onClick(() => {
                        this.pushLandscape();
                    });
                }, SymbolGlyph);
                RelativeContainer.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.layoutWeight(1);
                    Scroll.scrollBar(BarState.Off);
                    Scroll.padding({ bottom: 16 });
                    Scroll.backgroundColor({ "id": 125831061, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                RelatedListView.bind(this)();
                CommentsView.bind(this)();
                Column.pop();
                Scroll.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new BottomView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/transitionbetweenpage/DetailPlay.ets", line: 199, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "BottomView" });
                }
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/transitionbetweenpage/DetailPlay" });
            NavDestination.preferredOrientation(window.Orientation.PORTRAIT);
            NavDestination.backgroundColor({ "id": 125831061, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            NavDestination.width('100%');
            NavDestination.height('100%');
            NavDestination.hideTitleBar(true);
            NavDestination.hideToolBar(true);
            NavDestination.onDisAppear(() => {
                // Delete animation parameter data.
                CustomTransition.getInstance().unRegisterNavParam(this.pageId);
            });
            NavDestination.onReady((ctx: NavDestinationContext) => {
                if (ctx.navDestinationId) {
                    this.pageId = ctx.navDestinationId;
                    this.navStack = ctx.pathStack;
                    this.registerCustomTransition(this.pageId);
                }
            });
            NavDestination.onAppear(() => {
                WindowUtils.setStatusbarAndContentColor('#000000', '#F1F3F5');
            });
            NavDestination.onHidden(() => {
                this.isDetailShow = false;
            });
            NavDestination.onShown(() => {
                this.isDetailShow = true;
            });
            NavDestination.onWillDisappear(() => {
                WindowUtils.setStatusbarAndContentColor('#F1F3F5', '#000000');
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
        NavigationBuilderRegister("DetailPlay", wrapBuilder(DetailPlayBuilder));
    }
})();
