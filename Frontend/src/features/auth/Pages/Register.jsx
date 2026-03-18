import React from 'react'

const Register = () => {
  return (
      <div className='registerPage min-h-screen flex justify-center items-center'>
        <input type="text" placeholder='username' />
        <input type="text" placeholder='email' />
        <input type="password" placeholder='password' />
        <button type="submit">Submit</button>
    </div>
  )
}

export default Register
