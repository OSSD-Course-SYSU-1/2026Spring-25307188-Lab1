import BackupExtensionAbility from "@ohos:application.BackupExtensionAbility";
import type { BundleVersion } from "@ohos:application.BackupExtensionAbility";
import Logger from "@bundle:com.example.landscapeportraittoggle/entry/ets/common/Logger";
const TAG = 'EntryBackupAbilityTag';
export default class EntryBackupAbility extends BackupExtensionAbility {
    async onBackup() {
        Logger.info(TAG, 'onBackup ok');
    }
    async onRestore(bundleVersion: BundleVersion) {
        Logger.info(TAG, `onRestore ok ${JSON.stringify(bundleVersion)}`);
    }
}
