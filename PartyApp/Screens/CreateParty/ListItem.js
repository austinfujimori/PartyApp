import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Modal,
  ScrollView,
  ImageBackground,
} from "react-native";

import Moment from 'moment';

import Icon from "react-native-vector-icons/Ionicons";


var { height, width } = Dimensions.get("window");

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  Moment.locale('de');
  return (


      <View >
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Party View", 
          
        {screen: "Orders", params: { token: props.token, thisParty: props._id}}
      )}
        style={styles.container}
      >
        <Image
          source={{
            uri: props.image ? props.image : null,
          }}
          resizeMode="cover"
          style={styles.image}
        />

        <View style={styles.insideText}>
          <View>
            <Text style={styles.dateText}>{Moment(props.dateOf).format('ddd, MMMM Do')}</Text>
            <Text style={styles.addressText}>{props.address}</Text>
            <Text
              style={styles.descriptionText}
            >
              {props.description}
            </Text>

            <View style={styles.hostContainer}>

              <View>
              <Text
                style={styles.hostNameText}
              >
                {props.host.name}
              </Text>
              <Text style={styles.ratingText}>
            5.0 • • • • •
          </Text>
          </View>


              <View style={styles.priceContainer}>
              <Text
                style={styles.priceText}
              >
                Price: ${props.price}
              </Text>
              </View>

            </View>

          </View>
          
        </View>


      </TouchableOpacity>

      <View style={styles.buttons}>
      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => [
          props.navigation.navigate("Create Party Form", { item: props, token: props.token }),
          setModalVisible(false),
        ]}
      >
        <Text style={[styles.buttonText]}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={[styles.buttonContainer, {borderColor: "gray"}]}
        onPress={() => [props.delete(props._id), setModalVisible(false)]}
      >
        <Text style={[styles.buttonText, {color: "gray"}]}>Delete</Text>
      </TouchableOpacity>
    </View>
      </View>

  );
};

const styles = StyleSheet.create({
  hostNameText: {
    fontFamily: "Avenir",
     fontSize: 25,
     justifyContent: "center",
     alignItems: "center",
     alignSelf: "center"
  },
  hostContainer: {
    borderTopWidth: 1,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "rgb(200,200,200)",
    paddingVertical: 10,
    width:  width / 1.1 - 10,
  },
  buttonContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: width/2 - 30,
    justifyContent: 'center',
    height: height/20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff7575",
  },
  priceText: {
    fontFamily: "Avenir",
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
  },
  ratingText: {
    fontFamily: "Avenir",
    fontSize: "20",
    color: "gray",
  },
  priceContainer: {
    backgroundColor: "#ff7575",
    width: 160,
    borderRadius: 7,
    padding: 15,
    alignSelf: "flex-end",
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 20,
    color: "#ff7575",
    fontWeight: "600",
    justifyContent: "center"
  },
  buttons: {
    marginTop: 20,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: width / 2 - width / 1.1 / 2 + 5,
    paddingBottom: 40
  },
  container: {
    justifyContent: "center",
    marginTop: 20,
  },
  insideText: {
    marginHorizontal: width / 2 - width / 1.1 / 2 + 5,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    alignSelf: "center",
    width: width / 1.1,
    height: width / 1.2,
    borderRadius: 22,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },


  dateText: {
    fontSize: 40,
    fontWeight: "500"
  },
  addressText: {
    paddingVertical: 10,
    fontFamily: "Avenir",
    fontSize: 30,
  },

  descriptionText: {
    fontFamily: "Avenir",
    fontSize: "20",
    color: "gray",
    paddingBottom: 30
  },


  number: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
});

export default ListItem;
