import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Tickets from "../Screens/Tickets/Tickets"


const Stack = createStackNavigator()

function MyStack() {
     return (
          <Stack.Navigator
          screenOptions={{
               headerBackTitleVisible: false ,
               headerTintColor: "white",
               headerColor: "#ff7605",
               headerStyle: {
                    backgroundColor: "#ff7605"
               }
          }}

          >

               <Stack.Screen 
               name = "Tickets"
               component={Tickets}
               options={{
                    headerShown: false,
                    cardStyle:{
                         backgroundColor:"#fff"
                    }
               }}
               />


{/* <Stack.Screen 
               name = "Confirm"
               component={Confirm}
               options={{
                    title: "Confirm Your Ticket",
                    cardStyle:{
                         backgroundColor:"#fff"
                    }
               }}
               /> */}
          </Stack.Navigator>
     )
}

export default function TicketsNavigator() {
     return <MyStack />
}