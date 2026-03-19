import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Alert
} from "react-native";

export default function App() {

  // ===== LOGIN =====
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // ===== LOGGED USER =====
  const [loggedUser, setLoggedUser] = useState(null);

  // ===== NAVIGATION =====
  const [page, setPage] = useState("Home");

  // ===== BANK USERS =====
  const [users, setUsers] = useState([
    { name: "Ardit", bankId: "1001", balance: 5000, password: "1111" },
    { name: "Blerim", bankId: "1002", balance: 3000, password: "2222" },
    { name: "Sara", bankId: "1003", balance: 4200, password: "3333" },
  ]);

  // ===== TRANSACTIONS & SAVING =====
  const [transactions, setTransactions] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const [goal, setGoal] = useState(1000);
  const [saved, setSaved] = useState(0);
  const [saveAmount, setSaveAmount] = useState("");

  // ===== FUNCTIONS =====

  // LOGIN DYNAMIC
  const handleLogin = () => {
    const user = users.find(u => u.name === name && u.password === password);
    if(user){
      setLoggedUser(user);
      setIsLoggedIn(true);
    } else {
      alert("Emri ose password gabim!");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedUser(null);
    setName("");
    setPassword("");
    setPage("Home");
  };

  // TRANSFER
  const handleTransfer = () => {
    const amt = parseFloat(amount);
    if(!receiver || !amt) return alert("Plotëso të dhënat!");

    const targetUserIndex = users.findIndex(u => u.bankId === receiver);
    if(targetUserIndex === -1) return alert("ID nuk ekziston!");
    if(amt > loggedUser.balance) return alert("Nuk ke para!");

    const updatedUsers = [...users];
    updatedUsers[users.findIndex(u=>u.bankId===loggedUser.bankId)].balance -= amt;
    updatedUsers[targetUserIndex].balance += amt;
    setUsers(updatedUsers);

    setLoggedUser({...loggedUser, balance: loggedUser.balance - amt});

    setTransactions([
      {
        id: Date.now().toString(),
        title: `Transfer → ${updatedUsers[targetUserIndex].name} (${receiver})`,
        amount: -amt,
        date: new Date().toLocaleDateString()
      },
      ...transactions
    ]);

    setReceiver("");
    setAmount("");
    Alert.alert("Sukses", `Transfer i suksesshëm: €${amt} → ${updatedUsers[targetUserIndex].name}`);
  };

  // PAY ONLINE / QR
  const handlePay = () => {
    const amt = parseFloat(amount);
    if(!amt) return alert("Shkruaj shumën për pagesë!");
    if(amt > loggedUser.balance) return alert("Nuk ke para të mjaftueshme!");

    const updatedUsers = [...users];
    updatedUsers[users.findIndex(u=>u.bankId===loggedUser.bankId)].balance -= amt;
    setUsers(updatedUsers);

    setLoggedUser({...loggedUser, balance: loggedUser.balance - amt});

    setTransactions([
      {
        id: Date.now().toString(),
        title: "Pagesë Online / QR",
        amount: -amt,
        date: new Date().toLocaleDateString()
      },
      ...transactions
    ]);

    setAmount("");
    Alert.alert("Sukses", `Pagesa online / QR e bërë: €${amt}`);
  };

  // TOP UP
  const handleTopUp = () => {
    const amt = parseFloat(amount);
    if(!amt) return alert("Shkruaj shumën!");
    const updatedUsers = [...users];
    updatedUsers[users.findIndex(u=>u.bankId===loggedUser.bankId)].balance += amt;
    setUsers(updatedUsers);

    setLoggedUser({...loggedUser, balance: loggedUser.balance + amt});

    setTransactions([
      {
        id: Date.now().toString(),
        title: "Top Up",
        amount: amt,
        date: new Date().toLocaleDateString()
      },
      ...transactions
    ]);

    setAmount("");
    Alert.alert("Sukses", `€${amt} janë shtuar në llogarinë tuaj`);
  };

  // SAVING GOAL
  const handleSave = () => {
    const amt = parseFloat(saveAmount);
    if(!amt) return alert("Shkruaj shumën!");
    if(amt > loggedUser.balance) return alert("Nuk ke para!");

    const updatedUsers = [...users];
    updatedUsers[users.findIndex(u=>u.bankId===loggedUser.bankId)].balance -= amt;
    setUsers(updatedUsers);

    setLoggedUser({...loggedUser, balance: loggedUser.balance - amt});
    setSaved(saved + amt);

    setTransactions([
      {
        id: Date.now().toString(),
        title: "Kursim",
        amount: -amt,
        date: new Date().toLocaleDateString()
      },
      ...transactions
    ]);

    setSaveAmount("");
  };

  // ===== LOGIN SCREEN =====
  if(!isLoggedIn){
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Banka Ime</Text>

        <TextInput
          placeholder="Emri"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <View style={{flexDirection:"row", alignItems:"center"}}>
          <TextInput
            placeholder="Password"
            style={[styles.input,{flex:1}]}
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
            <Text style={{marginLeft:10}}>
              {showPass ? "🙈" : "👁️"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Hyr</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ===== MAIN APP =====
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Banka Ime</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* 💳 CARD */}
      <View style={styles.card}>
        <Text style={styles.cardType}>VISA</Text>
        <Text style={styles.cardNumber}>**** 1234</Text>
        <Text style={styles.cardName}>{loggedUser.name}</Text>
        <Text style={styles.balance}>€{loggedUser.balance}</Text>
      </View>

      {/* MENU */}
      <View style={styles.menuRow}>
        <Btn label="Home" onPress={()=>setPage("Home")} />
        <Btn label="Transfer" onPress={()=>setPage("Transfer")} />
        <Btn label="Pay" onPress={()=>setPage("Pay")} />
        <Btn label="Top Up" onPress={()=>setPage("TopUp")} />
        <Btn label="History" onPress={()=>setPage("History")} />
        <Btn label="Stats" onPress={()=>setPage("Stats")} />
      </View>

      {/* ========================= */}
      {/* HOME */}
      {page === "Home" && (
        <View>
          <Text style={styles.homeTitle}>Mirë se vini, {loggedUser.name} 👋</Text>

          <Text style={styles.summary}>
            Ke shpenzuar €{transactions.reduce((s,t)=>s+Math.abs(t.amount),0)}
          </Text>

          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickBtn} onPress={()=>setPage("Transfer")}>
              <Text>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} onPress={()=>setPage("Pay")}>
              <Text>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} onPress={()=>setPage("TopUp")}>
              <Text>Top Up</Text>
            </TouchableOpacity>
          </View>

          {/* SAVING GOAL */}
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>🎯 Qëllimi i kursimit</Text>
            <Text style={styles.goalText}>€{saved} / €{goal}</Text>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill,{width:`${(saved/goal)*100}%`}]} />
            </View>

            <TextInput
              placeholder="Shto kursim (€)"
              style={styles.input}
              keyboardType="numeric"
              value={saveAmount}
              onChangeText={setSaveAmount}
            />

            <TouchableOpacity style={styles.btn} onPress={handleSave}>
              <Text style={styles.btnText}>Shto</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.section}>Dërgo shpejt</Text>
          <View style={styles.quickRow}>
            {users.map((u,i)=>(
              <TouchableOpacity key={i} style={styles.userBtn} onPress={()=>{
                setReceiver(u.bankId);
                setPage("Transfer");
              }}>
                <Text>{u.name}</Text>
                <Text style={{fontSize:10}}>ID: {u.bankId}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {transactions[0] && (
            <Text style={styles.lastActivity}>
              Transferi i fundit: €{Math.abs(transactions[0].amount)} → {transactions[0].title}
            </Text>
          )}
        </View>
      )}

      {/* ========================= */}
      {/* TRANSFER */}
      {page === "Transfer" && (
        <View>
          <TextInput
            placeholder="ID e Bankës"
            style={styles.input}
            keyboardType="numeric"
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

          <TouchableOpacity style={styles.btn} onPress={handleTransfer}>
            <Text style={styles.btnText}>Dërgo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ========================= */}
      {/* PAY ONLINE / QR */}
      {page === "Pay" && (
        <View>
          <TextInput
            placeholder="Shuma (€)"
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity style={styles.btn} onPress={handlePay}>
            <Text style={styles.btnText}>Pagesë</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ========================= */}
      {/* TOP UP */}
      {page === "TopUp" && (
        <View>
          <TextInput
            placeholder="Shuma (€)"
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity style={styles.btn} onPress={handleTopUp}>
            <Text style={styles.btnText}>Top Up</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* HISTORY */}
      {page === "History" && (
        <FlatList
          data={transactions}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>(
            <View style={styles.transaction}>
              <View>
                <Text style={{fontWeight:"bold"}}>{item.title}</Text>
                <Text style={{fontSize:12}}>{item.date}</Text>
              </View>
              <Text style={{color:item.amount<0?"red":"green"}}>{item.amount}€</Text>
            </View>
          )}
        />
      )}

      {/* STATS */}
      {page === "Stats" && (
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Shpenzimet e fundit</Text>
          <View style={styles.chart}>
            {transactions.slice(0,6).map((t,index)=>{
              const height = Math.min(Math.abs(t.amount)*2,150);
              return(
                <View key={index} style={styles.barContainer}>
                  <View style={[styles.bar,{height}]} />
                  <Text style={styles.barLabel}>T{index+1}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.totalText}>
            Total: €{transactions.reduce((s,t)=>s+Math.abs(t.amount),0)}
          </Text>
        </View>
      )}

    </ScrollView>
  );
}

// ===== BUTTON COMPONENT =====
const Btn = ({label,onPress}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

// ===== STYLES =====
const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#eef2f7",paddingTop:60,paddingHorizontal:20},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  title:{fontSize:26,fontWeight:"bold"},
  logout:{color:"red",fontWeight:"bold"},
  loginContainer:{flex:1,justifyContent:"center",padding:20},
  input:{backgroundColor:"white",padding:15,borderRadius:12,marginBottom:10},
  btn:{backgroundColor:"#2e86de",padding:15,borderRadius:12,alignItems:"center",marginBottom:15},
  btnText:{color:"white",fontWeight:"bold"},
  card:{backgroundColor:"#1e90ff",padding:25,borderRadius:20,marginVertical:20},
  cardType:{color:"white"},
  cardNumber:{color:"white",marginTop:10},
  cardName:{color:"white",marginTop:10},
  balance:{color:"white",fontSize:30,fontWeight:"bold",marginTop:10},
  menuRow:{flexDirection:"row",justifyContent:"space-around",marginBottom:20, flexWrap:"wrap"},
  menuItem:{backgroundColor:"white",padding:10,borderRadius:10,margin:5},
  transaction:{backgroundColor:"white",padding:15,borderRadius:12,marginBottom:10,flexDirection:"row",justifyContent:"space-between"},
  chartCard:{backgroundColor:"white",padding:20,borderRadius:20,marginTop:20,elevation:4},
  chartTitle:{fontSize:18,fontWeight:"bold",textAlign:"center",marginBottom:10},
  chart:{flexDirection:"row",justifyContent:"space-around",alignItems:"flex-end",height:180},
  barContainer:{alignItems:"center"},
  bar:{width:25,backgroundColor:"#2e86de",borderRadius:6},
  barLabel:{marginTop:5,fontSize:12},
  totalText:{marginTop:10,textAlign:"center",fontWeight:"bold"},
  homeTitle:{fontSize:22,fontWeight:"bold",marginBottom:15},
  summary:{marginBottom:15,color:"#555"},
  quickRow:{flexDirection:"row",justifyContent:"space-between",marginBottom:20, flexWrap:"wrap"},
  quickBtn:{backgroundColor:"white",padding:15,borderRadius:50,width:"30%",alignItems:"center",elevation:2,marginBottom:10},
  section:{fontSize:18,fontWeight:"bold",marginBottom:10},
  userBtn:{backgroundColor:"white",padding:12,borderRadius:50,alignItems:"center",width:70,marginRight:5,marginBottom:5},
  lastActivity:{marginTop:20,fontStyle:"italic"},
  goalCard:{backgroundColor:"white",padding:20,borderRadius:20,marginTop:20,elevation:3},
  goalTitle:{fontSize:18,fontWeight:"bold",marginBottom:10},
  goalText:{marginBottom:10,fontWeight:"bold"},
  progressBg:{height:10,backgroundColor:"#ddd",borderRadius:10,overflow:"hidden",marginBottom:10},
  progressFill:{height:10,backgroundColor:"#2e86de"}
});