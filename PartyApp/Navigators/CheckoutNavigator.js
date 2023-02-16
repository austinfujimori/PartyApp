import React from "react"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

//Screens
import TicketCheckout from "../Screens/Tickets/Checkout/TicketCheckout"
import Payment from "../Screens/Tickets/Checkout/Payment"
import Confirm from "../Screens/Tickets/Checkout/Confirm"

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
     return (
          <Tab.Navigator
          screenOptions={{
          tabBarActiveTintColor:"#ff7605",
          tabBarInactiveTintColor:"gray",
          tabBarIndicatorStyle:{
               backgroundColor: "#ff7605",
               borderWidth: 2,
               borderColor: "#ff7605"
          },
          tabBarLabelStyle: { fontSize: 15, fontWeight: "700", fontFamily:"Avenir" },
          }}
          >
               <Tab.Screen name = "Name" component={TicketCheckout} />
               <Tab.Screen name = "Payment" component={Payment} />
               <Tab.Screen name = "Confirm" component={Confirm} />
          </Tab.Navigator>
     )
}
export default function CheckoutNavigator(){
     return <MyTabs />
}