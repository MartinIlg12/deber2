import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { DetailMessageScreen } from '../screens/HomeScreen/DetailMessageScreen';

const Stack = createStackNavigator();


interface Routes {
    name: string;
    screen: () => JSX.Element;
    headerShow?: boolean;
}


const routes: Routes[] = [
    { name: "Home", screen: HomeScreen },
    { name: "Detail", screen: DetailMessageScreen, headerShow: true }
];

export const StackNavigator = () => {
    
    const [isAuth, setIsAuth] = useState<boolean>(false);

    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            
            if (user) {
                
                setIsAuth(true);
            }
            setIsLoading(false);
        });

    }, []);

    return (
        <>
            {isLoading ? (
                <View style={styles.root}>
                    <ActivityIndicator size={40} />
                </View>
            ) : (
                <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
                    {
                            routes.map((item, index) => (
                                <Stack.Screen
                                    key={index}
                                    name={item.name}
                                    options={{ headerShown: item.headerShow ?? false }}
                                    component={item.screen} />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    );
}