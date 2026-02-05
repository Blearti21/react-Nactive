import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ios from "../screens/Ios";

const Stack = createStackNavigator();

const IosStackNavigator=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="ios"
                component={Ios}
                options={
                    {
                        headerStyle:{
                            backgroundColor:"#2f3b52"
                        },
                        headerTintColor:"#fff"
                    }
                }
            >
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default IosStackNavigator;