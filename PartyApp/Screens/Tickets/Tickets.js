import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/ticketsActions";

import Icon from "react-native-vector-icons";

var { height, width } = Dimensions.get("window");

const Tickets = (props) => {
  const confirmItems = props
  return (
    <>
      {props.ticketsItems.length ? (



          <ScrollView style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tickets</Text>
          </View>
            {props.ticketsItems.map((data) => {
              return (
                <View style={styles.ticketContainer}>
                <Image key={Math.random()} source={{ uri: data.party.image }} style={styles.listItem} />

                <View style={styles.buttons}>


                  <View style={styles.textContainer}>
                    <View>
                      <Text style={styles.hostName}>
                        {data.party.host}'s Party
                      </Text>
                      <Text style={styles.dateOfText}>{data.party.dateOf}</Text>
                      <Text style={styles.priceText}>${data.party.price}</Text>
                    </View>

                   
                  </View>

<View>
<TouchableOpacity 
                    onPress={() => props.navigation.navigate("Confirm", {confirmItems})}
                    style={[styles.buttonContainer, {borderColor: "#0093FD", marginBottom: 10}]}>
                         <Text style={styles.confirmText}>
                         Check In
                         </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => props.removeItemFromTickets(data)}
                    style={[styles.buttonContainer, {borderColor: "red"}]}>
                         <Text style={styles.removeText}>
                         Remove
                         </Text>
                    </TouchableOpacity>


                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
    
      ) : (
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tickets</Text>
          </View>

          <Text style={styles.noPartyText}>
            No parties have been added yet.
          </Text>
        </ScrollView>
      )}
    </>
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
  ticketContainer: {
  },
  noPartyText: {
    alignSelf: "center",
    marginTop: height / 9,
  },
  listItem: {
    alignSelf: "center",
    borderRadius: 15,
    width: width / 1.1,
    height: width / 1.3,
    marginTop: 15,
    backgroundColor: "white",
    borderColor: "#C5C5C5",
    justifyContent: "center",
  },
  titleContainer: {
    borderBottomColor: "orange",
    borderBottomWidth: 5,
    width: width / 2,
    marginLeft: width-width/1.1,
    marginTop: 5,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "44", 
    fontWeight: "500",
    height: height/7,
    paddingTop: height/13
  },
  listContainer: {
  },
  hostName: {
    fontFamily: "Avenir",
    fontSize: 30,
    marginBottom: 8,
  },
  textContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateOfText: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
  priceText: {
    fontFamily: "Avenir",
    fontSize: 20,
    marginTop: 10
  },
  buttons: {
    marginRight: (width-width/1.1)/2 + 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    borderWidth: 2,
    width: 100,
    borderRadius: 10,
    padding: 10,
  },
  removeText: {
    fontFamily: "Avenir",
    fontSize: 17,
    color: "red",
    fontWeight: "500"
  },
  confirmText: {
    fontFamily: "Avenir",
    fontSize: 17,
    color: "#0093FD",
    fontWeight: "500"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
