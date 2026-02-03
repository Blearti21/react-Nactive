import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button ,Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper"

import Item from "../components/Item";
import data from "../data/data.json";
import { FlatList } from "react-native-web";

const Home = () => {

  const[products,setProducts]=useState([]);

  useEffect(()=>{
    setProducts(data.popularproducts);
  },[])


  return (

    <FlatList
     ListHeaderComponent={
      style={styles.swiper}
      showsPagination
      dotColor="#999"
      activeDotColor="#007AFF"

     }
    >
    <View style={styles.container}>
      <Swiper
      style={styles.swiper}
      showsPagination
      dotColor="#999"
      activeDotColor="#007AFF"
      >
        
          <View style={styles.slide}>
          <Image source={require("../../assets/favicon.png")}
          style={styles.slideImage}
          resizeMode="cover"
          >
          </Image>
          </View>

          <View style={styles.slide}>
          <Image source={require("../../assets/favicon.png")}
          style={styles.slideImage}
          resizeMode="cover"
          >
            </Image>
            </View>
 
          <View style={styles.slide}>
          <Image source={require("../../assets/favicon.png")}
          style={styles.slideImage}
          resizeMode="cover"
          >

          </Image>
          </View>
       
        

      </Swiper>
      </View>

      </FlatList>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
  },
  swiper:{
    flex:1
  },
  slide:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f5f5f5"
  },
  slideImage:{
    width:"90%",
    height:"90%",
    borderRadius:10,
  }

});

export default Home;
