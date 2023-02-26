import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreatePartyContainer from "../Screens/CreateParty/CreatePartyContainer"
import CreatePartyForm from "../Screens/CreateParty/CreatePartyForm";
import PartyView from "./PartyView";

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
        name="Create Party Container"
        component={CreatePartyContainer}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "white",
          },
        }}
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
        options={{
          backgroundColor: "Black",
          title: "My Party",
        }}
      />
    </Stack.Navigator>
  );
}

export default function CreatePartyNavigator() {
  return <MyStack />;
}
