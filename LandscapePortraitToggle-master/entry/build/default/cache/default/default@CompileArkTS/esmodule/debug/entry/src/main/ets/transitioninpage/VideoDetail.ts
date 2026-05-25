if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoDetail_Params {
    navBarHeight?: number;
    navStack?: NavPathStack | null;
    isLandscape?: boolean;
    isVideoLock?: boolean;
}
import { VideoPlayView } from "@bundle:com.example.landscapeportraittoggle/entry/ets/transitioninpage/VideoPlayView";
import { BottomView } from "@bundle:com.example.landscapeportraittoggle/entry/ets/views/BottomView";
import { RelatedListView } from "@bundle:com.example.landscapeportraittoggle/entry/ets/views/RelatedListView";
import { CommentsView } from "@bundle:com.example.landscapeportraittoggle/entry/ets/views/CommentsView";
import { WindowUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/WindowUtils";
import window from "@ohos:window";
export function VideoDetailBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new VideoDetail(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/transitioninpage/VideoDetail.ets", line: 25, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "VideoDetail" });
    }
}
class VideoDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navBarHeight = this.createStorageLink('navBarHeight', 0, "navBarHeight");
        this.__navStack = new ObservedPropertyObjectPU(null, this, "navStack");
        this.addProvidedVar("navStack", this.__navStack, false);
        this.__isLandscape = this.createStorageLink('isLandscape', false, "isLandscape");
        this.__isVideoLock = this.createStorageLink('isVideoLock', false, "isVideoLock");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoDetail_Params) {
        if (params.navStack !== undefined) {
            this.navStack = params.navStack;
        }
    }
    updateStateVars(params: VideoDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navBarHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__navStack.purgeDependencyOnElmtId(rmElmtId);
        this.__isLandscape.purgeDependencyOnElmtId(rmElmtId);
        this.__isVideoLock.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navBarHeight.aboutToBeDeleted();
        this.__navStack.aboutToBeDeleted();
        this.__isLandscape.aboutToBeDeleted();
        this.__isVideoLock.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __navBarHeight: ObservedPropertyAbstractPU<number>;
    get navBarHeight() {
        return this.__navBarHeight.get();
    }
    set navBarHeight(newValue: number) {
        this.__navBarHeight.set(newValue);
    }
    private __navStack: ObservedPropertyObjectPU<NavPathStack | null>;
    get navStack() {
        return this.__navStack.get();
    }
    set navStack(newValue: NavPathStack | null) {
        this.__navStack.set(newValue);
    }
    private __isLandscape: ObservedPropertyAbstractPU<boolean>;
    get isLandscape() {
        return this.__isLandscape.get();
    }
    set isLandscape(newValue: boolean) {
        this.__isLandscape.set(newValue);
    }
    private __isVideoLock: ObservedPropertyAbstractPU<boolean>;
    get isVideoLock() {
        return this.__isVideoLock.get();
    }
    set isVideoLock(newValue: boolean) {
        this.__isVideoLock.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.height('100%');
                    Column.width('100%');
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new VideoPlayView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/transitioninpage/VideoDetail.ets", line: 38, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "VideoPlayView" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.backgroundColor({ "id": 125831061, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                    Scroll.layoutWeight(1);
                    Scroll.scrollBar(BarState.Off);
                    Scroll.padding({ bottom: 16 });
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                RelatedListView.bind(this)();
                CommentsView.bind(this)();
                Column.pop();
                Scroll.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ bottom: this.navBarHeight });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new BottomView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/transitioninpage/VideoDetail.ets", line: 51, col: 9 });
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
                __Common__.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/transitioninpage/VideoDetail" });
            NavDestination.backgroundColor({ "id": 125831061, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            NavDestination.hideTitleBar(true);
            NavDestination.ignoreLayoutSafeArea();
            NavDestination.enableNavigationIndicator(!this.isLandscape);
            NavDestination.onAppear(() => {
                WindowUtils.setStatusbarAndContentColor('#000000', '#F1F3F5');
            });
            NavDestination.onWillDisappear(() => {
                WindowUtils.setStatusbarAndContentColor('#F1F3F5', '#000000');
            });
            NavDestination.onBackPressed(() => {
                if (this.isVideoLock) {
                    return true;
                }
                if (this.isLandscape) {
                    this.isLandscape = false;
                    if (!WindowUtils.isExpandedOrHalfFolded()) {
                        WindowUtils.setOrientation(window.Orientation.PORTRAIT);
                    }
                    return true;
                }
                else {
                    return false;
                }
            });
            NavDestination.onReady((ctx: NavDestinationContext) => {
                if (ctx.navDestinationId) {
                    this.navStack = ctx.pathStack;
                }
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
        NavigationBuilderRegister("VideoDetail", wrapBuilder(VideoDetailBuilder));
    }
})();
