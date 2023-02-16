import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

import Input from "../../Shared/Form/Input";

import Icon from "react-native-vector-icons/AntDesign";

import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

import baseURL from "../../assets/common/baseUrl";

import axios from "axios";

var { width, height } = Dimensions.get("window");

const CreatePartyForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [token, setToken] = useState();
  const [err, setError] = useState();

  const [rating, setRating] = useState();
  const [memberCount, setMemberCount] = useState();
  const [isFeatured, setIsFeatured] = useState(false);

  const [party, setParty] = useState(null);

  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [capacity, setCapacity] = useState();
  const [dateOf, setDateOf] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();


  useEffect(() => {
    //Categories

    // axios
    // .get(`${baseURL}categories`)
    // .then((res) => setCategories(res.data))
    // .catch((error) => alert("Error to load categories"))


    
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Create Party Container")}
      >
        <Icon style={styles.backButton} name="close" color="black" size={30} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>

        <Image source={{uri: image}}
        style={styles.image}
        />
        <TouchableOpacity>
          <Text>
            Set image
          </Text>
        </TouchableOpacity>

        <Input
          placeholder={"Address"}
          name={"Address"}
          id={"address"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Description"}
          name={"Description"}
          id={"description"}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Input
          placeholder={"Price"}
          name={"Price"}
          id={"price"}
          value={price}
          keyboardType={"numeric"}
          onChangeText={(text) => setPrice(text)}
        />
        <Input
          placeholder={"Capacity"}
          name={"Capacity"}
          id={"capacity"}
          value={capacity}
          keyboardType={"numeric"}
          onChangeText={(text) => setCapacity(text)}
        />
        
        <Input
          placeholder={"Date"}
          name={"DateOf"}
          id={"dateOf"}
          value={dateOf}
          onChangeText={(text) => setDateOf(text)}
        />








        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate("Create Party Form")}
        >
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer:{
    alignSelf: "center"
  },
  container: {
    backgroundColor: "white",
  },
  scrollContainer: {
    height: height,
  },
  backButton: {
    marginLeft: 10,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "#0093FD",
  },
  createText: {
    fontFamily: "Avenir",
    fontSize: 22,
    color: "#0093FD",
    fontWeight: "500",
  },
});

export default CreatePartyForm;
