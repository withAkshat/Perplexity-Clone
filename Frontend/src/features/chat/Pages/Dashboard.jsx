import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js';
import { useEffect } from 'react';

const Dashboard = () => {

  const chat = useChat()


  const auth = useSelector(state => state.auth)
  console.log(auth);

  useEffect(()=>{
    chat.initializeSocketConnection()
  },[])

  return (
    <div>
      hi i am dashboard
    </div>
  )
}

export default Dashboard
