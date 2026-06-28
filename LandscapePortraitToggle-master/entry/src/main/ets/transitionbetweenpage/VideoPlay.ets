import { AVPlayerUtil } from '../utils/AVPlayerUtil';
import { common } from '@kit.AbilityKit';
import Logger from '../common/Logger';

const TAG = 'VideoPlayTag';

// [Start create_video_component]
@Component
struct VideoNode {
  @State videoRatio: number = 16 / 9;
  @State currentTime: number = 0;
  @State duration: number = 0;
  @State isSeeking: boolean = false;
  @StorageLink('seekTime') @Watch('onSeekTimeChange') seekTime: number = 0;
  @StorageLink('isSeekingGlobal') isSeekingGlobal: boolean = false;
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

  onSeekTimeChange(time: number) {
    if (time > 0 && this.player) {
      this.isSeeking = true;
      this.currentTime = time;
      this.player.seek(time);
      setTimeout(() => {
        this.isSeeking = false;
        AppStorage.setOrCreate('seekTime', 0);
      }, 100);
    }
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
          this.player.setTimeUpdateCallback((time: number) => {
            if (!this.isSeeking && !this.isSeekingGlobal) {
              this.currentTime = time;
              AppStorage.setOrCreate('currentTime', time);
            }
          });
          this.player.setDurationCallback((duration: number) => {
            this.duration = duration;
            AppStorage.setOrCreate('duration', duration);
          });
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