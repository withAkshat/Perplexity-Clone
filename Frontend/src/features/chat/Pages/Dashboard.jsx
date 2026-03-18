import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat';
import { useEffect } from 'react';

const Dashboard = () => {

  const chat = useChat()


  const auth = useSelector(state => state.auth)
  console.log(auth);

  useEffect(()=>{
    chat.initilizeSocketConnection()
  },[])

  return (
    <div>

    </div>
  )
}

export default Dashboard
