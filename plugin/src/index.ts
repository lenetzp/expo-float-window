import { AndroidConfig, ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';

const applicationName = ".MainApplication"

const withPermisson: ConfigPlugin = config => {
  config = AndroidConfig.Permissions.withPermissions(config, [
    "android.permission.SYSTEM_ALERT_WINDOW"
  ])

  withAndroidManifest(config, async (configManifest) => {
    const application = configManifest.modResults.manifest.application?.find(
      (a) => a.$["android:name"] === applicationName
    );

    if (!application) {
      throw new Error(
        `No applicaton with name "${applicationName}" found in AndroidManifest.xml`
      );
    }

    if(!application.service) {
      application.service = []
    }

    application.service?.push({
      $: {
        "android:name": "expo.modules.floatwindow.FloatingWidgetShowService",
        "android:enabled": "true",
        "android:exported": "false"
      }
    })

    return configManifest
  })
  return config;
};

export default withPermisson;
