import React from "react";

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

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const confirm = props.route.params

  const confirmOrder = () => {
    setTimeout(() => {
      props.clearTickets();
      props.navigation.navigate("Tickets");
    }, 500);
  };


  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        {props.route.params ? (
          <View style={styles.textContainer}>
            <Text style={styles.attendeeText}>Attendee Name</Text>
            <Text style={styles.nameText}>{confirm.order.order.name}</Text>

            <Text style={styles.attendeeText}>Date</Text>
            <Text style={styles.nameText}>
              {confirm.order.order.orderItems[0].party.dateOf}
            </Text>
            <Text style={styles.attendeeText}>Host</Text>
            <Text style={styles.nameText}>
              {confirm.order.order.orderItems[0].party.host.name}
            </Text>
            <Text style={styles.attendeeText}>Address</Text>
            <Text style={styles.nameText}>
              {confirm.order.order.orderItems[0].party.address}
            </Text>
            <Text style={styles.attendeeText}>Price</Text>
            <Text style={styles.nameText}>
              ${confirm.order.order.orderItems[0].party.price}
            </Text>
            {/* {confirm.order.order.orderItems.map((x) => {
        return (
          <View>
            <Text>
              {x.party.dateOf}
            </Text>
          </View>
        )
      })} */}
          </View>
        ) : null}

        <TouchableOpacity onPress={confirmOrder}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
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

export default connect(null, mapDispatchToProps)(Confirm);
