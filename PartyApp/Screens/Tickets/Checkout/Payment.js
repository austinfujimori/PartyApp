import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";

//Radio Form
import RadioForm from "react-native-radio-form";

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

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>

      {/* <View>
        {methods.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.textField}
              onPress={() => setSelected(item.value)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        })}

      </View> */}
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

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => props.navigation.navigate("Confirm", { order })}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Payment;
