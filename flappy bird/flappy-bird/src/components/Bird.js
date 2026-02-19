import React from "react";
import View from "react-native";

const Bird =(birdBottom)=>{
    return(
        <View
        style={{
            position:"absolute",
            height:50,
            width:50,
            backgroundColor:"blue",
            left:100,
            bottom:birdBottom


        }}>

        </View>

    )

}
export default Bird;