import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function App() {

  const [page, setPage] = useState("Home");

  const balance = 5420;

  const menuItems = [
    "Llogaritë",
    "Kreditë",
    "Kartelat",
    "Sigurimi",
    "Kanalet",
    "Ofertat",
    "Apliko"
  ];

  function renderPage(){
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.pageTitle}>{page}</Text>

        <TouchableOpacity style={styles.back} onPress={()=>setPage("Home")}>
          <Text style={styles.backText}>Kthehu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <Text style={styles.welcome}>Mirë se vini 👋</Text>
      <Text style={styles.name}>Bleart</Text>

      {/* BALANCE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bilanci</Text>
        <Text style={styles.balance}>€{balance}</Text>
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickBtn}>
          <Text>Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickBtn}>
          <Text>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickBtn}>
          <Text>Top Up</Text>
        </TouchableOpacity>
      </View>

      {/* MENU VERTIKALE */}
      {page === "Home" ? (
        menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={()=>setPage(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))
      ) : (
        renderPage()
      )}

      {/* TRANSAKSIONE */}
      <Text style={styles.section}>Transaksionet</Text>

      <View style={styles.transaction}>
        <Text>Market</Text>
        <Text>-€50</Text>
      </View>

      <View style={styles.transaction}>
        <Text>Salary</Text>
        <Text>+€1200</Text>
      </View>

      <View style={styles.transaction}>
        <Text>Netflix</Text>
        <Text>-€10</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f2f4f7",
    paddingTop:60,
    paddingHorizontal:20
  },

  welcome:{
    fontSize:18,
    color:"#555"
  },

  name:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:20
  },

  card:{
    backgroundColor:"#2e86de",
    padding:25,
    borderRadius:15,
    marginBottom:20
  },

  cardTitle:{
    color:"white",
    fontSize:16
  },

  balance:{
    color:"white",
    fontSize:30,
    fontWeight:"bold",
    marginTop:10
  },

  quickRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20
  },

  quickBtn:{
    backgroundColor:"white",
    padding:15,
    borderRadius:10,
    width:90,
    alignItems:"center"
  },

  /* 🔥 MENU VERTIKALE */
  item:{
    backgroundColor:"#2e86de",
    paddingVertical:12,
    borderRadius:12,
    marginBottom:10,
    alignItems:"center"
  },

  text:{
    color:"white",
    fontSize:18,
    fontWeight:"bold"
  },

  section:{
    fontSize:20,
    fontWeight:"bold",
    marginTop:20,
    marginBottom:10
  },

  transaction:{
    backgroundColor:"white",
    padding:15,
    borderRadius:10,
    marginBottom:10,
    flexDirection:"row",
    justifyContent:"space-between"
  },

  pageContainer:{
    alignItems:"center",
    marginTop:50
  },

  pageTitle:{
    fontSize:28,
    fontWeight:"bold"
  },

  back:{
    marginTop:20,
    backgroundColor:"#2e86de",
    padding:10,
    borderRadius:10
  },

  backText:{
    color:"white"
  }

});