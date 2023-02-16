import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.container}>
          <Text
          style={styles.nameText}
          >{userProfile ? userProfile.name : ""}</Text>

          <Text
          style={styles.emailText}
          >{userProfile ? userProfile.email : ""}</Text>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => {
              AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch);
            }}
          >
            <Text
            style={styles.signOutText}
            >Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
  },
  nameText: {
    marginLeft: 10,
    fontFamily: "Avenir",
    fontSize: 25,
    paddingTop: 20
  },
  emailText: {
    marginLeft: 10,
    paddingTop: 20,
    fontFamily: "Avenir",
    fontSize: 20,
  },
  signOutText: {
    alignSelf: "center",
    fontFamily: "Avenir",
    fontSize: 20
  },
  signOutButton: {
    marginTop: 100,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
});

export default UserProfile;
