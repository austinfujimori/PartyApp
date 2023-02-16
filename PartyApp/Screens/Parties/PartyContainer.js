import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  Dimensions,
  Keyboard,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Feather, Entypo } from "@expo/vector-icons";

import PartyList from "./PartyList";
import SearchBar from "../../Shared/SearchBar";
import SearchedParty from "./SearchedParty";
import CategoryFilter from "./CategoryFilter";
import Banner from "../../Shared/Banner";

//CONNECTION
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

var { width, height } = Dimensions.get("window");

const PartyContainer = (props) => {
  const [parties, setParties] = useState([]);
  const [partiesFiltered, setPartiesFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [partiesCategory, setPartiesCategory] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true)

  //testing

  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      //CONNECTION
      axios
        .get(`${baseURL}parties`)
        .then((res) => {
          setParties(res.data);
          setPartiesFiltered(res.data);
          setInitialState(res.data);
          setLoading(false)
          //setPartiesCtg(res.data)
        })
        .catch((error) => {
          console.log("Api call error");
        });

      //CONNECTION FOR CATEGORIES
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setParties([]);
        setPartiesFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchParty = (text) => {
    setPartiesFiltered(
      parties.filter((i) =>
        i.host.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openList = () => {
    setFocus(true);
    setClicked(true);
  };

  const onBlur = () => {
    setFocus(false);
    Keyboard.dismiss();
    setClicked(false);
  };

  //Categories

  const changeCategory = (ctg) => {
    {
      ctg === "all"
        ? [setPartiesCategory(initialState), setActive(true)]
        : [
            setPartiesCategory(
              setPartiesCategory(
                parties.filter((i) => i.category._id === ctg),
                setActive(true)
              )
            ),
          ];
    }
  };

  return (
    <>
    {loading == false ? (
          <View style={{ flex: 1 }}>
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.mapPinButton}>
              <Feather name="map-pin" size={40} color="white" />
            </TouchableOpacity>
            <SearchBar
              searchParty={searchParty}
              clicked={clicked}
              setClicked={setClicked}
              openList={openList}
              onBlur={onBlur}
            />
            <TouchableOpacity style={styles.addPartyButton} onPress={() => props.navigation.navigate("Create Party Form")}>
              <Feather name="plus" size={50} color="white" />
            </TouchableOpacity>
          </View>
          {focus == true ? (
            <SearchedParty
              partiesFiltered={partiesFiltered}
              navigation={props.navigation}
            />
          ) : (
            <ScrollView>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Parties</Text>
              </View>
    
              {/* <View
                style={{
                  paddingBottom: 5,
                  borderBottomColor: "#C5C5C5",
                  borderWidth: 0.5,
                  borderColor: "transparent",
                }}
              >
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCategory}
                  partiesCategory={partiesCategory}
                  active={active}
                  setActive={setActive}
                />
              </View> */}
              <View>
                <Text style={styles.popularTitle}>Popular Today</Text>
                <Banner props={parties}/>
              </View>
    
              <View style={styles.categoryContainer}>
                <Text style={styles.recTitle}>Recommended</Text>
                <FlatList
                  data={parties}
                  renderItem={({ item }) => (
                    <PartyList
                      navigation={props.navigation}
                      key={item._id}
                      item={item}
                    />
                  )}
                  keyExtractor={(item) => item._id}
                />
              </View>
            </ScrollView>
          )}
        </View>
    ):(
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size="large" color="orange"/>
      </View>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator:{
    justifyContent: "center",
    alignItems:"center",
    flex: 1
  },
  titleContainer: {
    borderBottomColor: "orange",
    borderBottomWidth: 5,
    width: width / 2,
    marginLeft: width - width / 1.1,
    marginTop: 5,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "44",
    fontWeight: "500",
    color:"black",
    height: height / 9,
    paddingTop: height / 20,
  },
  popularTitle: {
    alignItems: "center",
    marginLeft: width - width / 1.1 + 5,
    justifyContent: "center",
    fontSize: "30",
    fontWeight: "500",
    paddingTop: 35,
    paddingBottom: 20,
  },
  recTitle: {
    alignItems: "center",
    marginLeft: width - width / 1.1 + 5,
    justifyContent: "center",
    fontSize: "30",
    fontWeight: "500",
    paddingTop: 35,
  },
  categoryContainer: {
    borderTopWidth: 1,
    borderColor: "#e0dede",
    paddingBottom: 30,
  },
  searchContainer: {
    paddingBottom: 15,
    paddingTop: 70,
    flexDirection: "row",
    justifyContent: "center",
    // borderBottomColor: "#C5C5C5",
    // borderBottomWidth: 0.5,
    backgroundColor: "#fab164",
  },
  addPartyButton: {
    width: 50,
  },
  mapPinButton: {
    justifyContent: "center",
    width: 50,
  },
});
export default PartyContainer;
