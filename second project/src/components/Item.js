import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
}from "react-native";

const Item = ({item})=>{
    return(
        <View style={style.cardContainer}>
            <Image source={{uri:item.image}}
                     style={style.img}
            
            ></Image>
                <View style={style.textContainer}>
                    <Text style={style.name}>{item.name}</Text>
                    <Text style={style.category}>{item.category}</Text>
                    <Text style={style.desc}>{item.description}</Text>
                    <Text style={style.price}>{item.price}</Text>

                </View>

        </View>
    )
}

const style = StyleSheet.create({
    cardContainer:{
        flexDirection:'row',
        backgroundColor:'#FFF',
        borderRadius:8,
        marginBottom:18,
        padding:8
    },
    img:{
        width:100,
        height:100,
        borderRadius:0
    },
    textContainer:{
        paddingHorizontal:10,
        flex:1
    },
    name:{
        fontSize:16,
        fontWeight:'bold'
    },
    category:{
        color:'#2bbdff'
    },
    desc:{
        fontSize:12,
        marginVertical:5
    },
    price:{
        backgroundColor:'#2bbdff',
        color:'#fff',
        alignSelf:'flex-start',
        paddingHorizontal:10,
        borderRadius:12
    }




})