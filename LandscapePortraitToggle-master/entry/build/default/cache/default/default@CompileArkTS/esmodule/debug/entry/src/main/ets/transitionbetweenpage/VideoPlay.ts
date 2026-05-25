if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoNode_Params {
    videoRatio?: number;
    xComponentController?: XComponentController;
    player?: AVPlayerUtil;
    context?;
}
import { AVPlayerUtil } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/AVPlayerUtil";
import type common from "@ohos:app.ability.common";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'VideoPlayTag';
class VideoNode extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__videoRatio = new ObservedPropertySimplePU(16 / 9, this, "videoRatio");
        this.xComponentController = new XComponentController();
        this.player = undefined;
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoNode_Params) {
        if (params.videoRatio !== undefined) {
            this.videoRatio = params.videoRatio;
        }
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.player !== undefined) {
            this.player = params.player;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: VideoNode_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__videoRatio.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__videoRatio.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __videoRatio: ObservedPropertySimplePU<number>;
    get videoRatio() {
        return this.__videoRatio.get();
    }
    set videoRatio(newValue: number) {
        this.__videoRatio.set(newValue);
    }
    // Create XComponentController object.
    private xComponentController: XComponentController;
    private player?: AVPlayerUtil;
    private context;
    // [StartExclude create_video_component]
    aboutToAppear(): void {
        Logger.info(TAG, 'VideoNode aboutToAppear');
    }
    aboutToDisappear(): void {
        Logger.info(TAG, 'VideoNode aboutToDisappear');
        this.player?.release();
    }
    // [EndExclude create_video_component]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            XComponent.create({ id: 'video_player_id1', type: XComponentType.SURFACE, controller: this.xComponentController }, "com.example.landscapeportraittoggle/entry");
            XComponent.aspectRatio(this.videoRatio);
            XComponent.onLoad(() => {
                try {
                    this.player = new AVPlayerUtil(this.context);
                    // Bind XComponent to AVPlayer using ID.
                    this.player.setSurfaceId(this.xComponentController.getXComponentSurfaceId());
                    // Creating an AVPlayer to play video.
                    this.player.initPlayer('videoTest.mp4', (ratio: number) => {
                        // Set the video width/height ratio to the global state
                        AppStorage.setOrCreate('videoRatio', ratio);
                    });
                }
                catch (err) {
                    let error = err as BusinessError;
                    Logger.error(TAG, `initPlayer err, error code: ${error.code}, error message: ${error.message}`);
                }
            });
        }, XComponent);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
// Build a global video playback component.
export function videoBuilder(parent = null) {
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        __Common__.create(true);
        __Common__.id('myVideoComponent');
    }, __Common__);
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new VideoNode(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/transitionbetweenpage/VideoPlay.ets", line: 48, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "VideoNode" });
    }
    __Common__.pop();
}
