import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Main";

import CreatePartyForm from "../Screens/CreateParty/CreatePartyForm";
import PartyView from "./PartyView";
import TicketCheckout from "../Screens/Tickets/Checkout/TicketCheckout";

import Confirm from "../Screens/Tickets/Checkout/Confirm"
import SingleParty from "../Screens/Parties/SingleParty";


import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: "white",
      headerColor: "#ff7605",
      headerStyle: {
        backgroundColor: "rgba(0,0,0,0.85)",
      },
      headerTitleStyle: {
        fontWeight: "500",
        fontSize: 23,
        fontFamily: "Avenir",
      },
    }}
    >
      
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
            <Stack.Screen
        name="Party Detail"
        component={SingleParty}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />

<Stack.Screen
        name="Ticket Checkout"
        component={TicketCheckout}
      />
                  <Stack.Screen
        name="Create Party Form"
        component={CreatePartyForm}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "white",
          },
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />
                        <Stack.Screen
        name="Party View"
        component={PartyView}
        options={{          headerShown: true,
          backgroundColor: "Black",
          title: "Guests",
        }}
      />
                     <Stack.Screen 
               name = "Confirm"
               component={Confirm}
               options={{
                    title: "Check In",
                    cardStyle:{
                         backgroundColor:"#fff"
                    }
               }}
               />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return <MyStack />;
}
