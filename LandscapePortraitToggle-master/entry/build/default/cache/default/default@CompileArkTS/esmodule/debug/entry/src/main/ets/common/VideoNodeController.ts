import { BuilderNode } from "@ohos:arkui.node";
import { NodeController } from "@ohos:arkui.node";
import { videoBuilder } from "@bundle:com.example.landscapeportraittoggle/entry/ets/transitionbetweenpage/VideoPlay";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'VideoNodeControllerTag';
// [Start node_controller]
export class VideoNodeController extends NodeController {
    private static instance: VideoNodeController;
    private rootNode: BuilderNode<[
    ]> | null = null;
    // Use wrapBuilder to encapsulate the global @Builder
    private wrapBuilder: WrappedBuilder<[
    ]> = wrapBuilder(videoBuilder);
    private isRemove: boolean = false;
    // [StartExclude node_controller]
    private constructor() {
        Logger.info(TAG, `constructor`);
        super();
    }
    public static getInstance(): VideoNodeController {
        // If the instance does not exist, create it; if it exists, return it directly.
        if (!VideoNodeController.instance) {
            VideoNodeController.instance = new VideoNodeController();
        }
        return VideoNodeController.instance;
    }
    // [EndExclude node_controller]
    // Callback when the NodeContainer bound to the instance is created.
    makeNode(uiContext: UIContext): FrameNode | null {
        Logger.info(TAG, `makeNode`);
        // Wether to remove the node.
        if (this.isRemove) {
            return null;
        }
        if (this.rootNode === null) {
            this.rootNode = new BuilderNode(uiContext);
            // Create a component tree based on the passed wrapBuilder.
            this.rootNode.build(this.wrapBuilder);
        }
        // Returning the entity node of the component tree.
        return this.rootNode.getFrameNode();
    }
    // [StartExclude node_controller]
    // [Start remove_node]
    onRemove(): void {
        Logger.info(TAG, 'onRemove');
        this.isRemove = true;
        // Trigger rebuild when the component is moved out of the node
        this.rebuild();
        this.isRemove = false;
    }
    // [End remove_node]
    // This callback is triggered when the NodeController binds to the layout of the NodeContainer.
    aboutToResize(size: Size) {
        Logger.info(TAG, 'aboutToResize');
    }
    // This callback is triggered after the NodeContainer bound to the NodeController is mounted and displayed.
    aboutToAppear() {
        Logger.info(TAG, 'aboutToAppear');
    }
    // This callback is triggered when the NodeContainer bound to the NodeController is destroyed.
    aboutToDisappear() {
        Logger.info(TAG, 'aboutToDisappear');
    }
    // Remove the reference between the current builderNode and the backend entity
    dispose() {
        Logger.info(TAG, 'dispose');
        if (this.rootNode !== null) {
            this.rootNode.dispose();
            this.rootNode = null;
        }
    }
}
