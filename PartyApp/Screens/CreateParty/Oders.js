import React, { useState, useCallback } from "react";

import { ScrollView, FlatList, Alert, Dimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import axios from "axios";

import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { VideoExportPreset } from "expo-image-picker";

import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Octicons";

var { height, width } = Dimensions.get("window");

const Orders = (props) => {
  const [orderList, setOrderList] = useState();
  const token = props.route.params.token;
  const thisParty = props.route.params.thisParty;

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


    axios
    .get(`${baseURL}orders/partyOrders/${thisParty}`, config)
    .then((x) => {
      setOrderList(x.data);
    })
    .catch((error) => console.log(error));
  };






// confirm
  const confirmOrder = (id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    //change order status to USER CONFIRMED
    axios
      .put(`${baseURL}orders/hostConfirm/${id}`, "status", config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Host Confirmed",
            text2: "Order has been authorized",
          });
          setTimeout(() => {
            props.navigation.navigate("Create Party Container");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };






  const deleteOrder = (id, partyID, memberCount) => {


     //ALERT
     Alert.alert(
      'Are you sure you want to remove this user?',
      'They will recieve a 100% refund.',
      [
        {text: 'Cancel', onPress: () => null},
        {text: 'Delete', onPress: () => {
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
          
      
        },
        style: 'destructive'},
      ],
      {cancelable: true},
    );

  };
  
  return (
    <ScrollView style={styles.container}>
                
      {orderList ? (
        <>
          {orderList.length ? (
            <>

            <View style={styles.pendingContainer}>
            <Text style={styles.title}>
              Pending
            </Text>

            <View style={styles.memberContainer}>
              <View style={styles.memberContainerContent}>
            {orderList.map((data) => {
                if(data.status == "user confirmed")
                return (
                    <View style={styles.orderContainer}>

                      <View style={styles.orderTextContainer}>

                      <Text style={styles.name}>{data.user.name}</Text>

                      <Text style={styles.readyText}>
                        Paid ${data.party.price}
                      </Text>
                      </View>



                      <View style={{marginRight: 15, alignSelf: "center", flexDirection: "row", justifyContent: "flex-start"}}>
                      <TouchableOpacity style={[styles.confirmButton, { marginBottom: 5}]}
                      
                      onPress={() => 
                      
                        confirmOrder(data._id)
                        }
                      >

                        
                          <Icon2 
                          size={30}
                          color="#ff7575"
                          name="check-circle"/>
                          
                      </TouchableOpacity>

                      <TouchableOpacity 
                      
                      onPress={() => deleteOrder(data._id, data.party._id, data.party.memberCount)}
                      
                      style={styles.removeButton}>
                                                  <Icon 
                          size={40}
                          color="gray"
                          name="trash"/>
                      </TouchableOpacity>
                      </View>




                    </View>
                );
              })}
              </View>
          </View>
          </View>

          <View style={styles.pendingContainer}>

            <Text style={styles.title}>
              Waiting
            </Text>

            <View style={styles.memberContainer}>
              <View style={styles.memberContainerContent}>
              {orderList.map((data) => {
                if(data.status == "Pending")
                return (
                    <View style={styles.orderContainer}>
                      <View style={styles.orderTextContainer}>
                      <Text style={styles.name}>{data.user.name}</Text>
                      </View>
                      



                      <TouchableOpacity 
                      
                      onPress={() => deleteOrder(data._id, data.party._id, data.party.memberCount)}
                      
                      style={[styles.removeButton, {marginRight: 15, alignSelf: "center", flexDirection: "row", justifyContent: "flex-start"}]}>
                          <Icon 
                          size={40}
                          color="gray"
                          name="trash"/>
                      </TouchableOpacity>


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
  );
};

const styles = StyleSheet.create({
  orderTextContainer: {
    marginLeft: 15,
  },
  readyText: {
    fontFamily: "Avenir",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
    color: "#ff7575"
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

export default Orders;
