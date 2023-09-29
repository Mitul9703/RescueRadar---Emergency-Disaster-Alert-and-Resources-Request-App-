import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import { SearchBar } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import rescue_agencies from "../components/firebaseinit";
import {
  fetchRescueAgencies,
  addAgencyRequest,
} from "../components/firebaseinit";
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
  // const initialRescueAgencies = [
  //   {
  //     id: 1,
  //     name: "Agency A",
  //     disaster: "Earthquake",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 5,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 2,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 3,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location: "My House",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 4,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 5,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 6,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 7,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 8,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 9,
  //     name: "Agency B",
  //     disaster: "Flood",
  //     location:
  //       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   // Add more agencies as needed
  // ];

  const [allRescueAgencies, setAllRescueAgencies] = useState([]);
  const [rescueAgencies, setRescueAgencies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("All");
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  // Fetch data or initialize it as needed
  useEffect(() => {
    const fetchData = async () => {
      // Fetch the rescue agencies and wait for the result
      const agencies = await fetchRescueAgencies();

      setAllRescueAgencies(agencies);
      setRescueAgencies(agencies);
      setLoading(false);
    };
    fetchData();
  }, []);

  const searchFilterFunction = (text) => {
    setSearch(text);
    if (text === "") {
      // If the search text is empty, show all agencies of the selected disaster type
      filterAgenciesByDisaster(selectedDisaster);
    } else {
      const newData = rescueAgencies.filter((agency) => {
        const agencyData =
          `${agency.name} ${agency.location} ${agency.contact} ${agency.address} ${agency.disaster}`.toUpperCase();
        const textData = text.toUpperCase();
        return agencyData.includes(textData);
      });
      setRescueAgencies(newData);
    }
  };

  const filterAgenciesByDisaster = (disaster) => {
    setSelectedDisaster(disaster);
    if (disaster === "All") {
      setRescueAgencies(allRescueAgencies);
    } else {
      const filteredAgencies = allRescueAgencies.filter((agency) =>
        agency.disaster.includes(disaster)
      );
      setRescueAgencies(filteredAgencies);
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

  const handleRequestAlert = async (agency) => {
    try {
      setLoading(true); // Set requesting to true when starting the request

      // Call the addAgencyRequest function, which handles the request and returns a promise
      await addAgencyRequest(agency);

      // After the request is complete, set requesting back to false
      setLoading(false);

      alert(`Request sent to ${agency.name}`);
    } catch (error) {
      console.error("Error sending request alert:", error);
      setLoading(false); // Set requesting back to false in case of an error
    }
  };

  const handleGeneralRequest = () => {
    alert(`Request sent to nearby Agencies`);
  };

  const renderItems = ({ item }) => (
    <Card>
      <View>
        <View style={{}}>
          <Image source={require("../../assets/images/download.png")} />
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
          <View
            style={{
              borderColor: "red",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity onPress={() => handleRequestAlert(item)}>
              <View>
                <Text style={{ color: "red" }}>Request alert</Text>
              </View>
            </TouchableOpacity>
          </View>
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
            onValueChange={(itemValue) => filterAgenciesByDisaster(itemValue)}
            icon
          >
            <Picker.Item label="All Disasters" value="All" />
            <Picker.Item label="Earthquake" value="Earthquake" />
            <Picker.Item label="Flood" value="Flood" />
            {/* Add more disaster types as needed */}
          </Picker>
        </View>
        <TouchableOpacity onPress={() => handleGeneralRequest()}>
          <View
            style={{
              backgroundColor: "#f62e2e",
              padding: 10,
              borderRadius: 5,
              margin: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Send request to nearby Agencies
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading ? ( // Display loading indicator if loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <SafeAreaView style={styles.contentContainer}>
          <FlatList
            data={rescueAgencies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItems}
          />
        </SafeAreaView>
      )}
      <View style={{ height: 72 }} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
//       <SafeAreaView style={styles.contentContainer}>
//         <FlatList
//           data={rescueAgencies}
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
});

export default cards;
