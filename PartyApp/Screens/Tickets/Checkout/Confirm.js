import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { connect } from "react-redux";

import * as actions from "../../../Redux/Actions/ticketsActions";

import Toast from "react-native-toast-message";

import axios from "axios";

import baseURL from "../../../assets/common/baseUrl";

import AuthGlobal from "../../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Moment from "moment";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const [token, setToken] = useState();

  const order = props.route.params.order;

  const context = useContext(AuthGlobal);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
  });

  const confirmOrder = (id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    //change order status to USER CONFIRMED
    axios
      .put(`${baseURL}orders/userConfirm/${id}`, "status", config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "User Confirmed",
            text2: "Please wait for host to confirm",
          });
          setTimeout(() => {
            props.navigation.navigate("Tickets");
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
  };

  Moment.locale("de");

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.attendeeText}>Attendee Name</Text>
          <Text style={styles.nameText}>{order.user.name}</Text>

          <Text style={styles.attendeeText}>Date</Text>
          <Text style={styles.nameText}>
            {Moment(order.party.dateOf).format("ddd, MMMM Do")}
          </Text>
          <Text style={styles.attendeeText}>Host</Text>
          <Text style={styles.nameText}>{order.party.host.name}</Text>
          <Text style={styles.attendeeText}>Address</Text>
          <Text style={styles.nameText}>{order.party.address}</Text>
          <Text style={styles.attendeeText}>Price</Text>
          <Text style={styles.nameText}>${order.party.price}</Text>

          <Text style={styles.attendeeText}>Date Ordered:</Text>

          <Text style={styles.nameText}>
            {Moment(order.dateOrdered).format("ddd, MMMM Do")}
          </Text>

          {/* <Text style={styles.attendeeText}>Card:</Text>

              <Text style={styles.nameText}>{order.card.name}</Text> */}
        </View>

        <TouchableOpacity onPress={() => confirmOrder(order._id)}>

          <Text>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  attendeeText: {
    text: "Avenir",
    fontSize: 20,
    color: "gray",
    paddingTop: 30,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    text: "Avenir",
    fontSize: 20,
    paddingTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);

// import React from "react";

// import {
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";

// import { connect } from "react-redux";

// import * as actions from "../../../Redux/Actions/ticketsActions";

// var { width, height } = Dimensions.get("window");

// const Confirm = (props) => {
//   const confirm = props.route.params

//   const partyDetails = (confirm.confirmItems.ticketsItems)[0].party

//   const confirmOrder = () => {
//     setTimeout(() => {
//       props.clearTickets();
//       props.navigation.navigate("Tickets");
//     }, 500);
//   };

//   return (
//     <ScrollView>
//       <View style={styles.mainContainer}>
//         {props.route.params ? (
//           <View style={styles.textContainer}>
//             <Text style={styles.attendeeText}>Attendee Name</Text>
//             <Text style={styles.nameText}>{partyDetails.username}</Text>

//             <Text style={styles.attendeeText}>Date</Text>
//             <Text style={styles.nameText}>
//               {partyDetails.dateOf}
//             </Text>
//             <Text style={styles.attendeeText}>Host</Text>
//             <Text style={styles.nameText}>
//               {partyDetails.host}
//             </Text>
//             <Text style={styles.attendeeText}>Address</Text>
//             <Text style={styles.nameText}>
//               {partyDetails.address}
//             </Text>
//             <Text style={styles.attendeeText}>Price</Text>
//             <Text style={styles.nameText}>
//               ${partyDetails.price}
//             </Text>

//           </View>
//         ) : null}

//         <TouchableOpacity onPress={confirmOrder}>
//           <Text>Confirm</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearTickets: () => dispatch(actions.clearTickets()),
//     removeItemFromTickets: (item) => dispatch(actions.removeTicket(item)),
//   };
// };

// const styles = StyleSheet.create({
//   attendeeText: {
//     text: "Avenir",
//     fontSize: 20,
//     color: "gray",
//     paddingTop: 30,
//   },
//   mainContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   textContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   nameText: {
//     text: "Avenir",
//     fontSize: 20,
//     paddingTop: 10,
//   },
// });

// export default connect(null, mapDispatchToProps)(Confirm);
