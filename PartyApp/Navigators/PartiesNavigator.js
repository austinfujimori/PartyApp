import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PartyContainer from "../Screens/Parties/PartyContainer";

import SingleParty from "../Screens/Parties/SingleParty";
import CheckoutNavigator from "./CheckoutNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import TicketCheckout from "../Screens/Tickets/Checkout/TicketCheckout";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerColor: "#ff7605",
        headerStyle: {
          backgroundColor: "#ff7605",
        },
        headerTitleStyle: {
          fontWeight: "500",
          fontSize: 23,
          fontFamily: "Avenir",
        },
      }}
    >
      <Stack.Screen
        name="PartiesMain"
        component={PartyContainer}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={({ route }) => ({ title: route.params.title })}
      />

<Stack.Screen
        name="Ticket Checkout"
        component={TicketCheckout}
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
    </Stack.Navigator>
  );
}

export default function PartiesNavigator() {
  return <MyStack />;
}
