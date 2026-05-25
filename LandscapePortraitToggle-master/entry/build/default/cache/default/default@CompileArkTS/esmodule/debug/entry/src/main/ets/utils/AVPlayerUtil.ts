import type { BusinessError } from "@ohos:base";
import media from "@ohos:multimedia.media";
import type common from "@ohos:app.ability.common";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'AVPlayerUtilLogTag';
export class AVPlayerUtil {
    private surfaceId: string = '';
    private avPlayer: media.AVPlayer | undefined = undefined;
    private fileName: string = '';
    private context: common.UIAbilityContext;
    // Method to get video resource aspect ratio callback
    private callBack: Function = () => {
    };
    constructor(uiAbilityContext: common.UIAbilityContext) {
        this.context = uiAbilityContext;
    }
    setSurfaceId(surfaceId: string) {
        this.surfaceId = surfaceId;
    }
    setAVPlayerCallback(avPlayer: media.AVPlayer) {
        avPlayer.on('stateChange', async (state: string) => {
            switch (state) {
                case 'idle':
                    Logger.info('AVPlayer state idle called.');
                    avPlayer.release().catch((error: BusinessError) => {
                        Logger.error(TAG, `avPlayer release err, error code: ${error.code}, error message: ${error.message}`);
                    });
                    break;
                case 'initialized':
                    Logger.info('AVPlayer state initialized called.');
                    avPlayer.surfaceId = this.surfaceId;
                    avPlayer.prepare().catch((error: BusinessError) => {
                        Logger.error(TAG, `avPlayer initialized err, error code: ${error.code}, error message: ${error.message}`);
                    });
                    break;
                case 'prepared':
                    Logger.info(TAG, 'AVPlayer state prepared called.');
                    avPlayer.play().catch((error: BusinessError) => {
                        Logger.error(TAG, `avPlayer play err, error code: ${error.code}, error message: ${error.message}`);
                    });
                    break;
                case 'playing':
                    Logger.info(TAG, 'AVPlayer state playing called.');
                    break;
                case 'paused':
                    Logger.info(TAG, 'AVPlayer state paused called.');
                    break;
                case 'completed':
                    Logger.info(TAG, 'AVPlayer state completed called.');
                    avPlayer.play().catch((error: BusinessError) => {
                        Logger.error(TAG, `avPlayer play err, error code: ${error.code}, error message: ${error.message}`);
                    });
                    break;
                case 'stopped':
                    Logger.info(TAG, 'AVPlayer state stopped called.');
                    avPlayer.reset().catch((error: BusinessError) => {
                        Logger.error(TAG, `avPlayer reset err, error code: ${error.code}, error message: ${error.message}`);
                    });
                    break;
                case 'released':
                    Logger.info(TAG, 'AVPlayer state released called.');
                    break;
                default:
                    break;
            }
        });
        // get video height and width
        avPlayer.on('videoSizeChange', (width: number, height: number) => {
            Logger.info('videoSizeChange called,and width is:' + width + ', height is :' + height);
            this.callBack(width / height);
        });
    }
    async initPlayer(fileName: string, callBack: (ratio: number) => void = () => {
    }) {
        this.fileName = fileName;
        try {
            this.avPlayer = await media.createAVPlayer();
            this.callBack = callBack;
            this.setAVPlayerCallback(this.avPlayer);
            let fileDescriptor = await this.context.resourceManager.getRawFd(fileName);
            let avFileDescriptor: media.AVFileDescriptor = { fd: fileDescriptor.fd, offset: fileDescriptor.offset, length: fileDescriptor.length };
            this.avPlayer.fdSrc = avFileDescriptor;
            Logger.info(TAG, `fdSrc:  ${this.avPlayer.fdSrc}`);
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `initPlayer err, error code: ${error.code}, error message: ${error.message}`);
            if (this.avPlayer) {
                await this.release();
            }
        }
    }
    async release(): Promise<void> {
        try {
            if (this.avPlayer) {
                this.avPlayer.release().then(() => {
                    Logger.info(TAG, 'Succeeded in releasing');
                }).catch((error: BusinessError) => {
                    Logger.error(TAG, `release failed, error code: ${error.code}, error message: ${error.message}`);
                });
            }
            if (this.fileName !== '') {
                this.context.resourceManager.closeRawFdSync(this.fileName);
                this.fileName = '';
            }
        }
        catch (err) {
            let error = err as BusinessError;
            Logger.error(TAG, `release exception, error code: ${error.code}, error message: ${error.message}`);
        }
    }
}
