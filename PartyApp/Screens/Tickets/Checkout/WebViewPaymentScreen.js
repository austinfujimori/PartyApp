import React from 'react';
import WebView from 'react-native-webview';
import axios from 'axios';

function WebViewPaymentScreen(props) {
    const approvalLink = props.route.params.approvalLink;

    function onNavigationStateChange(navState) {
        const url = navState.url;

        if (url.includes('YOUR_APP_SUCCESS_URL')) {
            const paymentToken = new URLSearchParams(url.split('?')[1]).get('token');
            if (paymentToken) {
                handleCapturePayment(paymentToken);
            } else {
                console.error('No payment token found in the URL');
            }
        }
    }

    async function handleCapturePayment(token) {
        try {
            const response = await axios.post(`${baseURL}paypal/capture-payment`, { token });
            if (response.data && response.data.success) {
                // Handle success - navigate to a success screen, show a message, etc.
                props.navigation.navigate('PaymentSuccessScreen');
            } else {
                console.error('Payment capture failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error capturing payment:', error);
        }
    }

    return (
        <WebView
            source={{ uri: approvalLink }}
            onNavigationStateChange={onNavigationStateChange}
        />
    );
}

export default WebViewPaymentScreen;