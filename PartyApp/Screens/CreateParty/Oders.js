import React, { useState, useCallback } from "react";

import { ScrollView, FlatList, Dimensions, View, Text, StyleSheet } from "react-native";

import axios from "axios";

import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return (
    <ScrollView style={styles.container}>
      {orderList ? (
        <>
          {orderList.length ? (
          <>

              {orderList.map((data) => {
                return (
                    <View style={styles.orderContainer}>
                      <Text style={styles.default}>Name: {data.user.name}</Text>
                      <Text style={styles.default}>
                        Amount Paid: {data.totalPrice}
                      </Text>
                      {/* <Text style={styles.default}>Party: {data.party._id}</Text> */}
                      <Text style={styles.default}>Status: {data.status}</Text>
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
    size: 20,
  },
  titleContainer: {
    borderBottomColor: "orange",
    borderBottomWidth: 5,
    width: width / 2,
    marginLeft: width - width / 1.1,
    marginTop: 5,
  },
  title: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "44",
    fontWeight: "500",
    height: height / 7,
    paddingTop: height / 13,
  },
});

export default Orders;
