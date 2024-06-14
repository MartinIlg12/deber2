import React, { useState } from 'react';
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { auth, dbRealTime } from '../../../configs/firebaseConfig';
import { push, ref, set } from 'firebase/database';

interface Props {
    showModalMessage: boolean;
    setShowModalMessage: Function;
}

interface FormMessage {
    to: string;
    subject: string;
    message: string;
    date: string;
    time: string;
    travelForm: string; 
    destination: string; 
}

export const NewMessageComponent = ({ showModalMessage, setShowModalMessage }: Props) => {
    const [formMessage, setFormMessage] = useState<FormMessage>({
        to: '',
        subject: '',
        message: '',
        date: '',
        time: '',
        travelForm: '', 
        destination: '' 
    });

    const handlerSetValues = (key: string, value: string) => {
        setFormMessage({ ...formMessage, [key]: value });
    }

    const handlerSaveMessage = async () => {
        if (!formMessage.to || !formMessage.subject || !formMessage.message || !formMessage.date || !formMessage.time || !formMessage.travelForm || !formMessage.destination) {
            return;
        }

        const dbRef = ref(dbRealTime, 'messages');
        const saveMessage = push(dbRef);

        try {
            await set(saveMessage, formMessage);
            setFormMessage({
                to: '',
                subject: '',
                message: '',
                date: '',
                time: '',
                travelForm: '', 
                destination: '' 
            });
        } catch (ex) {
            console.log(ex);
        }

        setShowModalMessage(false);
    }

    return (
        <Portal>
            <Modal visible={showModalMessage} contentContainerStyle={styles.modal2}>
                <View style={styles.header2}>
                    <Text variant='headlineMedium'>Formulario de Viaje</Text>
                    <View style={styles.iconEnd2}>
                        <IconButton
                            icon='close-circle-outline'
                            size={30}
                            onPress={() => setShowModalMessage(false)} />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Para'
                    mode='outlined'
                    value={formMessage.to}
                    onChangeText={(value) => handlerSetValues('to', value)} />
                <TextInput
                    label='Asunto'
                    mode='outlined'
                    value={formMessage.subject}
                    onChangeText={(value) => handlerSetValues('subject', value)} />
                <TextInput
                    label='Mensaje'
                    mode='outlined'
                    multiline={true}
                    numberOfLines={7}
                    value={formMessage.message}
                    onChangeText={(value) => handlerSetValues('message', value)} />
                <TextInput
                    label='Fecha'
                    mode='outlined'
                    value={formMessage.date}
                    onChangeText={(value) => handlerSetValues('date', value)} />
                <TextInput
                    label='Hora'
                    mode='outlined'
                    value={formMessage.time}
                    onChangeText={(value) => handlerSetValues('time', value)} />
                <TextInput
                    label='Forma de Viaje' 
                    mode='outlined'
                    value={formMessage.travelForm}
                    onChangeText={(value) => handlerSetValues('travelForm', value)} />
                <TextInput
                    label='Destino' 
                    mode='outlined'
                    value={formMessage.destination}
                    onChangeText={(value) => handlerSetValues('destination', value)} />
                <Button style={{backgroundColor:'grey'}} mode='contained' onPress={handlerSaveMessage}>Enviar</Button>
            </Modal>
        </Portal>
    )
}
