import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform
} from 'react-native';

const ReactNativeUAIOS = NativeModules.ReactNativeUAIOS;
const ReactNativeUAAndroid = NativeModules.ReactNativeUAAndroid;

let bridge = null;
let notification_listeners = [];

let call_notification_listeners = function (notification) {
    var i = notification_listeners.length - 1;

    for (i; i >= 0; i--) {
        notification_listeners[i]({
            'platform': notification.platform,
            'event': notification.event,
            'alert': notification.alert,
            'data': notification.data,
            'url': notification.url
        });
    }
}

switch (Platform.OS) {
    case 'ios':
        bridge = ReactNativeUAIOS;

        NativeAppEventEmitter.addListener('receivedNotification', (notification) => {
            var action_url = notification.data['^u'] || false;

            call_notification_listeners({
                'platform': 'ios',
                'event': notification.event,
                'alert': notification.data.aps.alert,
                'data': notification.data,
                'url': action_url
            });
        });

        break;

    case 'android':
        bridge = ReactNativeUAAndroid;

        DeviceEventEmitter.addListener('receivedNotification', (notification) => {
            var actions_json = notification['com.urbanairship.actions'] || false;
            var actions = actions_json ? JSON.parse(actions_json) : false;
            var action_url = actions ? actions['^u'] || false : false;

            call_notification_listeners({
                'platform': 'android',
                'event': notification.event,
                'alert': notification['com.urbanairship.push.ALERT'],
                'data': notification,
                'url': action_url
            });
        });

        break;
}


class ReactNativeUA {

    static enableNotification () {
        bridge.enableNotification();
    }

    static disableNotification () {
        bridge.disableNotification();
    }

    static enableGeolocation () {
        bridge.enableGeolocation();
    }

    static enableActionUrl () {
        bridge.enableActionUrl();
    }

    static disableActionUrl () {
        bridge.disableActionUrl();
    }

    static handleBackgroundNotification () {
        bridge.handleBackgroundNotification();
    }

    static addTag (tag) {
        bridge.addTag(tag);
    }

    static removeTag (tag) {
        bridge.removeTag(tag);
    }

    static setNamedUserId (nameUserId) {
        bridge.setNamedUserId(nameUserId);
    }

    static removeNamedUserId () {
        bridge.setNamedUserId();
    }

    static onNotification (callback) {
        notification_listeners.push(callback);
    }

}

export default ReactNativeUA
