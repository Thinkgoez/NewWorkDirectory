import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NotifService from '../configuration/Notification/NotifService';
import { setNotif } from '../redux/actions/notificationAction';

export const useNotification = ({ onRegister, onNotif }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setNotif(new NotifService(onRegister, onNotif)))
    }, [])
}