import PushNotification from 'react-native-push-notification';

class NotificationHandler {
    onNotification(notification) {
        console.log('NotificationHandler!', notification.title);
        console.log('Notification data:', notification.data);

        if (typeof this._onNotification === 'function') {
            this._onNotification(notification);
        }
    }

    onRegister(token) {
        console.log('NotificationHandler:', token);

        if (typeof this._onRegister === 'function') {
            this._onRegister(token);
        }
    }

    onAction(notification) {
        console.log('Notification action received:');
        console.log(notification.action);
        console.log(notification);

        if (notification.action === 'Yes') {
            PushNotification.invokeApp(notification);
        }
    }

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError(err) {
        console.log(err);
    }

    attachRegister(handler) {
        this._onRegister = handler;
    }

    attachNotification(handler) {
        this._onNotification = handler;
    }
}

const handler = new NotificationHandler();

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: handler.onRegister.bind(handler),

    // (required) Called when a remote or local notification is opened or received
    onNotification: handler.onNotification.bind(handler),

    // (optional) Called when Action is pressed (Android)
    onAction: handler.onAction.bind(handler),

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: handler.onRegistrationError.bind(handler),

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
});

export default handler;
