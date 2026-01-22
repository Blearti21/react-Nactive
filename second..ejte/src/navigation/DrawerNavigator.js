import react from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";


const Drawer =createDrawerNavigator();


const DrawerNavigator = ()=>{
    return(
        <Drawer.Navigator>
            <Drawer.Screen
            name="Home"
            component={BottomTabNavigator}
            ></Drawer.Screen>

            <Drawer.Screen
            name="About"
            component={AboutStackNavigator}
            ></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
