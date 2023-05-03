import React, { useState, useContext, useCallback, useEffect } from "react";

import { ScrollView, FlatList, Dimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import axios from "axios";

import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from "@react-native-async-storage/async-storage";


import AuthGlobal from "../../Context/store/AuthGlobal";

import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Octicons";


var { height, width } = Dimensions.get("window");

const ConfirmedOrders = (props) => {
  const context = useContext(AuthGlobal);
     const [orderList, setOrderList] = useState();
     const [thisParty, setThisParty] = useState();
     const [token, setToken] = useState();

     useFocusEffect(
      useCallback(() => {
  
        //get user profile
        AsyncStorage.getItem("jwt")
          .then((res) => {

            setToken(res);

            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => {
                //get myParty from database
                axios
                  .get(`${baseURL}parties/party/${user.data._id}`, {
                    headers: { Authorization: `Bearer ${res}` },
                  })
                  .then((x) => {
                    setThisParty(x.data[0]);

                    const config = {
                      headers: {
                        Authorization: `Bearer ${res}`,
                      },
                    };

                    axios
                    .get(`${baseURL}orders/partyOrders/${x.data[0]._id}`, config)
                    .then((y) => {
                      setOrderList(y.data);
                    })
                    .catch((error) => console.log(error));
  
                  });
              });
          })
          .catch((error) => console.log(error));
        return () => {
          setThisParty();
          setOrderList()
        };
      }, [])
    );
     
     return (
<ScrollView style={styles.container}>
                
                {orderList ? (
                  <>
                    {orderList.length ? (
                      <>
          
                      <View style={styles.pendingContainer}>
                      <Text style={styles.title}>
                        Completed
                      </Text>
          
                      <View style={styles.memberContainer}>
                        <View style={styles.memberContainerContent}>
                      {orderList.map((data) => {
                          if(data.status == "host confirmed")
                          return (
                              <View style={styles.orderContainer}>
          
                                <View style={styles.orderTextContainer}>
          
                                <Text style={styles.name}>{data.user.name}</Text>

                                </View>
          
          
          
                                <View style={{marginRight: 15, alignSelf: "center", justifyContent: "center"}}>

          
                                  <Text style={styles.readyText}>
                                  Received ${data.party.price}
                                </Text>
                                </View>
          
                              </View>
                          );
                        })}
                        </View>
                    </View>
                    </View>
          
                      </>
                    ) : (
          
                        <Text style={styles.default}>
                          Your party currently has no guests.
                        </Text>
                    )}
                  </>
                ) : null}
              </ScrollView>
     )
     }

     const styles = StyleSheet.create({
      orderTextContainer: {
        marginLeft: 15,
      },
      readyText: {
        fontFamily: "Avenir",
        fontWeight: "700",
        fontSize: 18,
        marginTop: 10,
        color: "#ff7575",
        alignSelf: "center"
      },
      pendingContainer: {
        marginTop: 50
      },
      memberContainerContent: {
      },
      memberContainer: {
        backgroundColor: "rgb(240,240,240)",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      container: {
        paddingHorizontal: 20,
        backgroundColor: "white",
      },
      orderContainer: {
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderColor: "rgb(200,200,200)",
        flexDirection: "row",
        justifyContent: "space-between"
      },
      name: {
        fontFamily: "Avenir",
        color: "black",
        alignSelf: "center",
        justifyContent: "center",
        fontSize: 25,
      },
      confirmButton: {
        borderRadius: 10,
        borderColor: "#ff7575",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        },
        confirmText: {
          fontFamily: "Avenir",
          color: "#ff7575",
          fontSize: 17,
          fontWeight: "700"
        },
        removeButton: {
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          borderRadius: 10,
          },
          removeText: {
            fontFamily: "Avenir",
            color: "gray",
            fontSize: 17,
            fontWeight: "700"
          },
      title: {
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 25,
        fontWeight: "500",
        paddingBottom: 10,
      },
    
    });

export default ConfirmedOrders;
