import { createContext, useState, startTransition, useEffect } from 'react';

const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
    
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const getUsers = async () => {
        const res = await fetch('http://localhost:8000/info', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'johndoe@example.com',
                password: 'password123'
            })
        });
        const data = await res.json();
        setUsers(data.data)
    }
    useEffect(() => {
        getUsers()
    }, [])
    const loginNow = (userNow)=>{
        setUser(userNow);
        setIsLogin(true)
        // localStorage.setItem('user', JSON.stringify(userNow));
    }
    const register = async (user)=>{
        try {
            const res = await fetch('http://localhost:8000/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if(res.ok){
                const data = await res.json();
                console.log(data, 'data');
                return {status: true, data: data.data};
            }else{
                return {status: false, data: null};
            }
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (user)=>{
        try {
            const res = await fetch('http://localhost:8000/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if(res.ok){
                loginNow(data.data)
                return {status: true, data: data.data};
            }else{
                return {status: false, data: null};
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const logoutNow = ()=>{
        setUser({});
        setIsLogin(false);
    }
    return (
        <UserContext.Provider value={{ users, user, register, login, isLogin, logoutNow }}>
            {children}
        </UserContext.Provider>
    );
    }

export default UserContext