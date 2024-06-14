import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    rootHome: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 50,
    },
    iconEnd: {
        marginLeft: 'auto',
    },
    modal: {
        backgroundColor: '#1E1E1E',
        padding: 20,
    },
    textInput: {
        backgroundColor: '#272727',
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#BB86FC',
    },
    fabMessage: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'grey',
        
    },
    rootMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#333333',
        borderRadius: 5,
        
    },
    messageText: {
        color: '#FFFFFF',
        marginRight: 10,
    },
    modal2: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        gap:15,
    },
    header2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap:15,
    },
    iconEnd2: {
        marginLeft: 'auto',
    },
    rootDetail: {
        flex: 1,
        gap:15,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    textDetail: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 10,
    },
    iconSignOut: {
        marginLeft: 'auto',
        marginTop: 10, 
    },

})