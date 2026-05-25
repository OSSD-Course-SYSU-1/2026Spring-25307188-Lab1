import type componentUtils from "@ohos:arkui.componentUtils";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'ComponentAttrUtilsTag';
export class RectInfoInPx {
    left: number = 0;
    top: number = 0;
    right: number = 0;
    bottom: number = 0;
    width: number = 0;
    height: number = 0;
}
export class ComponentAttrUtils {
    /**
     * Get the position information of a component based on its ID
     * @param context UIContext object
     * @param id Component id
     * @returns Component information
     */
    public static getRectInfoById(context: UIContext, id: string): RectInfoInPx {
        let rstRect: RectInfoInPx = new RectInfoInPx();
        try {
            let componentInfo: componentUtils.ComponentInfo = context.getComponentUtils().getRectangleById(id);
            const widthScaleGap = componentInfo.size.width * (1 - componentInfo.scale.x) / 2;
            const heightScaleGap = componentInfo.size.height * (1 - componentInfo.scale.y) / 2;
            rstRect.left = componentInfo.translate.x + componentInfo.windowOffset.x + widthScaleGap;
            rstRect.top = componentInfo.translate.y + componentInfo.windowOffset.y + heightScaleGap;
            rstRect.right =
                componentInfo.translate.x + componentInfo.windowOffset.x + componentInfo.size.width - widthScaleGap;
            rstRect.bottom =
                componentInfo.translate.y + componentInfo.windowOffset.y + componentInfo.size.height - heightScaleGap;
            rstRect.width = rstRect.right - rstRect.left;
            rstRect.height = rstRect.bottom - rstRect.top;
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `getRectInfoById err, code: ${error.code}, message: ${error.message}`);
        }
        return rstRect;
    }
}
