import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
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

import mime from "mime";

var { width, height } = Dimensions.get("window");

const CreatePartyForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  // const [token, setToken] = useState();
  const token = props.route.params.token;
  const userProfile = props.route.params.userProfile;
  const [err, setError] = useState();

  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);

  const [item, setItem] = useState(null);

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
    if (!props.route.params.item) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setPrice(props.route.params.item.price.toString());
      setAddress(props.route.params.item.address);
      setDescription(props.route.params.item.description);
      setCapacity(props.route.params.item.capacity.toString());
      setDateOf(props.route.params.item.dateOf);
      setMainImage(props.route.params.item.mainImage);
      setImage(props.route.params.item.image);
    }

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
      image == "" ||
      address == "" ||
      description == "" ||
      price == "" ||
      capacity == "" ||
      dateOf == ""
    ) {
      setError("Please fill in all of the fields");
    }

    let formData = new FormData();

    const newImageUri = image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    if (!props.route.params.item) {
      formData.append("host", userProfile._id);
    }

    formData.append("address", address);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("dateOf", dateOf);

    // formData.append("rating", rating);
    // formData.append("isFeatured", isFeatured);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      // UPDATE PARTY
      axios
        .put(`${baseURL}parties/${item._id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Party updated",
              text2: "",
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
    } else {
      // ADD NEW PARTY
      axios
        .post(`${baseURL}parties`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Party created",
              text2: "",
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
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View>
          <ImageBackground
            source={{
              uri: image
                ? image
                : "https://cdn-icons-png.flaticon.com/512/2956/2956596.png",
            }}
            style={styles.image}
            imageStyle={image ? styles.image : styles.iconImage}
          >
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={() =>
                props.navigation.navigate("Create Party Container")
              }
            >
              <Icon
                style={styles.backButton}
                name="leftcircle"
                color="rgb(240,240,240)"
                size={40}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Text style={styles.imagePickerText}>Select Image</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <Input
          placeholder={"Address"}
          name={"Address"}
          id={"address"}
          value={address}
          onChangeText={(text) => setAddress(text)}
          backgroundColor={"rgb(240,240,240)"}
          inputColor={"black"}
          placeholderTextColor={"gray"}
          borderColor={"white"}
        />

        <Input
          placeholder={"Description"}
          name={"Description"}
          id={"description"}
          value={description}
          onChangeText={(text) => setDescription(text)}
          backgroundColor={"rgb(240,240,240)"}
          inputColor={"black"}
          placeholderTextColor={"gray"}
          borderColor={"white"}
        />
        <Input
          placeholder={"Price"}
          name={"Price"}
          id={"price"}
          value={price}
          keyboardType={"numeric"}
          onChangeText={(text) => setPrice(text)}
          backgroundColor={"rgb(240,240,240)"}
          inputColor={"black"}
          placeholderTextColor={"gray"}
          borderColor={"white"}
        />
        <Input
          placeholder={"Capacity"}
          name={"Capacity"}
          id={"capacity"}
          value={capacity}
          keyboardType={"numeric"}
          onChangeText={(text) => setCapacity(text)}
          backgroundColor={"rgb(240,240,240)"}
          inputColor={"black"}
          placeholderTextColor={"gray"}
          borderColor={"white"}
        />

        <Input
          placeholder={"Date"}
          name={"DateOf"}
          id={"dateOf"}
          value={dateOf}
          onChangeText={(text) => setDateOf(text)}
          backgroundColor={"rgb(240,240,240)"}
          inputColor={"black"}
          placeholderTextColor={"gray"}
          borderColor={"white"}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => addParty()}
        >
          <Text style={styles.createText}>Confirm</Text>
        </TouchableOpacity>

        {err ? <Error message={err} /> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    marginTop: 30,
    marginLeft: 10,
  },
  container: {
    // backgroundColor: "rgb(159,162,170)",
    backgroundColor: "white",
  },
  scrollContainer: {},
  backButton: {
    marginLeft: 3,
    marginTop: 15,
  },
  iconImage: {
    width: width,
    height: width,
  },

  buttonContainer: {
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 33,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "orange",
    marginTop: 20,
    marginBottom: 30,
  },
  createText: {
    color: "orange",
    fontFamily: "Avenir",
    fontSize: 18,
    fontWeight: "600",
  },

  image: {
    width: width,
    height: width,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  imagePicker: {
    backgroundColor: "rgba(0,0,0, 0.6)",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerText: {
    fontFamily: "Avenir",
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
});

export default CreatePartyForm;
