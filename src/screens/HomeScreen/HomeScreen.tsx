import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import firebase, { signOut, updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { MessageCardComponent } from './components/MessageCardComponent';
import {NewMessageComponent} from './components/NewMessageComponent'
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface FormUser {
    name: string;
}


export interface Message {
    id: string;
    to: string;
    subject: string;
    message: string;
}

export const HomeScreen = () => {

    
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });

    
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

    
    const [messages, setMessages] = useState<Message[]>([]);

    
    useEffect(() => {
        
        setUserAuth(auth.currentUser);
        
        setFormUser({ name: auth.currentUser?.displayName ?? "" })
        
        getAllMessages();
    }, []);

    
    const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

    
    const [showModalMessage, setShowModalMessage] = useState<boolean>(false);

    
    const navigation = useNavigation();

    
    const handlerSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value })
    }

    
    const handlerUpdateUser = async () => {
        await updateProfile(userAuth!, {
            displayName: formUser.name
        });
        setShowModalProfile(false);
    }

    
    const getAllMessages = () => {
        
        const dbRef = ref(dbRealTime, 'messages' );
        
        onValue(dbRef, (snapshot) => {
            
            const data = snapshot.val(); 
            
            if (!data) return;
            
            const getKeys = Object.keys(data);
            
            const listMessages: Message[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key }
                listMessages.push(value);
            })
            
            setMessages(listMessages);
        })
    }


    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                    <Avatar.Text size={55} label="MI" />
                    <View>
                        <Text  variant='labelLarge'>       Bienvenido a la Agencia de Viaje</Text>
                    </View>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon="account-edit"
                            size={30}
                            mode='contained'
                            onPress={() => setShowModalProfile(true)}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <MessageCardComponent message={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineMedium'>Mi Perfil</Text>
                        <View style={styles.iconEnd}>
                            <IconButton
                                icon='close-circle-outline'
                                size={30}
                                onPress={() => setShowModalProfile(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        mode='outlined'
                        label='Nombre'
                        value={formUser.name}
                        onChangeText={(value) => handlerSetValues('name', value)} />
                    <TextInput
                        mode='outlined'
                        label='Correo'
                        value={userAuth?.email!}
                        disabled />
                    <Button style={{backgroundColor:'grey'}} mode='contained' onPress={handlerUpdateUser}>Actualizar</Button>
                    <View style={styles.iconSignOut}>
                        <IconButton
                            icon="logout"
                            size={35}
                            mode='contained'
                        />
                    </View>
                </Modal>
            </Portal>
            <FAB
                icon="plus"
                style={styles.fabMessage}
                onPress={() => setShowModalMessage(true)}
            />
            <NewMessageComponent showModalMessage={showModalMessage} setShowModalMessage={setShowModalMessage} />
        </>
    )
}