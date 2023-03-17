// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import SearchedParty from "../Screens/Parties/SearchedParty";

const SearchBar = ({ clicked, searchParty, setClicked, openList, onBlur }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="white"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search host name"
          placeholderTextColor="white"
          onChangeText={(text) => searchParty(text)}
          onFocus={
            openList
          }
        />
        {/* //cross Icon, depending on whether the search bar is clicked or not
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={onBlur}
          />
        )} */}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            color="white"
            onPress={onBlur}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "65%",
    backgroundColor:"transparent"
  },
  searchBar__unclicked: {
    padding: 11,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#ff9842",
    borderRadius: 30,
    borderWidth: 0.3,
    borderColor: "white",
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 11,
    flexDirection: "row",
    borderWidth: 0.3,
    borderColor: "white",
    width: "70%",
    backgroundColor: "#ff9842",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    color: "white",
    fontSize: 17,
    marginLeft: 10,
    width: "90%",
  },
});
