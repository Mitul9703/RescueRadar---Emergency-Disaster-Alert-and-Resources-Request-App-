import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import { SearchBar } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import {
  fetchVolunteerResources,
  addResourceRequest,
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
  // const initialVolunteers = [
  //   {
  //     id: 1,
  //     volunteer_name: "Person 1",
  //     type_of_resource: "Food",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

  //     contact: 9551398396,
  //   },
  //   {
  //     id: 2,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Shelter",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

  //     contact: 9551398396,
  //   },
  //   {
  //     id: 3,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Clothes",
  //     location: "My House",

  //     contact: 9551398396,
  //   },
  //   {
  //     id: 4,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Shelter, Food",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
  //     numberOfTeams: 3,
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 5,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Shelter",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

  //     contact: 9551398396,
  //   },
  //   {
  //     id: 6,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Shelter, Food",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

  //     contact: 9551398396,
  //   },
  //   {
  //     id: 7,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Shelter",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 8,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Shelter, Clothes",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
  //     contact: 9551398396,
  //   },
  //   {
  //     id: 9,
  //     volunteer_name: "Person 2",
  //     type_of_resource: "Clothes",
  //     location:
  //       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
  //     contact: 9551398396,
  //   },
  //   // Add more agencies as needed
  // ];

  const [allVolunteers, setAllVolunteers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedResource, setSelectedResource] = useState("All");
  const [loading, setLoading] = useState(true);
  // Fetch data or initialize it as needed
  useEffect(() => {
    const fetchData = async () => {
      const volunteerResources = await fetchVolunteerResources();

      setAllVolunteers(volunteerResources);
      setVolunteers(volunteerResources);
      setLoading(false);
    };
    fetchData();
  }, []);

  const searchFilterFunction = (text) => {
    setSearch(text);
    if (text === "") {
      // If the search text is empty, show all agencies of the selected disaster type
      filterVolunteersbyResource(selectedResource);
    } else {
      const newData = volunteers.filter((volunteer) => {
        const volunteerData =
          `${volunteer.volunteer_name} ${volunteer.location} ${volunteer.contact} ${volunteer.type_of_resource}`.toUpperCase();
        const textData = text.toUpperCase();
        return volunteerData.includes(textData);
      });
      setVolunteers(newData);
    }
  };

  const filterVolunteersbyResource = (type_of_resource) => {
    setSelectedResource(type_of_resource);
    if (type_of_resource === "All") {
      setVolunteers(allVolunteers);
    } else {
      const filteredAgencies = allVolunteers.filter((volunteer) =>
        volunteer.type_of_resource.includes(type_of_resource)
      );
      setVolunteers(filteredAgencies);
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

  const handleRequestAlert = async (volunteer) => {
    try {
      setLoading(true); // Set requesting to true when starting the request

      // Call the addAgencyRequest function, which handles the request and returns a promise
      await addResourceRequest(volunteer);

      // After the request is complete, set requesting back to false
      setLoading(false);

      alert(`Request sent to ${volunteer.volunteer_name}`);
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
              padding: 10,
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "left",
              color: "green",
            }}
          >
            {item.type_of_resource}
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
              <Text style={{ fontWeight: "bold", color: "green" }}>
                Offered by :{" "}
              </Text>{" "}
              {item.volunteer_name}
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
              borderColor: "green",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity onPress={() => handleRequestAlert(item)}>
              <View>
                <Text style={{ color: "green" }}>Request for Resource</Text>
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
        <View>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            placeholder="Search Resource, Location...."
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            value={search}
          />
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedResource}
            onValueChange={(itemValue) => filterVolunteersbyResource(itemValue)}
            icon
          >
            <Picker.Item label="All Resources" value="All" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Shelter" value="Shelter" />
            <Picker.Item label="Clothes" value="Clothes" />
            {/* Add more type_of_resource types as needed */}
          </Picker>
        </View>
      </View>
      {loading ? ( // Display loading indicator if loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <SafeAreaView style={styles.contentContainer}>
          <FlatList
            data={volunteers}
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
