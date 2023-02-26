import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet,
     
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

import Toast from "react-native-toast-message"
import * as actions from "../../../Redux/Actions/ticketsActions";

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

const mapStateToProps = (state) => {
  const { ticketsItems } = state;
  return {
    ticketsItems: ticketsItems,
  };
};

const TicketCheckout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const username = props.route.params.username;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  useEffect(() => {
    setOrderItems(props.ticketsItems);

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      username,
      dateOrdered: Date.now(),
      orderItems,
      card: paymentCards[selected]
    };
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `Added Party`
    })
    props.navigation.navigate("Tickets", { order: order });
  };

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
        onPress={() => checkOut()}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
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

export default connect(mapStateToProps, null)(TicketCheckout);
