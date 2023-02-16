import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome"

import { useFocusEffect } from "@react-navigation/native"

import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"

import ListItem from "./ListItem"

import { ActivityIndicator } from "react-native";

var { width, height } = Dimensions.get("window");

const CreatePartyContainer = (props) => {
  const [partyList, setPartyList] = useState()
  const [partyFilter, setPartyFilter] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()

  useFocusEffect(
       useCallback(
            () => {
                 // Get Token
                 AsyncStorage.getItem("jwt")
                 .then((res) => {
                      setToken(res)
                 })
                 .catch((error) => console.log(error))

                 axios
                 .get(`${baseURL}parties`)
                 .then((res) => {
                      setPartyList(res.data)
                      setPartyFilter(res.data)
                      setLoading(false)
                 })

                 return () => {
                      setPartyList()
                      setPartyFilter()
                      setLoading(true)
                 }
            },
            []
       )
  )

  const deleteParty = (id) => {
    axios
      .delete(`${baseURL}parties/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
        
      })
      .then((res) => {
        const parties = partyFilter.filter((item) => item.id !== id)

        setPartyFilter(parties)
      }
      )
      .catch((error) => console.log(error))
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Host Party</Text>
      </View>

      <View style={styles.container2}>
        <Text style={styles.descriptionText}>
          1. Party hosts are completely liable for everything that happens in
          their party.
        </Text>

        <Text style={styles.descriptionText}>
          2. Guests may cause damage to your house. Make sure the
          boundaries of your party are explicit.
        </Text>

        <Text style={styles.descriptionText}>
          3. You will receive 100% of the money collected from your party.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate("Create Party Form")}
      >
        <Text style={styles.buttonText}>Create a Party</Text>
      </TouchableOpacity>

      <View>
               {loading ? (
                    <View>
                         <ActivityIndicator size="large" color="orange" />
                    </View>
               ): (
                    <FlatList 
                    data={partyFilter}
                    renderItem={({item, index}) => (
                         <ListItem
                         {...item}
                         navigation={props.navigation}
                         index={index}
                         delete={deleteParty}
                         />
               )}
                    keyExtractor={(item) => item._id}
                    />
               )}
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
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
    borderBottomColor: "orange",
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
  },
  buttonContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    borderWidth: 2,
    paddingHorizontal: "20%",
    borderRadius: 10,
    borderColor: "#ff7605",
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 20,
    color: "#ff7605",
    padding: 10,
  },
});

export default CreatePartyContainer;
