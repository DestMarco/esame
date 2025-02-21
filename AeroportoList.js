import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const AeroportiList = () => {
  const [aeroporti, setAeroporti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5004/query/1")  
      .then((response) => setAeroporti(response.data))
      .catch((error) => console.error("Errore nel recupero degli aeroporti", error))
      .finally(() => setLoading(false));
  }, []); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista degli Aeroporti</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={aeroporti}
          keyExtractor={(item) => item.codice.toString()} 
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>
                {item.codice} - {item.nome} - {item.citta}
              </Text>
            </View>
          )}
        />
      )}

      {/* Se non ci sono aeroporti */}
      {!loading && aeroporti.length === 0 && (
        <Text style={styles.noData}>Nessun aeroporto trovato.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  listText: {
    fontSize: 16,
  },
  noData: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default AeroportiList;
