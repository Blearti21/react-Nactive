import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState("Home");

  const [balance, setBalance] = useState(5420);

  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const menuItems = [
    "Home",
    "Transfer",
    "Llogaritë",
    "Kreditë",
    "Kartelat"
  ];

  // 🔐 LOGIN SCREEN
  if(!isLoggedIn){
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Emri"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => setIsLoggedIn(true)}
        >
          <Text style={styles.loginText}>Hyr</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 💸 TRANSFER FUNCTION
  const handleTransfer = () => {
    const amt = parseFloat(amount);

    if(!receiver || !amt){
      alert("Plotëso të dhënat!");
      return;
    }

    if(amt > balance){
      alert("Nuk ke mjaftueshëm para!");
      return;
    }

    setBalance(balance - amt);
    setReceiver("");
    setAmount("");

    alert("Transfer u krye!");
  };

  return (
    <View style={styles.container}>

      {/* HEADER + LOGOUT */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Banka Ime</Text>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setIsLoggedIn(false)}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcome}>Mirë se vini, {name}</Text>

      {/* 💰 BALANCE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bilanci</Text>
        <Text style={styles.balance}>€{balance}</Text>
      </View>

      {/* 🔥 MENU */}
      <View style={styles.menuRow}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => setPage(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PAGES */}
      {page === "Home" && (
        <View style={styles.page}>
          <Text style={styles.pageText}>Ballina</Text>
        </View>
      )}

      {page === "Transfer" && (
        <View style={styles.page}>
          <Text style={styles.pageText}>Transfer</Text>

          <TextInput
            placeholder="Marrësi"
            style={styles.input}
            value={receiver}
            onChangeText={setReceiver}
          />

          <TextInput
            placeholder="Shuma (€)"
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity style={styles.transferBtn} onPress={handleTransfer}>
            <Text style={styles.transferText}>Dërgo</Text>
          </TouchableOpacity>
        </View>
      )}

      {page !== "Home" && page !== "Transfer" && (
        <View style={styles.page}>
          <Text style={styles.pageText}>{page}</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    paddingTop:60,
    paddingHorizontal:20,
    backgroundColor:"#eef2f7"
  },

  headerRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:10
  },

  title:{
    fontSize:26,
    fontWeight:"bold"
  },

  logoutBtn:{
    backgroundColor:"#ff5c5c",
    paddingVertical:6,
    paddingHorizontal:12,
    borderRadius:8
  },

  logoutText:{
    color:"white",
    fontWeight:"bold"
  },

  welcome:{
    textAlign:"center",
    marginBottom:20
  },

  card:{
    backgroundColor:"#2e86de",
    padding:20,
    borderRadius:15,
    marginBottom:20
  },

  cardTitle:{
    color:"white"
  },

  balance:{
    color:"white",
    fontSize:28,
    fontWeight:"bold",
    marginTop:10
  },

  menuRow:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    marginBottom:20
  },

  menuItem:{
    backgroundColor:"white",
    padding:10,
    borderRadius:10,
    margin:5
  },

  page:{
    alignItems:"center"
  },

  pageText:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:15
  },

  input:{
    backgroundColor:"white",
    padding:15,
    borderRadius:10,
    width:"100%",
    marginBottom:10
  },

  transferBtn:{
    backgroundColor:"#2e86de",
    padding:15,
    borderRadius:10,
    width:"100%",
    alignItems:"center"
  },

  transferText:{
    color:"white",
    fontWeight:"bold"
  },

  loginContainer:{
    flex:1,
    justifyContent:"center",
    padding:20,
    backgroundColor:"#eef2f7"
  },

  loginBtn:{
    backgroundColor:"#2e86de",
    padding:15,
    borderRadius:10,
    alignItems:"center"
  },

  loginText:{
    color:"white",
    fontWeight:"bold"
  }

});