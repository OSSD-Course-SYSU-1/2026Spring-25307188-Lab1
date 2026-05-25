import { AVPlayerUtil } from '../utils/AVPlayerUtil';
import { common } from '@kit.AbilityKit';
import Logger from '../common/Logger';

const TAG = 'VideoPlayTag';

// [Start create_video_component]
@Component
struct VideoNode {
  @State videoRatio: number = 16 / 9;
  // Create XComponentController object.
  private xComponentController: XComponentController = new XComponentController();
  private player?: AVPlayerUtil;
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
  // [StartExclude create_video_component]
  aboutToAppear(): void {
    Logger.info(TAG, 'VideoNode aboutToAppear');
  }

  aboutToDisappear(): void {
    Logger.info(TAG, 'VideoNode aboutToDisappear');
    this.player?.release();
  }
  // [EndExclude create_video_component]
  build() {
    XComponent({ id: 'video_player_id1', type: XComponentType.SURFACE, controller: this.xComponentController })
      .aspectRatio(this.videoRatio)
      .onLoad(() => {
        try {
          this.player = new AVPlayerUtil(this.context);
          // Bind XComponent to AVPlayer using ID.
          this.player.setSurfaceId(this.xComponentController.getXComponentSurfaceId());
          // Creating an AVPlayer to play video.
          this.player.initPlayer('videoTest.mp4', (ratio: number) => {
            // Set the video width/height ratio to the global state
            AppStorage.setOrCreate('videoRatio', ratio);
          })
        } catch (err) {
          let error = err as BusinessError;
          Logger.error(TAG, `initPlayer err, error code: ${error.code}, error message: ${error.message}`);
        }
      })
  }
}
// Build a global video playback component.
@Builder
export function videoBuilder() {
  VideoNode()
    .id('myVideoComponent')
}
// [End create_video_component]