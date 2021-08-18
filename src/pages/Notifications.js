import { useNavigationState } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { NotifButton } from '../components/common/CombinationComponents';
import { StyledButton, StyledText, StyledView } from '../components/common/SimpleComponents';

const Notifications = () => {
    const theme = useContext(ThemeContext)
    const routeNames = useNavigationState(({ routeNames }) => routeNames)
    const notif = useSelector(({notification}) => notification.notif)
    const [selectedRoute, setRoute] = useState(null)

    const handlePerm = (perms) => {
        Alert.alert('Permissions', JSON.stringify(perms));
    }
    const notifiActions = [
        { handlePress: () => notif.localNotif(null, selectedRoute), text: 'Local Notification (now)' },
        { handlePress: () => notif.localNotif('sample.mp3'), text: 'Local Notification with sound (now)' },
        { handlePress: () => notif.scheduleNotif(null ,selectedRoute), text: 'Schedule Notification in 30s' },
        { handlePress: () => notif.scheduleNotif('sample.mp3'), text: 'Schedule Notification with sound in 30s' },
        { handlePress: notif.cancelNotif, text: 'Cancel last notification (if any)' },
        { handlePress: notif.cancelAll, text: 'Cancel all notifications' },
        { handlePress: () => notif.checkPermission(handlePerm), text: 'Check Permission' },
        { handlePress: notif.requestPermissions, text: 'Request Permissions' },
        { handlePress: notif.abandonPermissions, text: 'Abandon Permissions' },
        { handlePress: () => notif.getScheduledLocalNotifications(notifs => console.log(notifs)), text: 'Console.Log Scheduled Local Notifications' },
        { handlePress: () => notif.getDeliveredNotifications(notifs => console.log(notifs)), text: 'Console.Log Delivered Notifications' },
        { handlePress: notif.createOrUpdateChannel, text: 'Create or update a channel' },
        { handlePress: notif.popInitialNotification, text: 'popInitialNotification' },
    ]
    return (
        <ScrollView>
            <StyledView
                flex={1}
                justifyContent='center'
                alignItems='center'
                backgroundColor='notificationPageBG'
                paddingBottom='10px'
            >
                <StyledText
                    fontWeight='bold'
                    fontSize='20px'
                    textAlign='center'
                    marginBottom='10px'
                >
                    Example app react-native-push-notification
                </StyledText>
                <StyledView backgroundColor='flashModesBG' flexDirection='row' justifyContent='space-evenly' flexWrap='wrap' paddingVertical='8px'>
                    {routeNames.map(el => <StyledButton key={el} onPress={() => setRoute(el)}
                        backgroundColor={selectedRoute === el ? 'flashModeActiveBG' : 'secondary'}
                        border={`1px solid ${theme['secondary']}`}
                        borderRadius='4px'
                        height='24px'
                        alignItems='center'
                        paddingHorizontal='8px'
                        marginBottom='8px'
                    ><StyledText>{el}</StyledText></StyledButton>)}
                </StyledView>
                {notifiActions.map(({ handlePress, text }) => <NotifButton key={text} handlePress={handlePress} text={text} />)}
            </StyledView>
        </ScrollView>
    )
}


export default Notifications;