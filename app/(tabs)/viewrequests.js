import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import { SearchBar } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import rescue_agencies from "../components/firebaseinit";
import {
  fetchUserRequests,
  deleteAgencyRequest,
} from "../components/firebaseinit";
import { useIsFocused } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const cards = () => {
  const isFocused = useIsFocused();
  const [allRequests, setAllRequests] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true); // Set loading to true while fetching data
    const requests = await fetchUserRequests();
    setAllRequests(requests);
    setUserRequests(requests);
    setLoading(false); // Set loading back to false when data is fetched
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component initially mounts
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData(); // Fetch data again when the screen gains focus
    }
  }, [isFocused]);

  const searchFilterFunction = (text) => {
    setSearch(text);
    if (text === "") {
      // If the search text is empty, show all agencies of the selected disaster type
      filterRequestsbyDisaster(selectedDisaster);
    } else {
      const newData = userRequests.filter((request) => {
        const requestData =
          `${request.name} ${request.location} ${request.contact} ${request.address} ${agency.disaster}`.toUpperCase();
        const textData = text.toUpperCase();
        return requestData.includes(textData);
      });
      setUserRequests(newData);
    }
  };

  const filterRequestsbyDisaster = (disaster) => {
    setSelectedDisaster(disaster);
    if (disaster === "All") {
      setUserRequests(allRequests);
    } else {
      const filteredAgencies = allRequests.filter((requests) =>
        requests.disaster.includes(disaster)
      );
      setUserRequests(filteredAgencies);
    }
  };

  const openMaps = (location) => {
    // Format the location string for the Google Maps URL
    const formattedLocation = location.replace(/\s+/g, "+");

    // Construct the Google Maps URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;

    // Open Google Maps
    Linking.openURL(mapsUrl).catch((err) =>
      console.error("An error occurred: ", err)
    );
  };

  const openPhoneApp = (contact) => {
    const phoneNumber = `tel:${contact}`;
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("An error occurred: ", err)
    );
  };

  const handleCancelRequest = async (agency) => {
    try {
      setLoading(true); // Set requesting to true when starting the request

      // Call the addAgencyRequest function, which handles the request and returns a promise
      await deleteAgencyRequest(agency);

      // After the request is complete, set requesting back to false
      setLoading(false);

      alert(`${agency.name} request cancelled!`);
      fetchData();
    } catch (error) {
      console.error("Error sending request alert:", error);
      setLoading(false); // Set requesting back to false in case of an error
    }
  };

  const renderItems = ({ item }) => (
    <Card>
      <View>
        <View>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              borderColor: "red",
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              textAlign: "center",
            }}
          >
            Request Pending
          </Text>
        </View>
        <View>
          <Text
            style={{
              padding: 10,
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {item.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "red" }}>
                Disaster Type :{" "}
              </Text>{" "}
              {item.disaster}
            </Text>
          </View>
          <View>
            <Text
              style={{
                padding: 10,
                fontSize: 15,
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "green" }}>
                Rescue Teams :{" "}
              </Text>
              {item.numberOfTeams}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              padding: 10,
              fontSize: 15,
              fontWeight: "normal",
              textAlign: "left",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Address : </Text>
            {item.location}
          </Text>
          <Text
            style={{
              color: "blue",
              padding: 10,
              textAlign: "left",
            }}
            onPress={() => openMaps(item.location)}
          >
            View in Maps
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 15,
              fontWeight: "normal",
              textAlign: "left",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Contact : </Text>
            <TouchableOpacity onPress={() => openPhoneApp(item.contact)}>
              <Text style={{ color: "blue" }}>{item.contact}</Text>
            </TouchableOpacity>
          </Text>
          <TouchableOpacity onPress={() => handleCancelRequest(item)}>
            <View
              style={{
                backgroundColor: "#f62e2e",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          placeholder="Search Agency name,Location, Disaster....  "
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          value={search}
        />
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedDisaster}
            onValueChange={(itemValue) => filterRequestsbyDisaster(itemValue)}
            icon
          >
            <Picker.Item label="All Disasters" value="All" />
            <Picker.Item label="Earthquake" value="Earthquake" />
            <Picker.Item label="Flood" value="Flood" />
            {/* Add more disaster types as needed */}
          </Picker>
        </View>
      </View>
      {loading ? ( // Display loading indicator if loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : userRequests.length === 0 ? (
        // Display "No Requests" when userRequests is empty
        <View style={styles.noRequestsContainer}>
          <Text style={styles.noRequestsText}>No agency requests</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.contentContainer}>
          <FlatList data={userRequests} renderItem={renderItems} />
        </SafeAreaView>
      )}
      <View style={{ height: 72 }} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
//       <SafeAreaView style={styles.contentContainer}>
//         <FlatList
//           data={userRequests}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItems}
//         />
//       </SafeAreaView>
//       <View style={{ height: 72 }} />
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0, // Offset for status bar
    margin: 20,
  },
  agencyItem: {
    flexDirection: "column",
    marginBottom: 15,
    padding: 10,
    borderColor: "light green",
    borderRadius: 8,
    width: "100%", // Adjust the width as needed
    shadowColor: "#d3d3d3",
    elevation: 2,
  },
  picker: {
    elevation: 1,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noRequestsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noRequestsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});

export default cards;
