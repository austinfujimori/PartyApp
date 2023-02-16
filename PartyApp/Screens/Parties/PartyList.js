import React, { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";

import PartyCard from "./PartyCard";

var { width } = Dimensions.get("window");

const PartyList = (props) => {
     const {item} = props
  return (
      <TouchableOpacity onPress={() => {
        props.navigation.navigate("Party Detail", {item: item})
      }} style={{ width: width, alignItems: "center", backgroundColor: "transparent"}}>
          <PartyCard {...item} navigation={props.navigation} />
      </TouchableOpacity>
  );
};

export default PartyList 