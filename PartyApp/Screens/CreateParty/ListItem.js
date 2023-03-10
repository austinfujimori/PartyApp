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
  ImageBackground,
} from "react-native";

import Moment from 'moment';

import Icon from "react-native-vector-icons/Ionicons";


var { height, width } = Dimensions.get("window");

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  Moment.locale('de');
  return (
    <View>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" color={"white"} size={40} />
            </TouchableHighlight>


            
          </View>
        </View>
      </Modal> */}

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Party View", {screen: "Orders", params: { token: props.token, thisParty: props._id} })}
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
            <Text style={styles.dateOf}>{Moment(props.dateOf).format('ddd, MMMM Do')}</Text>
            <Text style={styles.address}>{props.address}</Text>
            <Text
              style={styles.description}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {props.description}
            </Text>
            <Text style={styles.number}>
              {props.memberCount} / {props.capacity}
            </Text>
            <Text style={styles.price}>${props.price}</Text>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.editButton, {borderColor: "#0093FD"}]}
              onPress={() => [
                props.navigation.navigate("Create Party Form", { item: props, token: props.token }),
                setModalVisible(false),
              ]}
            >
              <Text style={[styles.buttonText, {color: "#0093FD"}]}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.editButton, {borderColor: "red"}]}
              onPress={() => [props.delete(props._id), setModalVisible(false)]}
            >
              <Text style={[styles.buttonText, {color: "red"}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
     buttonText: {
      fontFamily: "Avenir",
      fontSize: 17,
      fontWeight: "500"
     },
     editButton: {
          padding: 10,
          marginRight: 5,
          marginBottom: 10,
          borderWidth: 2,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center"
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
  modalView: {
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "orange",
    height: height/1.3,
    width: width/1.2,
    shadowOpacity: 100,
    shadowRadius: 25,
    
  },
  dateOf: {
    fontFamily: "Avenir",
    fontSize: 30,
    borderBottomWidth: 1,
  },
  address: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
  description: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
  number: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
  price: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
});

export default ListItem;
