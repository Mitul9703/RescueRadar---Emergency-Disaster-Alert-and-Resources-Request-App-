// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOW8Kh14USDOp_6hvMGuln_1JoT-yHZ8E",
  authDomain: "sih1440-2ae62.firebaseapp.com",
  projectId: "sih1440-2ae62",
  storageBucket: "sih1440-2ae62.appspot.com",
  messagingSenderId: "270759310060",
  appId: "1:270759310060:web:3e2465be999ef5f401abc9",
  measurementId: "G-LTKP24VB8P",
};

const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
};

// const initialRescueAgencies = [
//   {
//     name: "Agency A",
//     disaster: "Earthquake",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 5,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location: "My House",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     name: "Agency B",
//     disaster: "Flood",
//     location:
//       "2, Kamarajapuram 2nd St, Kamarajapuram, Anakaputhur, Chennai, Tamil Nadu 600075",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   // Add more agencies as needed
// ];
// const initialVolunteers = [
//   {
//     volunteer_name: "Person 1",
//     type_of_resource: "Food",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Shelter",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Clothes",
//     location: "My House",

//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Shelter, Food",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
//     numberOfTeams: 3,
//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Shelter",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Shelter, Food",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",

//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Shelter",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Shelter, Clothes",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
//     contact: 9551398396,
//   },
//   {
//     volunteer_name: "Person 2",
//     type_of_resource: "Clothes",
//     location:
//       "Selvi memorial trust ,Pasumpon Muthuramalingam salai, Old chamiyars road, Teynampet, Che, 18",
//     contact: 9551398396,
//   },
//   // Add more agencies as needed
// ];
// const addRescueAgency = async (agencyData) => {
//   try {
//     const db = initializeFirebase();
//     const rescueAgenciesRef = collection(db, "volunteer resources");

//     // Add a new document to the "rescue agencies" collection
//     const docRef = await addDoc(rescueAgenciesRef, agencyData);

//     console.log("Document added with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding rescue agency: ", error);
//   }
// };

// initialVolunteers.forEach(async (agencyData) => {
//   try {
//     await addRescueAgency(agencyData);
//   } catch (error) {
//     console.error("Error adding rescue agency: ", error);
//   }
// });

const fetchRescueAgencies = async () => {
  try {
    const db = initializeFirebase();
    const rescueAgenciesRef = collection(db, "rescue agencies");
    const rescueAgenciesSnapshot = await getDocs(rescueAgenciesRef);

    const rescueAgenciesData = rescueAgenciesSnapshot.docs.map((doc) => {
      // Convert the Firestore document into the desired format
      return {
        id: doc.id, // Use doc.id as the id
        name: doc.data().name,
        disaster: doc.data().disaster,
        location: doc.data().location,
        numberOfTeams: doc.data().numberOfTeams,
        contact: doc.data().contact,
      };
    });
    console.log("fetched");
    return rescueAgenciesData;

    // Display the converted data
  } catch (error) {
    console.error("Error fetching rescue agencies:", error);
  }
};

const fetchVolunteerResources = async () => {
  try {
    const db = initializeFirebase();
    const volunteerResourcesref = collection(db, "volunteer resources");
    const volunteerResourcesSnapshot = await getDocs(volunteerResourcesref);

    const volunteerResourcesData = volunteerResourcesSnapshot.docs.map(
      (doc) => {
        // Convert the Firestore document into the desired format
        return {
          id: doc.id, // Use doc.id as the id
          volunteer_name: doc.data().volunteer_name,
          type_of_resource: doc.data().type_of_resource,
          location: doc.data().location,
          contact: doc.data().contact,
        };
      }
    );
    console.log("fetched");
    return volunteerResourcesData;

    // Display the converted data
  } catch (error) {
    console.error("Error fetching volunteer resources:", error);
  }
};

const fetchUserRequests = async () => {
  try {
    const db = initializeFirebase();
    const userRequestsref = query(
      collection(db, "users"),
      where("userid", "==", "Mitul789")
    );
    const userRequestsSnapshot = await getDocs(userRequestsref);

    const userRequestsData = userRequestsSnapshot.docs.map((doc) => {
      // Convert the Firestore document into the desired format
      return {
        id: doc.id, // Use doc.id as the id
        agency_requests: doc.data().agency_requests,
      };
    });
    const requestsArray = userRequestsData.map(
      (data) => data.agency_requests
    )[0];

    console.log(userRequestsData);
    return requestsArray;

    // Display the converted data
  } catch (error) {
    console.error("Error fetching volunteer resources:", error);
  }
};

const addAgencyRequest = async (agency) => {
  try {
    const db = initializeFirebase();
    const usersCollectionref = query(
      collection(db, "users"),
      where("userid", "==", "Mitul789")
    );

    // Execute the query and get the resulting documents
    const querySnapshot = await getDocs(usersCollectionref);

    // Assuming there's only one document with the name "Mitul789,"
    // you can use the first document in the query results
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      // Create an object with the agency's information you want to add
      const agencyInfo = {
        contact: agency.contact,
        disaster: agency.disaster,
        location: agency.location,
        name: agency.name,
        numberOfTeams: agency.numberOfTeams,
      };

      // Update the user's document to add the agency's information to the "requests" field
      await updateDoc(userRef, {
        agency_requests: arrayUnion(agencyInfo),
      });
    } else {
      console.error("User not found with name 'Mitul789'");
    }
  } catch (error) {
    console.error("Error sending request alert:", error);
  }
};

const fetchResourceRequests = async () => {
  try {
    const db = initializeFirebase();
    const userRequestsref = query(
      collection(db, "users"),
      where("userid", "==", "Mitul789")
    );
    const userRequestsSnapshot = await getDocs(userRequestsref);

    const userRequestsData = userRequestsSnapshot.docs.map((doc) => {
      // Convert the Firestore document into the desired format
      return {
        id: doc.id, // Use doc.id as the id
        resource_requests: doc.data().resource_requests,
      };
    });
    const requestsArray = userRequestsData.map(
      (data) => data.resource_requests
    )[0];

    console.log("HEheeee", requestsArray);
    return requestsArray;

    // Display the converted data
  } catch (error) {
    console.error("Error fetching volunteer resources:", error);
  }
};

const addResourceRequest = async (agency) => {
  try {
    const db = initializeFirebase();
    const usersCollectionref = query(
      collection(db, "users"),
      where("userid", "==", "Mitul789")
    );

    // Execute the query and get the resulting documents
    const querySnapshot = await getDocs(usersCollectionref);

    // Assuming there's only one document with the name "Mitul789,"
    // you can use the first document in the query results
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      // Create an object with the agency's information you want to add
      const agencyInfo = {
        contact: agency.contact,
        type_of_resource: agency.type_of_resource,
        location: agency.location,
        volunteer_name: agency.volunteer_name,
      };

      // Update the user's document to add the agency's information to the "requests" field
      await updateDoc(userRef, {
        resource_requests: arrayUnion(agencyInfo),
      });
    } else {
      console.error("User not found with name 'Mitul789'");
    }
  } catch (error) {
    console.error("Error sending request alert:", error);
  }
};

export {
  fetchVolunteerResources,
  fetchRescueAgencies,
  fetchUserRequests,
  addAgencyRequest,
  fetchResourceRequests,
  addResourceRequest,
};
