import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RadioForm from "react-native-radio-form";
import { connect } from "react-redux";

import Toast from "react-native-toast-message";
import * as actions from "../../../Redux/Actions/ticketsActions";

import baseURL from "../../../assets/common/baseUrl";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const methods = [
  { name: "Cash on arrival", value: 1 },
  { name: "Card Payment", value: 2 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const TicketCheckout = (props) => {
  const [token, setToken] = useState();

  const context = useContext(AuthGlobal);

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      return () => {};
    }, [])
  );

  const [orderItems, setOrderItems] = useState();
  const username = props.route.params.username;

  //PARTY OBJECT
  const _id = props.route.params._id;
  const host = props.route.params.host;
  const memberCount = props.route.params.memberCount;
  const description = props.route.params.description;
  const dateOf = props.route.params.dateOf;
  const price = props.route.params.price;
  const image = props.route.params.image;
  const capacity = props.route.params.capacity;
  const address = props.route.params.address;

  const partyObject = {
    _id: _id,
    host: host,
    memberCount: memberCount,
    description: description,
    dateOf: dateOf,
    price: price,
    image: image,
    capacity: capacity,
    address: address,
  };

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  const checkOut = () => {
    // update party member count by + 1

    const partyConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${baseURL}parties/memberCount/${partyObject._id}`,
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

    // add order to the DB table: ORDERS

    let orderDB = {
      party: partyObject._id,
      status: "Pending",
      totalPrice: partyObject.price,
      user: username,
      dateOrdered: Date.now(),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}orders`, orderDB, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Ticket Added",
          });
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

    props.navigation.navigate("Tickets");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      <RadioForm
        dataSource={methods}
        itemShowKey="name"
        itemRealKey="value"
        circleSize={20}
        initial={1}
        labelHorizontal={true}
        outerColor="#ff7605"
        innerColor="#ff7605"
        style={styles.radioStyle}
        onPress={(item) => setSelected(item.value)}
      />
      {selected == 2 ? (
        <View>
          <RadioForm
            dataSource={paymentCards}
            itemShowKey="name"
            itemRealKey="value"
            circleSize={20}
            initial={1}
            labelHorizontal={true}
            outerColor="#ff7605"
            innerColor="#ff7605"
            style={styles.radioStyle}
            onPress={(item) => setCard(item.value)}
          />
        </View>
      ) : null}

      <TouchableOpacity style={styles.confirmButton} onPress={() => checkOut()}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToTickets: (party) =>
      dispatch(actions.addTicket({ quantity: 1, party })),
  };
};

const mapStateToProps = (state) => {
  const { ticketsItems } = state;

  return {
    ticketsItems: ticketsItems,
  };
};

const styles = StyleSheet.create({
  nextButton: {
    marginTop: 30,
    alignItems: "center",
    alignSelf: "center",
    width: "20%",
    paddingVertical: 5,
    borderWidth: 3,
    borderColor: "#ff7605",
    borderRadius: 30,
  },
  nextText: {
    fontSize: 18,
    color: "#ff7605",
    fontFamily: "Avenir",
    fontWeight: "600",
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 25,
    marginTop: 30,
  },
  container: {
    marginLeft: 20,
  },
  radioStyle: {
    width: (width * 2) / 3,
    borderBottomColor: "#C5C5C5",
    borderBottomWidth: 1,
  },
  confirmButton: {
    marginTop: 30,
    alignItems: "center",
    alignSelf: "center",
    width: "30%",
    paddingVertical: 5,
    borderWidth: 3,
    borderColor: "#ff7605",
    borderRadius: 30,
  },
  confirmText: {
    fontSize: 18,
    color: "#ff7605",
    fontFamily: "Avenir",
    fontWeight: "600",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketCheckout);