import UIAbility from "@ohos:app.ability.UIAbility";
import type window from "@ohos:window";
import { WindowUtils } from "@bundle:com.example.landscapeportraittoggle/entry/ets/utils/WindowUtils";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'EntryAbilityLogTag';
export default class EntryAbility extends UIAbility {
    onCreate(): void {
        Logger.info(TAG, 'Ability onCreate');
    }
    onDestroy(): void {
        Logger.info(TAG, 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // Main window is created, set main page for this ability
        Logger.info(TAG, 'Ability onWindowStageCreate');
        AppStorage.setOrCreate('context', this.context);
        windowStage.loadContent('pages/Index', (err) => {
            if (err.code) {
                Logger.info(TAG, `Failed to load the content. Cause: ${JSON.stringify(err)}`);
                return;
            }
            WindowUtils.initWindow(windowStage);
            Logger.info(TAG, 'Succeeded in loading the content.');
        });
    }
    onWindowStageDestroy(): void {
        // Main window is destroyed, release UI related resources
        Logger.info(TAG, 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        // Ability has brought to foreground
        Logger.info(TAG, 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        Logger.info(TAG, 'Ability onBackground');
    }
}
