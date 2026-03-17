import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MenuScreen() {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Llogaritë</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Kreditë</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Kartelat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Sigurimi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Kanalet Dixhitale të Bankimit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Ofertat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Apliko</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    paddingHorizontal: 20
  },

  item: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 10,
    marginBottom: 10
  },

  text: {
    fontSize: 18,
    fontWeight: "500"
  }

});