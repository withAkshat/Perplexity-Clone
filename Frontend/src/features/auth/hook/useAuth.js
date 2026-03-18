import { useDispatch } from "react-redux";
import { register, getMe, login } from "../Services/auth.api.js";
import { setError, setLoading, setUser } from "../auth.slice.js";

export  function useAuth(){
    const dispatch = useDispatch()

    async function handleRegister({email, user, password}) {

        try{
            
            dispatch(setLoading(true))
            const data = await register({email, username, password});
        }catch(err){

            dispatch(setError(err.response?.data?.message || "Registration failed!"))
        }finally{
            
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email, password}) {
        
        try{
            
            const data = await login({email, password})
            dispatch(setUser(data.user))
            
            dispatch(setLoading(true))
        }catch(err){

            dispatch(setError(err.response?.data?.message))
        }finally{

            dispatch(setLoading(false))
        }
    }
    
    async function handleGetMe() {
        
        try{
        
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(err){

            dispatch(setError(err.response?.data?.message))
        }finally{

            dispatch(setLoading(false))
        }
    }

    return { handleLogin, handleRegister, handleGetMe }
}