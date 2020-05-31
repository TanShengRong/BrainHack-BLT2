import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../constants/color';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState();

    return (
        <View style={styles.screen}>
            <Text style={styles.greeting}>Hello again.</Text>

            <View style={styles.error}>
                {errorMsg && <Text>{errorMsg}</Text>}
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Email address</Text>
                    <TextInput style={styles.input} autocapitalize='none' onChangeText={email => setEmail({ email })}></TextInput>
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry autocapitalize='none' onChangeText={pw => setPassword({ pw })}></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
                <Text style={{ color: 'white', fontWeight: '700' }}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }}>
                <Text style={{ color: Colors.secondary, fontSize: 13 }}>
                    Register an account
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    greeting: {
        marginTop: 150,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    error: {
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30
    },
    form: {
        marginBottom: 40,
        marginHorizontal: 30
    },
    inputTitle: {
        color: Colors.secondary,
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: Colors.secondary,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: 'black'
    },
    button: {
        marginHorizontal: 50,
        backgroundColor: Colors.primary,
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Login;