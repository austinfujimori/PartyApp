import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TouchableOpacity
} from "react-native";

import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleParty = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);


  const [availabilityText, setAvailabilityText] = useState("")

  useEffect(() => {
    if (props.route.params.item.memberCount == props.route.params.item.capacity){
      setAvailability(<TrafficLight unavailable> </TrafficLight>)
      setAvailabilityText("Full")
    }

    else if (props.route.params.item.memberCount >= props.route.params.item.capacity - 5){
      setAvailability(<TrafficLight limited> </TrafficLight>)
      setAvailabilityText("Almost Full")
    }

    else {
      setAvailability(<TrafficLight available> </TrafficLight>)
      setAvailabilityText("Open")
    }

    return () => {
      setAvailability(null)
      setAvailabilityText("")
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80 }}>
        <Image
          source={{
            uri: item.image,
          }}
          
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.dateText}>{item.dateOf}</Text>
            <Text style={styles.countText}>
              {item.memberCount}/{item.capacity}
            </Text>
          </View>

          <Text style={styles.addressText}>{item.address}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={styles.hostText}>{item.host.name}</Text>


          {item.capacity - item.memberCount > 0 ? (
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payText}>Pay {item.price}$</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.payButton}>
<Text style={styles.payText}>Party Full</Text>
          </TouchableOpacity>
          )}

            <View>
              <Text>
                {availabilityText}
              </Text>
            </View>


        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 350,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  dateText: {
    fontFamily: "Avenir",
    fontSize: "40",
  },
  addressText: {
    fontFamily: "Avenir",
    fontSize: "35",
  },
  descriptionText: {
    fontFamily: "Avenir",
    fontSize: "20",
  },
  countText: {
    fontFamily: "Avenir",
    fontSize: "25",
  },
  payButton: {
    borderWidth: 2,
    borderColor: "#ff7605",
    width: 100,
    borderRadius: 22,
    padding: 5,
    alignSelf: "flex-end",
    marginRight: 5,
  },
  payText: {
    fontFamily: "Avenir",
    color: "#ff7605",
    fontSize: 17,
    fontWeight: "500",
    alignSelf: "center",
  },
});

export default SingleParty;