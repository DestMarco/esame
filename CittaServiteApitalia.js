import React, { useState } from "react";
import axios from "axios";
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const CittaServiteApitalia = () => {
  const [citta, setCitta] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCitta = () => {
    setLoading(true);

    axios
      .get("http://127.0.0.1:5004/query/3")
      .then((response) => setCitta(response.data))
      .catch((error) => console.error("Errore nel recupero delle città", error))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Città Servite da Apitalia</Text>

      {/* Bottone per caricare le città */}
      <Button
        title={loading ? "Caricamento in corso..." : "Carica Città"}
        onPress={fetchCitta}
        disabled={loading}
      />

      {/* Sezione di caricamento */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {/* Lista delle città */}
      {citta.length > 0 ? (
        <View style={styles.cityList}>
          <Text style={styles.listTitle}>Elenco delle città</Text>
          <FlatList
            data={citta}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.cityItem}>{item}</Text>
            )}
          />
        </View>
      ) : (
        !loading && <Text style={styles.noData}>Nessuna città disponibile al momento.</Text>
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
  loader: {
    marginVertical: 20,
  },
  loadButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    color: "white",
    borderRadius: 5,
  },
  cityList: {
    marginTop: 20,
    width: "100%",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cityItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  noData: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default CittaServiteApitalia;
