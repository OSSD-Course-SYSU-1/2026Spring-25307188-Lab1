import { RELATED_LIST_DATA } from "@bundle:com.example.landscapeportraittoggle/entry/ets/model/RelatedModel";
import type { Related } from "@bundle:com.example.landscapeportraittoggle/entry/ets/model/RelatedModel";
export function RelatedListView(parent = null) {
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Column.create();
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.height(48);
        Row.width('100%');
        Row.padding({
            left: 16,
            right: 16
        });
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Text.fontSize(16);
        Text.fontColor({ "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Text.fontWeight(500);
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Row.create({ space: 4 });
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Text.fontSize(14);
        Text.fontColor({ "id": 125830998, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Image.height(24);
        Image.width(12);
    }, Image);
    Row.pop();
    Row.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        List.create({ space: 8 });
        List.listDirection(Axis.Horizontal);
        List.scrollBar(BarState.Off);
        List.width('100%');
        List.height(100);
    }, List);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        ForEach.create();
        const forEachItemGenFunction = (_item, index: number) => {
            const item = _item;
            RelatedItem.bind(this)(item, index === 0, index === RELATED_LIST_DATA.length - 1);
        };
        (parent ? parent : this).forEachUpdateFunction(elmtId, RELATED_LIST_DATA, forEachItemGenFunction, (item: Related) => JSON.stringify(item), true, false);
    }, ForEach);
    ForEach.pop();
    List.pop();
    Column.pop();
}
function RelatedItem(itemData: Related, isFirstItem: boolean, isLastItem: boolean, parent = null) {
    {
        const itemCreation = (elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ListItem.create(deepRenderFunction, true);
            if (!isInitialRender) {
                ListItem.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        };
        const itemCreation2 = (elmtId, isInitialRender) => {
            ListItem.create(deepRenderFunction, true);
        };
        const deepRenderFunction = (elmtId, isInitialRender) => {
            itemCreation(elmtId, isInitialRender);
            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                Column.create();
                Column.width(140);
                Column.margin({
                    left: isFirstItem ? 16 : 0,
                    right: isLastItem ? 16 : 0
                });
            }, Column);
            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                Image.create(itemData.cover);
                Image.width('100%');
                Image.margin({ bottom: 8 });
            }, Image);
            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                Text.create(itemData.title);
                Text.fontSize(14);
                Text.fontWeight(500);
                Text.width('100%');
                Text.fontColor(isFirstItem ? { "id": 125830977, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" } : { "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
                Text.maxLines(1);
                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                Text.textAlign(TextAlign.Start);
            }, Text);
            Text.pop();
            Column.pop();
            ListItem.pop();
        };
        this.observeComponentCreation2(itemCreation2, ListItem);
        ListItem.pop();
    }
}
