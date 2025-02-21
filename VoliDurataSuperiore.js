import React, { useState } from "react";
import axios from "axios";
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const VoliDurataSuperiore = () => {
  const [voli, setVoli] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVoli = () => {
    setLoading(true);

    axios
      .get("http://127.0.0.1:5004/query/2")
      .then((response) => setVoli(response.data))
      .catch((error) => console.error("Errore nel recupero dei voli", error))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voli con Durata Superiore alla Media della Compagnia</Text>

      {/* Bottone per caricare i dati */}
      <Button
        title={loading ? "Caricamento..." : "Carica Voli"}
        onPress={fetchVoli}
        disabled={loading}
      />

      {/* Indicatore di caricamento */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {/* Lista dei voli */}
      {voli.length > 0 ? (
        <View style={styles.table}>
          <Text style={styles.tableHeader}>Codice - Compagnia - Durata (minuti)</Text>
          <FlatList
            data={voli}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.codice}</Text>
                <Text style={styles.tableCell}>{item.comp}</Text>
                <Text style={styles.tableCell}>{item.durataMinuti}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        !loading && <Text style={styles.noData}>Nessun volo disponibile al momento.</Text>
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
  table: {
    marginTop: 20,
    width: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableCell: {
    fontSize: 16,
    width: "30%",
  },
  noData: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default VoliDurataSuperiore;
