import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

class FetchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonData = await response.json();

      this.setState({
        users: jsonData,
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching users:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>City: {item.address.city}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FetchScreen;
