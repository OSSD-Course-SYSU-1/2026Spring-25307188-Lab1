import { COMMENT_LIST_DATA } from "@bundle:com.example.landscapeportraittoggle/entry/ets/model/CommentModel";
import type { Comment } from "@bundle:com.example.landscapeportraittoggle/entry/ets/model/CommentModel";
export function CommentsView(parent = null) {
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Column.create();
        Column.padding({
            left: 16,
            right: 16
        });
        Column.margin({ top: 12 });
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Text.fontSize(16);
        Text.fontColor({ "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Text.fontWeight(500);
        Text.height(48);
        Text.width('100%');
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        List.create({ space: 12 });
        List.width('100%');
        List.height('100%');
        List.scrollBar(BarState.Off);
        List.edgeEffect(EdgeEffect.None);
        List.nestedScroll({
            scrollForward: NestedScrollMode.PARENT_FIRST,
            scrollBackward: NestedScrollMode.SELF_FIRST
        });
    }, List);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        ForEach.create();
        const forEachItemGenFunction = _item => {
            const item = _item;
            CommentItem.bind(this)(item);
        };
        (parent ? parent : this).forEachUpdateFunction(elmtId, COMMENT_LIST_DATA, forEachItemGenFunction, (item: Comment) => JSON.stringify(item), false, false);
    }, ForEach);
    ForEach.pop();
    List.pop();
    Column.pop();
}
function CommentItem(itemData: Comment, parent = null) {
    const __itemData__ = itemData;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Row.create();
        Row.width('100%');
        Row.alignItems(VerticalAlign.Top);
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Image.create(itemData.avatar);
        Image.height(36);
        Image.width(36);
        Image.margin({
            top: 6
        });
    }, Image);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.padding({ left: 16 });
        Column.layoutWeight(1);
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Text.create(itemData.username);
        Text.fontSize(16);
        Text.fontColor({ "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Text.height(48);
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Text.create(itemData.content);
        Text.fontSize(14);
        Text.fontColor({ "id": 125830998, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Text.lineHeight(24);
        Text.fontWeight(500);
        Text.textAlign(TextAlign.JUSTIFY);
        Text.margin({
            bottom: 30
        });
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Row.create();
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Text.create(itemData.sendTime);
        Text.fontSize(12);
        Text.fontColor({ "id": 125830998, "type": 10001, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Blank.create();
        Blank.layoutWeight(1);
    }, Blank);
    Blank.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Image.create({ "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Image.height(18);
        Image.width(18);
    }, Image);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Image.create({ "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Image.height(18);
        Image.width(18);
        Image.margin({
            left: 26,
            right: 26
        });
    }, Image);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" });
        Image.height(18);
        Image.width(18);
    }, Image);
    Row.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, itemData = __itemData__) => {
        Divider.create();
        Divider.width('100%');
        Divider.margin({ top: 12 });
    }, Divider);
    Column.pop();
    Row.pop();
}
