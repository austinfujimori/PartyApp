import React, {useEffect, useState} from "react"
import {Text, TouchableOpacity, StyleSheet, View} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import FormContainer from "../../../Shared/Form/FormContainer"
import Input from "../../../Shared/Form/Input"
import { KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"

import { connect } from "react-redux"


const mapStateToProps = (state) => {
     const {ticketsItems} = state
     return {
          ticketsItems: ticketsItems,
     }
}

const TicketCheckout = (props) => {

     const [orderItems, setOrderItems] = useState()
     const [name, setName] = useState()


     useEffect(() => {
          setOrderItems(props.ticketsItems)

          return () => {
               setOrderItems()
          }
     }, [])

     const checkOut = () => {
          let order = {
               name,
               dateOrdered: Date.now(),
               orderItems
          }

          props.navigation.navigate("Payment", {order: order})
     }
 
     return(
          <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          extraHeight={200}
          enableOnAndroid={true}
          >
               <FormContainer  title={"Name"}>
                    <Input
                    placeholder={"Name"}
                    name={"name"}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    />
               </FormContainer>

                    <TouchableOpacity style={styles.nextButton} onPress={() => checkOut()}>
                         <Text style={styles.nextText}>
                              Next
                         </Text>
                    </TouchableOpacity>

          </KeyboardAwareScrollView>
     )
}


const styles = StyleSheet.create({
     nextButton: {
          marginTop: 30,
          alignItems: "center",
          alignSelf: "center",
          width: "20%",
          paddingVertical: 5,
          borderWidth: 3,
          borderColor: "#ff7605",
          borderRadius: 30,
     },
     nextText:{
          fontSize: 18,
          color: "#ff7605",
          fontFamily: "Avenir",
          fontWeight: "600"
     }
})

export default connect(mapStateToProps, null)(TicketCheckout)