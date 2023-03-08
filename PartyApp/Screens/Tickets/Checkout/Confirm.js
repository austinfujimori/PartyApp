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

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const [token, setToken] = useState();

  const order = props.route.params.order

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

  const confirmOrder = () => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    alert("put request and change status to \"user confirmed\"")
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.attendeeText}>Attendee Name</Text>
              <Text style={styles.nameText}>{order.user._id}</Text>

              <Text style={styles.attendeeText}>Date</Text>
              <Text style={styles.nameText}>{order.party.dateOf}</Text>
              <Text style={styles.attendeeText}>Host</Text>
              <Text style={styles.nameText}>{order.party.host}</Text>
              <Text style={styles.attendeeText}>Address</Text>
              <Text style={styles.nameText}>{order.party.address}</Text>
              <Text style={styles.attendeeText}>Price</Text>
              <Text style={styles.nameText}>${order.party.price}</Text>

              <Text style={styles.attendeeText}>Date Ordered:</Text>

              <Text style={styles.nameText}>{order.dateOrdered}</Text>

              {/* <Text style={styles.attendeeText}>Card:</Text>

              <Text style={styles.nameText}>{order.card.name}</Text> */}
            </View>

        <TouchableOpacity onPress={confirmOrder}>
          <Text>Confirm</Text>
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
