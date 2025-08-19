import chalk from 'chalk'
import  { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useGetConversations = () => {
    const [loading,setLoading] = useState(false)
    const [conversation , setConversation] = useState([])   

    useEffect(()=>{
        const getConversation = async ()=>{
            setLoading(true)
            try {

                const storedData = localStorage.getItem('chatUser');
                if(!storedData) throw new Error("No User Logged in ")

                const token = JSON.parse(storedData).token
                console.log('Token: ',token)
                if(!token) throw new Error("No Token found")

                const res = await fetch('http://localhost:8000/api/users/',{
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                })
                console.log('Response status:', res.status);

                const data = await res.json();
                    console.log('Response data:', data);
                if(data.error){
                    throw new Error(data.error)
                }
                setConversation(data)

            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false);
            }
        }

        getConversation()
    },[])
  return {loading, conversation}
}

export default useGetConversations



// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const useGetConversations = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [conversations, setConversations] = useState([]);

// 	useEffect(() => {
// 		const getConversations = async () => {
// 			setLoading(true);
// 			try {
// 				const res = await fetch("http://localhost:8000/api/users/");
// 				const data = await res.json();
// 				if (data.error) {
// 					throw new Error(data.error);
// 				}
// 				setConversations(data);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		getConversations();
// 	}, []);

// 	return { loading, conversations };
// };
// export default useGetConversations;