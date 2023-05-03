import React, { useState, useEffect, useContext, useCallback } from "react";
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
  Animated
} from "react-native";

import { Feather, Entypo } from "@expo/vector-icons";

import PartyList from "./PartyList";
import SearchBar from "../../Shared/SearchBar";
import SearchedParty from "./SearchedParty";
import CategoryFilter from "./CategoryFilter";
import Banner from "../../Shared/Banner";

import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  
  //testing

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {

            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile();
    };
  }, []);

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
      // axios
      //   .get(`${baseURL}categories`)
      //   .then((res) => {
      //     setCategories(res.data);
      //   })
      //   .catch((error) => {
      //     console.log("Api call error");
      //   });

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


  //SHRINK HEADER
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 100],
    extrapolate: 'clamp',
  });

  const headerTop = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(scrollY, {
      toValue: 1,
      duration: 1,
      useNativeDriver: false,
    }).start();
  }, []);



  return (
    <>
    {loading == false ? (
          <View style={{ flex: 1 }}>
          <Animated.View style={[styles.searchContainer,
          
{          height: headerHeight, 
          position: 'absolute', 
          top: headerTop, 
          left: 0, 
          right: 0
        }
          ]}>
            <TouchableOpacity style={styles.mapPinButton} onPress={() => props.navigation.navigate("Party Map View")}>
              <Feather name="map-pin" size={40} color="white" />
            </TouchableOpacity>
            <SearchBar
              searchParty={searchParty}
              clicked={clicked}
              setClicked={setClicked}
              openList={openList}
              onBlur={onBlur}
            />
            <TouchableOpacity style={styles.infoButton}>
              <Feather name="info" size={40} color="white" />
            </TouchableOpacity>


          </Animated.View>

          
          {focus == true ? (
            <SearchedParty
             username={userProfile._id}
              partiesFiltered={partiesFiltered}
              navigation={props.navigation}
            />
          ) : (

            <ScrollView
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: 200 }}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Parties</Text>
              </View>
    
              <View>
                <Text style={styles.popularTitle}>Popular Today</Text>
                <Banner props={parties}/>
              </View>
    
              <View style={styles.categoryContainer}>
                <Text style={styles.recTitle}>Recommended</Text>
                {
                  userProfile ? (
                    <FlatList
                    data={parties}
                    renderItem={({ item }) => (
                      <PartyList
                        navigation={props.navigation}
                        key={item._id}
                        item={item}
                        username={userProfile._id}
                      />
                    )}
                    keyExtractor={(item) => item._id}
                  />
                    
                  ) : (null)
                }

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
    // height: height / 9,
    // paddingTop: height / 20,
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
  infoButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  },
  mapPinButton: {
    marginRight: 15,
    justifyContent: "center",
  },
});
export default PartyContainer;
