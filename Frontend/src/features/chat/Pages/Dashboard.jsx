import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js';
import { useEffect, useState } from 'react';
import { RiSendPlane2Line } from "@remixicon/react";

const Dashboard = () => {
  const chat = useChat()

  useEffect(() => {
    chat.initializeSocketConnection()

    async function getChats(params) {
      await chat.handleGetChats()
      
    }
    getChats()
  }, [])


  const [chatInput, setChatInput] = useState('')
  const [userMessage, setUserMessage] = useState('')

  const chats = useSelector(state => state.chat.chats)
  console.log(chats);

  const currentChatId = useSelector(state => state.chat.currentChatId)

  const auth = useSelector(state => state.auth)

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  return (
    <main className='min-h-screen w-full bg-[#212121] p-3 text-white md:p-5 font-sans'>
      <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border border-amber-500  p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none'>
        <aside className='hidden h-full w-72 shrink-0  border border-transparent border-r-gray-600/30  bg-transparent p-4 md:flex md:flex-col'>
          <h1 className='mb-5 text-4xl font-semibold  text-orange-600 text-shadow text-shadow-amber-50'>PerpX</h1>

          <div className='space-y-2'>
            { Object.values(chats).map((chat,index) => (
              <button
                onClick={()=>{openChat(chat.id)}}
                key={index}
                type='button'
                className='w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white'
              >
                {chat.title}
              </button>
            ))}
          </div>
        </aside>

        <section className='relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4'>

          <div className='messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30 border-orange-500'>
            {chats[currentChatId]? chats[currentChatId].messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${message.role === 'user'
                  ? 'ml-auto rounded-br-none bg-white/12 text-white'
                  : 'mr-auto border border-white/25 bg-[#0f1626] text-white/90'
                  }`}
              >
                <p>{message.content}</p>
              </div>
            )) :
            <div>hey its me</div>
            }
          </div>

          <footer className='rounded-3xl w-full absolute bottom-0'>
            <form onSubmit={handleSubmitMessage} className='flex w-[80%]  py-2 px-3 justify-center rounded-2xl bg-black/30 flex-col gap-3 md:flex-row'>
              <input
                type='text'
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder={`What's on your mind?`}
                className='w-full  bg-transparent px-4 py-2 text-lg text-white outline-none transition placeholder:text-white/45 placeholder:text-sm focus:border-orange-300'
              />
              <button
                type='submit'
                disabled={!chatInput.trim()}
                className='flex justify-center items-center rounded-[50%] aspect-square h-11 text-lg w-fit bg-orange-500 text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none'
              >
                <RiSendPlane2Line />
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard
