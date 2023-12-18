import { useState } from 'react'
import {useForm} from 'react-hook-form'
// import './App.css'


function App() {
  const {register, handleSubmit, 

    formState:{errors}
  } = useForm()

  const [fields, setFields] = useState()
  const [submit, setSubmit] = useState(false)

  const [visible,setVisible] = useState(false)

  const onSubmit = (data) => {
    setSubmit(true)
    setFields(data)
    console.log(data)
    // console.log(data.firstName.length)
  }

  console.log(errors)
  return (
    <>
      <h1>React forms library</h1>
      <div className='form'>
        <form onSubmit={ handleSubmit(onSubmit)}>
          {submit ? (
          <div className='success'>
            Registeration Successful
          </div>): null }
          <input 
            type="text" 
            required
            placeholder='firstName' 
            {...register("firstName",{ required: 'Name is required' })}
          />
          <span>{errors.firstName}</span>
          <input 
            type="text" 
            required
            placeholder='lastName' 
            {...register("lastName",{ required: 'Name is required' })}
          />
          <span>{errors.lastName}</span>
          <input
            type="text" 
            placeholder="email" 
            {...register("email", { required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email ID"
              }
            })}
          />
          <span>{errors.email?.message}</span>
          <div className='password'>
            <input 
              type={visible ? "text" : "password"} 
              placeholder="Password" 
              {...register("password", {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                maxLength: {
                  value: 20,
                  message: "Password must be less than 20 characters"
                }
              })}
            />
            <input type="checkbox"  onClick={() => setVisible(!visible)}/>
          </div>
         <span >{errors.password?.message}</span>
          <button className='register'>Register</button>
        </form>
        {submit &&(
          <div>
            <h2>Submitted Data:</h2>
            <p>First Name: {fields.firstName}</p>
            <p>Last Name: {fields.lastName}</p>
            <p>Email: {fields.email}</p>
            <p>Password: {fields.password}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
