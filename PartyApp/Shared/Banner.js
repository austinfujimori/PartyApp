import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Swiper from "react-native-swiper/src";
import PartyCard from "../Screens/Parties/PartyCard";

var { width, height } = Dimensions.get("window");

import FeaturedCard from "./FeaturedCard";

const data = require("../assets/data/parties.json");

const Banner = (props) => {
  // const partyList = props.data


  //number of featured parties is 5
  var size = 5;
  const featuredData = [];
  for (const partyItem of data) {
    if (featuredData.length > size - 1) {
      break;
    }
    if (partyItem.isFeatured) {
      featuredData.push(partyItem);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={4}
            activeDotColor={"orange"}
          >
            {featuredData.map((item) => {
              return (
                <View>
                  <Image
                    key={item._id.$oid}
                    style={styles.imageBanner}
                    resizeMode="cover"
                    source={{ uri: item.image }}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.date}>{item.dateOf}</Text>
                    <Text style={styles.membersText}>
                      {item.memberCount} / {item.capacity} members
                    </Text>
                    <Text style={styles.distanceText}>{item.address}</Text>

                    <View style={styles.SideBySide}>
                    <Text style={styles.hostText}>
                      {item.host.name.length > 15
                        ? item.host.name.substring(0, 15 - 3) + "..."
                        : item.host.name}
                    </Text>

          {item.capacity - item.memberCount > 0 ? (
            <TouchableOpacity
              style={styles.payButton}
          //     onPress={() => {
          //       props.addItemToTickets(props);
          //     }}
            >
              <Text style={styles.payText}>Pay ${item.price}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => {
                Alert.alert("Party is currently full");
              }}
            >
              <Text style={styles.payText}>Party Full</Text>
            </TouchableOpacity>
          )}
                    </View>
                  </View>

                  
                </View>

                
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderBottomColor: "#C5C5C5",
    borderWidth: 1,
    borderColor: "white",
  },
  swiper: {
    width: width,
    height: 450,
    alignItems: "center",
  },
  imageBanner: {
    height: 250,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },

  membersText: {
    fontSize: 20,
    fontFamily: "Avenir",
    color: "#656565",
  },
  SideBySide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  distanceText: {
    fontFamily: "Avenir",
    fontSize: 20,
    color: "#656565",
  },
  date: {
    fontFamily: "Avenir",
    fontSize: 25,
  },
  textContainer: {
    marginLeft: 25,
    marginTop: 10,
  },
  payButton: {
    borderWidth: 2,
    borderColor: "#ff7605",
    width: 100,
    borderRadius: 10,
    padding: 7,
    alignSelf: "flex-end",
    marginRight: 25,
  },
  payText: {
    fontFamily: "Avenir",
    color: "#ff7605",
    fontSize: 17,
    fontWeight: "500",
    alignSelf: "center",
  },
  hostText: {
    fontFamily: "Avenir",
    fontSize: 22,
    color: "#ff7605",
  },
  SideBySide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Banner;
