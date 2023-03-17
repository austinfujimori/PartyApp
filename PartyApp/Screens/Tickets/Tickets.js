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
              {ticketList.map((data) => {

                return (
                  <View style={styles.ticketContainer}>
                    <Image
                      key={Math.random()}
                      source={{ uri: data.party.image }}
                      style={styles.listItem}
                    />

                    <View style={styles.buttons}>
                      <View style={styles.textContainer}>
                        <View>
                          <Text style={styles.hostName}>
                            {data.party.host.name}'s Party
                          </Text>
                          <Text style={styles.dateOfText}>
                          {Moment(data.party.dateOf).format('ddd, MMMM Do')}
                            
                          </Text>
                          <Text style={styles.priceText}>
                            ${data.party.price}
                          </Text>
                        </View>
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
                            { borderColor: "#0093FD", marginBottom: 10 },
                          ]}
                        >
                          <Text style={styles.confirmText}>Check In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteOrder(data._id, data.party._id, data.party.memberCount)}
                          style={[
                            styles.buttonContainer,
                            { borderColor: "red" },
                          ]}
                        >
                          <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
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
  ticketContainer: {},
  noPartyText: {
    alignSelf: "center",
    marginTop: height / 9,
  },
  listItem: {
    alignSelf: "center",
    borderRadius: 15,
    width: width / 1.1,
    height: width / 1.3,
    marginTop: 15,
    backgroundColor: "white",
    borderColor: "#C5C5C5",
    justifyContent: "center",
  },
  titleContainer: {
    borderBottomColor: "orange",
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
  listContainer: {},
  hostName: {
    fontFamily: "Avenir",
    fontSize: 30,
    marginBottom: 8,
  },
  textContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateOfText: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
  priceText: {
    fontFamily: "Avenir",
    fontSize: 20,
    marginTop: 10,
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
    color: "red",
    fontWeight: "500",
  },
  confirmText: {
    fontFamily: "Avenir",
    fontSize: 17,
    color: "#0093FD",
    fontWeight: "500",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
