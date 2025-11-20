import React from "react";
import { Text, StyleSheet, View, FlatList, Button } from "react-native";
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";

const students = [
  { name: "Eden", surname: "Rocha", age: "17" },
  { name: "Kaylen", surname: "Tyler", age: "15" },
  { name: "Ellie", surname: "Mcclure", age: "17" },
  { name: "Journey", surname: "Blackburn", age: "16" },
];

let count=0

const ListScreen = () => {
  return (
    <View>
      <Button
        title="Click me"
        Color="red"
        onPress={()=>console.log("Butoni eshte klikuar",count++)}
      >
       

      </Button>

      <Text style={styles.textStyle}>List of Students</Text>
      <FlatList
        data={students}

       

        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.textStyle}>
            {item.name} {item.surname} — Age {item.age}
          </Text>
        )}
      />
       <TouchablaOpticy

        style={style.touchablebtn}
        onPress={()=>console.log("butoni eshte klikuar nga touchable",count++)}
       >

        <Text style={style.btnText}>Click me</Text>
        </TouchablaOpticy>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    marginVertical: 5,
  },
  btnText:{
    color:"white",
    textAling:"center";
    fontSize:25,
    fontWeight:"bold"
  },
  touchablebtn:{
    backgroundColor:"purple",
    marginVertical:15,
    paddingVertical:20,
    borderRadius:6,
    marginHorizontal:20,
  }
});

export default ListScreen;
