import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItem from "./ListItem";

import AuthGlobal from "../../Context/store/AuthGlobal";

import { ActivityIndicator } from "react-native";

var { width, height } = Dimensions.get("window");

const CreatePartyContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  const [myParty, setMyParty] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      //get user profile
      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => {
              setUserProfile(user.data);
              //get myParty from database
              axios
                .get(`${baseURL}parties/party/${user.data._id}`, {
                  headers: { Authorization: `Bearer ${res}` },
                })
                .then((x) => {
                  setMyParty(x.data);

                  setLoading(false);
                });
            });
        })
        .catch((error) => console.log(error));
      return () => {
        setMyParty();
        setUserProfile();
        setLoading(true);
      };
    }, [])
  );

  const deleteParty = (id) => {

    //ALERT
    Alert.alert(
      'Are you sure you delete this party?',
      'Your guests will recieve a 100% refund.',
      [
        {text: 'Cancel', onPress: () => null},
        {text: 'Delete', onPress: () => {

//delete party
axios
.delete(`${baseURL}parties/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
})
.then((res) => {
  const parties = myParty.filter((item) => item._id !== id);

  setMyParty(parties);
})
.catch((error) => console.log(error));

//delete all orders associated with party
axios
.delete(`${baseURL}orders/party/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
})
.catch((error) => console.log(error));

          
      
        },
        style: 'destructive'},
      ],
      {cancelable: true},
    );

    
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Host Party</Text>
      </View>

      <View>
        {loading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#ff7575" />
          </View>
        ) : (
          <View>
              {myParty[0] ? (
                
                <ListItem
                  {...myParty[0]}
                  token={token}
                  navigation={props.navigation}
                  delete={deleteParty}
                />
              ) : (
                <View>
                  <View style={styles.container2}>
                    <Text style={styles.descriptionText}>
                      1. Party hosts are liable for everything that
                      happens in their party.
                    </Text>

                    <Text style={styles.descriptionText}>
                      2. Guests may cause damage to your house. Make sure the
                      boundaries of your party are explicit.
                    </Text>

                    <Text style={styles.descriptionText}>
                      3. You will receive 100% of the money collected from your
                      party.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.createPartyButton}
                    onPress={() =>
                      props.navigation.navigate("Create Party Form", {
                        token,
                        userProfile,
                      })
                    }
                  >
                    <Text style={styles.createPartyText}>Create a Party</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  createPartyText: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "#ff7575",
    fontSize: 23,
    fontWeight: "400"
  },
  createPartyButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "75  %",
    borderRadius: 10, 
    height: 60,
    borderWidth: 2.5,
    borderColor: "#ff7575",
    marginTop: 50
  },
  loadingIndicator: {
    marginTop: height / 3,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  container2: {
    marginHorizontal: 40,
    paddingTop: 20,
  },
  descriptionText: {
    fontFamily: "Avenir",
    fontSize: "20",
    paddingTop: 40,
  },
  titleContainer: {
    width: width / 2,
    marginLeft: width - width / 1.1,
    marginTop: 5,
    borderBottomColor: "#ff7575",
    borderBottomWidth: 5,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "44",
    color: "black",
    fontWeight: "500",
    height: height / 7,
    paddingTop: height / 13,
  }
});

export default CreatePartyContainer;

