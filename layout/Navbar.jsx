import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Key, useContext } from 'react';
import MenuContext from '../context/MenuContext';
import { useDispatch } from 'react-redux';
import { updatePage } from '../store/GeneralSlice';

const Navbar = () => {
    const { currentMenu, changeCurrentMenu, menu } = useContext(MenuContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return (
    <View style={{
        backgroundColor: 'blue',
        height: '100%',
        minHeight:500,
        width:'20%',
        maxWidth:100
        }}>
        {menu.map((item, index)=>(
            <TouchableOpacity
                key={index}
                style={{width:'100%', height:50, backgroundColor: currentMenu.name === item.name ? 'red' : 'blue',justifyContent:'center', alignItems:'center'}}
                onPress={() =>
                    {
                        changeCurrentMenu({
                            name: item.name,
                            params:item.params
                        })
                        navigation.navigate(item.name, item.params)
                        dispatch(updatePage(item.name))
                    }
                }
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        ))}
    </View>
    )
}

export default Navbar