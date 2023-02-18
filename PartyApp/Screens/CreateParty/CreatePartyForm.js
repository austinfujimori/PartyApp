import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  RefreshControl,
  ProgressViewIOSComponent,
} from "react-native";

import Input from "../../Shared/Form/Input";

import Icon from "react-native-vector-icons/AntDesign";

import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

import baseURL from "../../assets/common/baseUrl";

import axios from "axios";

import * as ImagePicker from "expo-image-picker";

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
  const [mainImage, setMainImage] = useState();

  // useEffect(() => {

  // axios
  // .get(`${baseURL}categories`)
  // .then((res) => setCategories(res.data))
  // .catch((error) => alert("Error to load categories"))

  //   return () => {
  //     setCategories([])
  //   }

  // }, [])

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res)
      })
      .catch((error) => console.log(error))

    //Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Please enable camera roll perrmissions in the settings.");
        }
      }
    })();

    return () => {};
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const addParty = () => {
    if (
      address == "" ||
      description == "" ||
      price == "" ||
      capacity == "" ||
      dateOf == ""
    ) {
      setError("Pllease fill in all of the fields");
    }

    let formData = new FormData();

    formData.append("address", address);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("dateOf", dateOf);


    formData.append("rating", rating)
    formData.append("isFeatured", isFeatured)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }

    axios
      .post(`${baseURL}parties`, formData, config)
      .then((res) => {
        if(res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Party created",
            text2: ""
          })
          setTimeout(() => {
            props.navigation.navigate("Create Party Container")
          }, 500)
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again"
        })
      })
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Create Party Container")}
      >
        <Icon style={styles.backButton} name="close" color="black" size={30} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Icon color="white" size={30} name="camera" />
          </TouchableOpacity>
        </View>

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
          onPress={() => addParty()}
        >
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>

        {err ? <Error message={err} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 3,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 100,
    borderColor: "#C5C5C5",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default CreatePartyForm;
