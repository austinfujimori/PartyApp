import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  Alert
} from "react-native";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/ticketsActions";

import Icon from "react-native-vector-icons";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Moment from 'moment';

var { height, width } = Dimensions.get("window");

const Tickets = (props) => {
  const [ticketList, setTicketList] = useState();
  const [token, setToken] = useState();

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

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
              //get ticketList from database
              axios
                .get(`${baseURL}orders/userorders/${user.data._id}`, {
                  headers: { Authorization: `Bearer ${res}` },
                })
                .then((x) =>
                  setTicketList(
                    x.data
                  )
                );
            });
        })
        .catch((error) => console.log(error));

      return () => {
        setTicketList();
        setUserProfile();
      };
    }, [])
  );

  const deleteOrder = (id, partyID, memberCount) => {

    //ALERT
    Alert.alert(
      'Are you sure you want to remove this ticket?',
      'You will recieve a 100% refund.',
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

    props.navigation.navigate("PartiesMain");

          
      
        },
        style: 'destructive'},
      ],
      {cancelable: true},
    );
  };


  Moment.locale('de');


  return (
    <>
      {ticketList ? (
        <>
          {ticketList.length ? (
            <ScrollView style={styles.listContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Tickets</Text>
              </View>
              <View style={{alignItems: "center", alignSelf:"center", justifyContent: "center"}}>
              {ticketList.map((data) => {

                return (
                  <TouchableOpacity 
                  onPress={() => {
                    props.navigation.navigate("Party Detail", {item: data.party, username: data.user._id, data: data})
                  }}
                  
                  style={styles.container}>
                    <Image
                      key={Math.random()}
                      source={{ uri: data.party.image }}
                      style={styles.image}
                      resizeMode="cover"
                    />

                    <View style={styles.textContainer}>
                            <View style={styles.SideBySide}>
                              <View>
                                <Text style={styles.date}>
                                {Moment(data.party.dateOf).format('ddd, MMMM Do')}
                                  {/* {dateOf.length > 15 ? dateOf.substring(0, 15 - 3) + "..." : dateOf} */}
                                </Text>
                                <Text style={styles.membersText}>
                                  {data.party.memberCount} / {data.party.capacity} members
                                </Text>

                                <Text style={styles.distanceText}>{data.party.address}</Text>

                                <Text style={styles.hostText}>
                                  {data.party.host.name.length > 15
                                    ? data.party.host.name.substring(0, 15 - 3) + "..."
                                    : data.party.host.name}
                                </Text>
                              </View>


                              <View>
                                <TouchableOpacity
                                  onPress={() =>
                                    props.navigation.navigate("Confirm", {
                                      order: data,
                                    })
                                  }
                                  style={[
                                    styles.buttonContainer,
                                    { borderColor: "#2dc27c", marginBottom: 10 },
                                  ]}
                                >
                                  <Text style={styles.confirmText}>Check In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => deleteOrder(data._id, data.party._id, data.party.memberCount)}
                                  style={[
                                    styles.buttonContainer,
                                    { borderColor: "gray" },
                                  ]}
                                >
                                  <Text style={styles.removeText}>Remove</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                          </View>
                  </TouchableOpacity>
                );
              })}
              </View>

            </ScrollView>
          ) : (
            <ScrollView>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Tickets</Text>
              </View>

              <Text style={styles.noPartyText}>
                No parties have been added yet.
              </Text>
            </ScrollView>
          )}
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { ticketsItems } = state;

  return {
    ticketsItems: ticketsItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearTickets: () => dispatch(actions.clearTickets()),
    removeItemFromTickets: (item) => dispatch(actions.removeTicket(item)),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    marginTop: 20,
  },
  textContainer: {
    marginTop: width / 1.3 + 20,
    marginLeft: 5,
    alignSelf: "center"
  },
  image: {
    marginTop: 10,
    width: width / 1.1,
    height: width / 1.3,
    backgroundColor: "white",
    position: "absolute",
    borderRadius: 15,
    alignSelf: "center",
    borderWidth: 0,
    borderColor: "#ff7605"
  },
  date: {
    fontFamily: "Avenir",
    fontSize: 25,
  },
  payButton: {
    borderWidth: 2,
    borderColor: "#ff7605",
    width: 100,
    borderRadius: 10,
    padding: 7,
    alignSelf: "flex-end",
    marginRight: 5,
  },
  payText: {
    fontFamily: "Avenir",
    color: "#ff7605",
    fontSize: 17,
    fontWeight: "500",
    alignSelf: "center",
  },
  hostText: {
    fontFamily: "Avenir",
    fontSize: 22,
    color: "#2dc27c",
  },
  SideBySide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  distanceText: {
    fontFamily: "Avenir",
    fontSize: 20,
    color: "#656565",
  },
  membersText: {
    fontSize: 20,
    fontFamily: "Avenir",
    color: "#656565",
  },
  image: {
    marginTop: 10,
    width: width / 1.1,
    height: width / 1.3,
    backgroundColor: "white",
    position: "absolute",
    borderRadius: 15,
    alignSelf: "center",
    borderWidth: 0,
    borderColor: "#ff7605"
  },
  noPartyText: {
    alignSelf: "center",
    marginTop: height / 9,
  },
  titleContainer: {
    borderBottomColor: "#2dc27c",
    borderBottomWidth: 5,
    width: width / 2,
    marginLeft: width - width / 1.1,
    marginTop: 5,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "44",
    fontWeight: "500",
    height: height / 7,
    paddingTop: height / 13,
  },
  listContainer: {
  },
  textContainer: {
    marginTop: width / 1.3 + 20,
    marginLeft: 5,
  },
  buttons: {
    marginRight: (width - width / 1.1) / 2 + 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    borderWidth: 2,
    width: 100,
    borderRadius: 10,
    padding: 10,
  },
  removeText: {
    fontFamily: "Avenir",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
  confirmText: {
    fontFamily: "Avenir",
    fontSize: 17,
    color: "#2dc27c",
    fontWeight: "500",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
