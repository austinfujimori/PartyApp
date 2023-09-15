import React from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PaymentSuccessScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Payment was successful!</Text>

            <TouchableOpacity
            onPress={() => props.navigation.navigate("Tickets")}
            >

               <Text>
                    Go to tickets
               </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
});

export default PaymentSuccessScreen;