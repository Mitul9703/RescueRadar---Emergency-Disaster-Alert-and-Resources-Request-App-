import { Tabs } from "expo-router";
import { View, Text, Platform } from "react-native";
import { Image } from "expo-image";
import icons from "../../constants/icons";
import { COLORS } from "../../constants/theme";

import { FontAwesome5, MaterialIcons} from "@expo/vector-icons";



export default function TabLayout() {

  return (
    <Tabs screenOptions={{
    
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        height: 72,
        elevation: 0,
        backgroundColor: COLORS.white
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <FontAwesome5
                  name="hands-helping" // Replace with the appropriate icon name
                  size={24}
                  color={focused ? COLORS.primary : COLORS.black}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Resources</Text>
              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="viewagencies"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <MaterialIcons
                  name= "local-police" 
                  size={24}
                  color={focused ? COLORS.primary : COLORS.black}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Rescue Agencies</Text>
              </View>
            )
          }
        }}/>
            <Tabs.Screen
        name="viewrequests"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <FontAwesome5
                  name= "plus-circle" 
                  size={24}
                  color={focused ? COLORS.primary : COLORS.black}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Requests</Text>
              </View>
            )
          }
        }}/>
              <Tabs.Screen
        name="viewresourcerequest"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <FontAwesome5
                  name="people-arrows" // Replace with the appropriate icon name
                  size={24}
                  color={focused ? COLORS.primary : COLORS.black}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Resource requests</Text>
              </View>
            )
          }
        }}
      />
      

    </Tabs>
  )
}