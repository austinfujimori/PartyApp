import React, { useState, useCallback } from "react";

import { ScrollView, FlatList, Dimensions, View, Text, StyleSheet } from "react-native";

import axios from "axios";

import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window");

const Orders = (props) => {
  const thisParty = props.route.params.thisParty;
  const [orderList, setOrderList] = useState();
  const token = props.route.params.token;

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [])
  );
  

  const getOrders = () => {
    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    // axios
    //   .get(`${baseURL}orders`, config)
    //   .then((x) => {
    //     //filter orders to which are for this party
    //     setOrderList(x.data.filter((order) => order.party._id == thisParty));
    //   })
    //   .catch((error) => console.log(error));


    axios
    .get(`${baseURL}orders/partyOrders/${thisParty}`, config)
    .then((x) => {
      setOrderList(x.data);
    })
    .catch((error) => console.log(error));
  };

  const deleteOrder = (id, partyID, memberCount) => {
    //delete order
    axios
      .delete(`${baseURL}orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => console.log(error));


    // decrease party member count by 1
    const partyConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${baseURL}parties/decreaseMemberCount/${partyID}`,
        memberCount,
        partyConfig
      )
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Party Updatd",
          });
        }
      });

      props.navigation.navigate("Create Party Container");
  };
  
  return (
    <ScrollView style={styles.container}>
                
      {orderList ? (
        <>
          {orderList.length ? (
            <>

            <Text style={styles.title}>
              Pending
            </Text>

            {orderList.map((data) => {
                if(data.status == "user confirmed")
                return (
                    <View style={styles.orderContainer}>
                      <Text style={styles.default}>{data.user.name}</Text>
                      <TouchableOpacity style={styles.confirmButton}>
                        <Text style={styles.confirmText}>
                          
                          Confirm</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                      
                      onPress={() => deleteOrder(data._id, data.party._id, data.party.memberCount)}
                      
                      style={styles.removeButton}>
                        <Text 
                        
                      
                        style={styles.removeText}>
                          
                          Remove</Text>
                      </TouchableOpacity>




                    </View>
                );
              })}
              <Text style={styles.title}>
              Waiting
            </Text>

              {orderList.map((data) => {
                if(data.status == "Pending")
                return (
                    <View style={styles.orderContainer}>
                      <Text style={styles.default}>{data.user.name}</Text>



                      <TouchableOpacity 
                      
                      onPress={() => deleteOrder(data._id, data.party._id, data.party.memberCount)}
                      
                      style={styles.removeButton}>
                        <Text style={styles.removeText}>
                          
                          Remove</Text>
                      </TouchableOpacity>


                    </View>
                );
              })}

            
            </>
          ) : (

              <Text style={styles.default}>
                Your party currently has no guests.
              </Text>

            
          )}
        </>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  orderContainer: {
    paddingBottom: 20,
  },
  default: {
    fontFamily: "Avenir",
    color: "white",
    fontSize: 20,
  },
  confirmButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "orange",
    padding: 20,
    },
    confirmText: {
      fontFamily: "Avenir",
      color: "orange",
      fontSize: 20,
    },
    removeButton: {
      alignItems: "center",
      borderWidth: 2,
      width: 100,
      borderRadius: 10,
      padding: 10,
      },
      removeText: {
        fontFamily: "Avenir",
        color: "red",
        fontSize: 20,
      },
  title: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "35",
    fontWeight: "500",
    paddingBottom: 10,
  },

});

export default Orders;
