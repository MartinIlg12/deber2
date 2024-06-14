import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Message } from './HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime } from '../../configs/firebaseConfig';

interface MessageWithDateTime extends Message {
    from: string;
    date: string; 
    time: string; 
    travelForm: string; 
    destination: string; 
}

export const DetailMessageScreen = () => {
    const route = useRoute();
    //@ts-ignore
    const { message } = route.params;

    const [editFormMessage, setEditFormMessage] = useState<MessageWithDateTime>({
        id: '',
        to: '',
        from: '',  
        subject: '',
        message: '',
        date: '', 
        time: '',
        travelForm: '',  
        destination: ''  
    })

    useEffect(() => {
        setEditFormMessage({
            ...message,  
            from: message.from || '',  
            travelForm: message.travelForm || '',  
            destination: message.destination || '',  
        });
    }, [message])

    const navigation = useNavigation();

    const handlerSetValues = (key: keyof MessageWithDateTime, value: string) => {
        setEditFormMessage({ ...editFormMessage, [key]: value });
    }

    const handlerUpdateMessage = async () => {
        const { id, to, from, subject, message, date, time, travelForm, destination } = editFormMessage;
        const dbRef = ref(dbRealTime, `messages/${id}`);
        
        try {
            await update(dbRef, {
                id,
                to,
                from,
                subject,
                message,
                date,
                time,
                travelForm,
                destination
            });
            navigation.goBack();
        } catch (error) {
            console.error('Error updating message:', error);
        }
    }

    const handlerDeleteMessage = async () => {
        const dbRef = ref(dbRealTime, `messages/${editFormMessage.id}`);
        try {
            await remove(dbRef);
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }

    return (
        <View style={styles.rootDetail}>
            <View>
                <Text variant='headlineSmall'>Asunto: {editFormMessage.subject}</Text>
                <Divider />
            </View>
            <View>
                <Text variant='bodyLarge'>Para: {editFormMessage.to}</Text>
                <Divider />
            </View>
            <View>
                <Text variant='bodyLarge'>De: {editFormMessage.from}</Text>
                <Divider />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    label='Fecha'
                    mode='outlined'
                    style={{ flex: 1, marginRight: 10 }}
                    value={editFormMessage.date}
                    onChangeText={(value) => handlerSetValues('date', value)} />
                <TextInput
                    label='Hora'
                    mode='outlined'
                    style={{ flex: 1 }}
                    value={editFormMessage.time}
                    onChangeText={(value) => handlerSetValues('time', value)} />
            </View>
            <TextInput
                label='Forma de Viaje'
                mode='outlined'
                value={editFormMessage.travelForm}
                onChangeText={(value) => handlerSetValues('travelForm', value)} />
            <TextInput
                label='Destino'
                mode='outlined'
                value={editFormMessage.destination}
                onChangeText={(value) => handlerSetValues('destination', value)} />
            <View style={{ gap: 20 }}>
                <Text style={styles.textDetail}>Mensaje</Text>
                <TextInput
                    value={editFormMessage.message}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(value) => handlerSetValues('message', value)} />
            </View>
            <Button
                style={{backgroundColor:'green'}}
                mode='contained'
                icon='email-sync'
                onPress={handlerUpdateMessage}>Actualizar</Button>
            <Button
                style={{backgroundColor:'red'}}
                mode='contained'
                icon='email-remove'
                onPress={handlerDeleteMessage}>Eliminar</Button>
        </View>
    )
}
