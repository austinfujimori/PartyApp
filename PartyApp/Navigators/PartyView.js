import React from "react"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

//Screens
import Orders from "../Screens/CreateParty/Oders"
import Editor from "../Screens/CreateParty/Editor"

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
     return (
          <Tab.Navigator
          screenOptions={{
          tabBarActiveTintColor:"#ff7605",
          tabBarInactiveTintColor:"gray",
          tabBarStyle:{
               backgroundColor: "black"
          },
          tabBarIndicatorStyle:{
               backgroundColor: "#ff7605",
               borderWidth: 2,
               borderColor: "#ff7605"
          },
          tabBarLabelStyle: { fontSize: 15, fontWeight: "700", fontFamily:"Avenir" },
          }}
          >
               <Tab.Screen name = "Editor" options={{title: "Edit"}} component={Editor} />
               <Tab.Screen name = "Orders" options={{title: "Transactions"}} component={Orders} />
          </Tab.Navigator>
     )
}
export default function PartyView(){
     return <MyTabs />
}