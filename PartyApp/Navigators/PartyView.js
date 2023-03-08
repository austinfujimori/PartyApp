import React from "react"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

//Screens
import Orders from "../Screens/CreateParty/Oders"
import ConfirmedOrders from "../Screens/CreateParty/ConfirmedOrders"

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
     return (
          <Tab.Navigator
          screenOptions={{
          tabBarActiveTintColor:"#ff7605",
          tabBarInactiveTintColor:"gray",
          tabBarStyle:{
               backgroundColor: "rgba(0,0,0,0.9)"
          },
          tabBarIndicatorStyle:{
               backgroundColor: "#ff7605",
               borderWidth: 2,
               borderColor: "#ff7605"
          },
          tabBarLabelStyle: { fontSize: 15, fontWeight: "700", fontFamily:"Avenir" },
          }}
          >
               <Tab.Screen name = "Orders" options={{title: "Pending"}} component={Orders} />
               <Tab.Screen name = "Confirmed Orders" options={{title: "Confirmed"}} component={ConfirmedOrders} />
          </Tab.Navigator>
     )
}
export default function PartyView(){
     return <MyTabs />
}