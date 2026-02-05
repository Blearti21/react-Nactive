import react from "react";
import { View,Text,
    Stylesheet,Flatlist,ScrollView,TouchableOpacity
} from "react-native";

import data from "../data/data.json";
import data from "../components/Item";
import Item from "../components/Item";

class Ios extends React.Component{
    constructor(){
        super();
        this.state = {
            products:[],
        };
    }

    componentDidMount(){
        this.setState({
            products:data,
        })
    }

    render(){
        return(
            <ScrollView>
                <View style={style.container}>
                    <Text style={Stylesheet.desc}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry
                    </Text>
                </View>

                <View styles={style.productsContainer}>
                    <Flatlist
                    data={this.state.products.Ios}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item}) =><Item item={item}></Item>}
                    >

                    </Flatlist>
                </View>
                <TouchableOpacity>
                    <Text style={style.btnText}> View More</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default Ios

const style = Stylesheet.create({
    container:{
        padding:15,
    },
    desc:{
        marginBottom:15,
        fontSize:14,
    },
    productsContainer:{
        marginBottom:20
    },
    btn:{
        backgroundColor:"#2f3b52",
        padding:12,
        borderRadius:8,
        alihnItems:"center"
    },
    btnText:{
        color:"#fff"
    }
})