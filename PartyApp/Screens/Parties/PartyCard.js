import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import Toast from "react-native-toast-message"
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/ticketsActions";

import Moment from 'moment';

var { width, height } = Dimensions.get("window");

const PartyCard = (props) => {
  const {
    _id,
    username,
    host,
    memberCount,
    description,
    dateOf,
    price,
    image,
    count,
    capacity,
    address,
  } = props;

  Moment.locale('de');

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="cover" source={{ uri: image }} />

      <View style={styles.textContainer}>
        <View style={styles.SideBySide}>
          <View>
            <Text style={styles.date}>
            {Moment(dateOf).format('ddd, MMMM Do')}
              {/* {dateOf.length > 15 ? dateOf.substring(0, 15 - 3) + "..." : dateOf} */}
            </Text>
            <Text style={styles.membersText}>
              {memberCount} / {capacity} members
            </Text>

            <Text style={styles.distanceText}>{address}</Text>

            <Text style={styles.hostText}>
              {host.name.length > 15
                ? host.name.substring(0, 15 - 3) + "..."
                : host.name}
            </Text>
          </View>

          {capacity - memberCount > 0 ? (
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => {
                props.navigation.navigate("Ticket Checkout", {username: username, 
                  _id: _id,
                    host: host,
                    memberCount: memberCount,
                    description: description,
                    dateOf: dateOf,
                    price: price,
                    image: image,
                    count: count,
                    capacity: capacity,
                    address: address,
                });
              }}
            >
              <Text style={styles.payText}>Pay ${price}</Text>
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToTickets: (party) =>
      dispatch(actions.addTicket({ quantity: 1, party })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    marginTop: 20,
  },
  textContainer: {
    marginTop: width / 1.3 + 20,
    marginLeft: 5,
  },
  image: {
    marginTop: 10,
    width: width / 1.1,
    height: width / 1.3,
    backgroundColor: "transparent",
    position: "absolute",
    borderRadius: 15,
    alignSelf: "center",
    borderWidth: 0,
    borderColor: "#ff7605"
  },
  date: {
    fontFamily: "Avenir",
    fontSize: 25,
  },
  payButton: {
    borderWidth: 2,
    borderColor: "#ff7605",
    width: 100,
    borderRadius: 22,
    padding: 7,
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
  distanceText: {
    fontFamily: "Avenir",
    fontSize: 20,
    color: "#656565",
  },
  membersText: {
    fontSize: 20,
    fontFamily: "Avenir",
    color: "#656565",
  },
});

export default connect(null, mapDispatchToProps)(PartyCard);

// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Dimensions,
//   Image,
//   Text,
//   Button,
//   TouchableOpacity,
//   Alert,
// } from "react-native";

// import Toast from "react-native-toast-message"
// import { connect } from "react-redux";
// import * as actions from "../../Redux/Actions/ticketsActions";

// var { width, height } = Dimensions.get("window");

// const PartyCard = (props) => {
//   const {
//     username,
//     host,
//     memberCount,
//     description,
//     dateOf,
//     price,
//     image,
//     count,
//     capacity,
//     address,
//   } = props;

//   return (
//     <View style={styles.container}>
//       <Image style={styles.image} resizeMode="cover" source={{ uri: image }} />

//       <View style={styles.textContainer}>
//         <View style={styles.SideBySide}>
//           <View>
//             <Text style={styles.date}>
//               {dateOf}
//               {/* {dateOf.length > 15 ? dateOf.substring(0, 15 - 3) + "..." : dateOf} */}
//             </Text>
//             <Text style={styles.membersText}>
//               {memberCount} / {capacity} members
//             </Text>

//             <Text style={styles.distanceText}>{address}</Text>

//             <Text style={styles.hostText}>
//               {host.length > 15
//                 ? host.substring(0, 15 - 3) + "..."
//                 : host}
//             </Text>
//           </View>

//           {capacity - memberCount > 0 ? (
//             <TouchableOpacity
//               style={styles.payButton}
//               onPress={() => {
//                 props.addItemToTickets(props);
//                 props.navigation.navigate("Ticket Checkout", {username: username
//                 });
//               }}
//             >
//               <Text style={styles.payText}>Pay ${price}</Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               style={styles.payButton}
//               onPress={() => {
//                 Alert.alert("Party is currently full");
//               }}
//             >
//               <Text style={styles.payText}>Party Full</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addItemToTickets: (party) =>
//       dispatch(actions.addTicket({ quantity: 1, party })),
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     width: width / 1.1,
//     marginTop: 20,
//   },
//   textContainer: {
//     marginTop: width / 1.3 + 20,
//     marginLeft: 5,
//   },
//   image: {
//     marginTop: 10,
//     width: width / 1.1,
//     height: width / 1.3,
//     backgroundColor: "transparent",
//     position: "absolute",
//     borderRadius: 15,
//     alignSelf: "center",
//     borderWidth: 0,
//     borderColor: "#ff7605"
//   },
//   date: {
//     fontFamily: "Avenir",
//     fontSize: 25,
//   },
//   payButton: {
//     borderWidth: 2,
//     borderColor: "#ff7605",
//     width: 100,
//     borderRadius: 22,
//     padding: 7,
//     alignSelf: "flex-end",
//     marginRight: 5,
//   },
//   payText: {
//     fontFamily: "Avenir",
//     color: "#ff7605",
//     fontSize: 17,
//     fontWeight: "500",
//     alignSelf: "center",
//   },
//   hostText: {
//     fontFamily: "Avenir",
//     fontSize: 22,
//     color: "#ff7605",
//   },
//   SideBySide: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   distanceText: {
//     fontFamily: "Avenir",
//     fontSize: 20,
//     color: "#656565",
//   },
//   membersText: {
//     fontSize: 20,
//     fontFamily: "Avenir",
//     color: "#656565",
//   },
// });

// export default connect(null, mapDispatchToProps)(PartyCard);
