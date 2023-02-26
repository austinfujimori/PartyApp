import React from "react"

import { ScrollView, View, Text, StyleSheet } from "react-native"

const Orders = (props) => {
     return(
          <ScrollView style={styles.container}>
               <Text style={{color: "white"}}>
                    Orders Screen
               </Text>
          </ScrollView>
     )
}


const styles = StyleSheet.create({
     container: {
          backgroundColor: "black"
     }
})


export default Orders