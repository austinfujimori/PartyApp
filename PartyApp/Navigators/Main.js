import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Fontisto";
import AuthGlobal from "../Context/store/AuthGlobal";

//Stacks
import PartiesNavigator from "./PartiesNavigator";
import TicketsNavigator from "./TicketsNavigator";
import CreatePartyNavigator from "./CreatePartyNavigator";
import UserNavigator from "./UserNavigator";


const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="Parties"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#ff7605",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#C3C3C3",
          height: 95,
        },
      }}
    >
      <Tab.Screen
        name="Parties"
        component={PartiesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="search"
              style={{ position: " relative" }}
              color={color}
              size={36}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Create Party"
        component={CreatePartyNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="add" color={color} size={50} />
          ),
        }}
      />

      <Tab.Screen
        name="Tickets"
        component={TicketsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon2 name="ticket" color={color} size={30} />
          ),
        }}
      />

      {/*
      if user is admin, then this screen pops up

      {context.stateUser.user.isAdmin == true ? 
      (<Tab.Screen/>): null}
      
      */}

      <Tab.Screen
        name="Profile"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={37} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
