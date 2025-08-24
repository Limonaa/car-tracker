import * as Notifications from 'expo-notifications';
import {SchedulableTriggerInputTypes} from "expo-notifications";

export async function ensurePermissions() {
    const settings = await Notifications.getPermissionsAsync();
    if (!settings.granted) await Notifications.requestPermissionsAsync();
};

export async function schedule(title: string, body: string, date: Date) {
    await ensurePermissions();
    return Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: { type: SchedulableTriggerInputTypes.DATE, date: date },
    });
}