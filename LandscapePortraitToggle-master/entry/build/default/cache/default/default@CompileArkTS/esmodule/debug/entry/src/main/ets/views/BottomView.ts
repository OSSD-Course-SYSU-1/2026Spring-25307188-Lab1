if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BottomView_Params {
    navBarHeight?: number;
}
export class BottomView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navBarHeight = this.createStorageLink('navBarHeight', 0, "navBarHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BottomView_Params) {
    }
    updateStateVars(params: BottomView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navBarHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navBarHeight.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
            Row.backgroundColor({ "id": 125831004, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Row.padding({
                left: 16,
                top: 20,
                right: 16,
                bottom: 12
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777250, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Image.height(36);
            Image.width(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.layoutWeight(1);
            Row.height(40);
            Row.backgroundColor('#F2F2F2F2');
            Row.borderRadius(20);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
            Row.borderWidth(0.5);
            Row.borderColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Row.margin({ left: 12 });
            Row.padding({
                left: 12,
                right: 12
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Image.height(16);
            Image.width(16);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
            Image.height(24);
            Image.width(24);
        }, Image);
        Row.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
