import { createContext, useState } from 'react';

const MenuContext = createContext();

// Provider
export const MenuProvider = ({ children }) => {
    
    const [menu, setMenu] = useState([
        {
            name: 'Home',
            params: {
                name:'Now at Home'
            }
        },
        {
            name: 'Profile',
            params: {
                name:'Now at Profile'
            }
        },
    ]);
    const [currentMenu, setCurrentMenu] = useState({
        name:'Home',
        params: {
            name:'Now at Home'
        }
    });
    const changeCurrentMenu = (menu) => {
        setCurrentMenu(menu);
    }

    const addMenu = (menu) => {
        setMenu([...menu, menu]);
    }

    return (
        <MenuContext.Provider value={{ menu, currentMenu, addMenu, changeCurrentMenu }}>
            {children}
        </MenuContext.Provider>
    );
    }

export default MenuContext