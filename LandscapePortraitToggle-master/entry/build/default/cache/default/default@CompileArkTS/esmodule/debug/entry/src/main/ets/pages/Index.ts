if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    statusBarHeight?: number;
    navBarHeight?: number;
    pageStack?: NavPathStack;
}
import { CustomTransition } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/CustomTransition";
import type { AnimateCallback } from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/CustomTransition";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
import { WindowUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/WindowUtils";
// Page name that allows custom transitions
let allowedCustomTransitionFromPageName: string[] = ['DetailPlay'];
let allowedCustomTransitionToPageName: string[] = ['LandscapePlay'];
// Both clicking and returning require custom transitions, so each needs to be handled separately.
function isCustomTransitionEnable(from: string, to: string): boolean {
    return (allowedCustomTransitionFromPageName.includes(from) && allowedCustomTransitionToPageName.includes(to)) ||
        (allowedCustomTransitionFromPageName.includes(to) && allowedCustomTransitionToPageName.includes(from));
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__statusBarHeight = this.createStorageLink('statusBarHeight', 0, "statusBarHeight");
        this.__navBarHeight = this.createStorageLink('navBarHeight', 0, "navBarHeight");
        this.pageStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__statusBarHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__navBarHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__statusBarHeight.aboutToBeDeleted();
        this.__navBarHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
    private pageStack: NavPathStack;
    customTransition(from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation): NavigationAnimatedTransition | undefined {
        // [Start check_transition1]
        // If the parameters related to jumping are not defined, no custom animation will be performed.
        if (!from || !to || !from.name || !to.name || !from.navDestinationId || !to.navDestinationId) {
            return undefined;
        }
        // If it is the homepage, no custom animation will be performed.
        if (from.index === -1 || to.index === -1) {
            return undefined;
        }
        // Control custom transition routes using the names of from and to.
        if (!isCustomTransitionEnable(from.name, to.name)) {
            return undefined;
        }
        // [End check_transition1]
        // [Start check_transition2]
        // It is necessary to check whether the transition page has registered an animation
        // in order to decide whether to perform a custom transition.
        let fromParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(from.navDestinationId);
        let toParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(to.navDestinationId);
        if (!fromParam.animation || !toParam.animation) {
            return undefined;
        }
        // [End check_transition2]
        // [Start create_transition_animation]
        // After all judgments are made, construct customAnimation for the system to call
        // and execute the custom transition animation.
        let customAnimation: NavigationAnimatedTransition = {
            // Transition Completed Callback
            onTransitionEnd: (isSuccess: boolean) => {
                Logger.info(`onTransitionEnd success: ${isSuccess}`);
            },
            // Animation timeout end time
            timeout: 1000,
            // Custom transition animation execution callback.
            // transitionProxy: Custom transition animation delegate object
            transition: (transitionProxy: NavigationTransitionProxy) => {
                Logger.info('customAnimation transition');
                // Run the current page animation
                if (fromParam.animation) {
                    fromParam.animation(operation === NavigationOperation.PUSH, true, transitionProxy);
                }
                // Execute jump-to-target page animation
                if (toParam.animation) {
                    toParam.animation(operation === NavigationOperation.PUSH, false, transitionProxy);
                }
            }
        };
        return customAnimation;
    }
    // [End create_transition_animation]
    // [Start off_window_size_change]
    aboutToAppear(): void {
        // Remove window size listener
        WindowUtils.windowClass.off('windowSizeChange');
    }
    // [End off_window_size_change]
    // [Start bind_transition_animation]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.height('100%');
            Navigation.width('100%');
            Navigation.mode(NavigationMode.Stack);
            Navigation.backgroundColor({ "id": 125831062, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Navigation.title({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Navigation.customNavContentTransition(this.customTransition);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude bind_transition_animation]
            Column.create({ space: 12 });
            // [StartExclude bind_transition_animation]
            Column.justifyContent(FlexAlign.End);
            // [StartExclude bind_transition_animation]
            Column.height('100%');
            // [StartExclude bind_transition_animation]
            Column.width('100%');
            // [StartExclude bind_transition_animation]
            Column.padding({
                left: 16,
                right: 16,
                bottom: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }, { buttonStyle: ButtonStyleMode.NORMAL });
            Button.width('100%');
            Button.height(40);
            Button.onClick(() => {
                this.pageStack.pushPath({ name: 'VideoDetail' });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }, { buttonStyle: ButtonStyleMode.NORMAL });
            Button.width('100%');
            Button.height(40);
            Button.onClick(() => {
                this.pageStack.pushPath({ name: 'DetailPlay' });
            });
        }, Button);
        Button.pop();
        // [StartExclude bind_transition_animation]
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.landscapeportraittoggle", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
