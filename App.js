import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AeroportiList from "./AeroportiList";
import VoliDurataSuperiore from "./VoliDurataSuperiore";
import CittaServiteApitalia from "./CittaServiteApitalia";
import VoliOltre500 from "./VoliOltre500";
import CompagnieOrdinate from "./CompagnieOrdinate";
import { View, Button, StyleSheet } from "react-native";

const Stack = createStackNavigator();

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Voli Oltre 600" onPress={() => navigation.navigate("Voli Oltre 600")} />
      <Button title="Voli Durata Superiore" onPress={() => navigation.navigate("Voli Durata Superiore")} />
      <Button title="Città Servite Apitalia" onPress={() => navigation.navigate("Città Servite Apitalia")} />
      <Button title="Compagnie Ordinate" onPress={() => navigation.navigate("Compagnie Ordinate")} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AeroportiList} />
        <Stack.Screen name="Voli Oltre 600" component={VoliOltre500} />
        <Stack.Screen name="Voli Durata Superiore" component={VoliDurataSuperiore} />
        <Stack.Screen name="Città Servite Apitalia" component={CittaServiteApitalia} />
        <Stack.Screen name="Compagnie Ordinate" component={CompagnieOrdinate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default App;
