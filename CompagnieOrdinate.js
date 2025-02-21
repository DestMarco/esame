import React, { useState } from "react";
import axios from "axios";
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const CompagnieOrdinate = () => {
  const [compagnie, setCompagnie] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompagnie = () => {
    setLoading(true);

    axios
      .get("http://127.0.0.1:5004/query/5")
      .then((response) => setCompagnie(response.data))
      .catch((error) => console.error("Errore nel recupero delle compagnie", error))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compagnie aeree ordinate per anno di fondazione</Text>

      {/* Bottone per caricare i dati */}
      <Button
        title={loading ? "Caricamento..." : "Carica Compagnie"}
        onPress={fetchCompagnie}
        disabled={loading}
      />

      {/* Indicatore di caricamento */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {/* Lista delle compagnie */}
      {compagnie.length > 0 ? (
        <FlatList
          data={compagnie}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.nome} - Fondata nel {item.annofondaz}</Text>
            </View>
          )}
        />
      ) : (
        !loading && <Text style={styles.noData}>Nessuna compagnia trovata.</Text>
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

export default CompagnieOrdinate;
