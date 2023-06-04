import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
const CreatePost = () => {
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const initialValues = {
    title: "",
    postText: "",
  }
  useEffect(() => {
    if (!authState.status) {
      navigate("/login")
    }
  }, [])

  const onSubmit = async (data) => {

    await axios.post("http://localhost:3001/posts", data,{headers:{accessToken:localStorage.getItem("accessToken")}},).then((response) => {
      console.log("Its works")
      alert("Data submitted Successfully")
      navigate("/home")
    })
    // console.log(data)
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    postText: Yup.string().required("Post is the required field"),
    
  })
  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
     
        <Form className='formContainer'>
          <label>Title:</label>
          <ErrorMessage name='title' component='span' />
          <Field id='inputCreatePost' name='title' placeholder='Title of poem' autoComplete="off" />
          <label>Post:</label>
          <ErrorMessage name='postText' component='span' />
          <Field style={{height:'200px'}} id='inputCreatePost' name='postText' placeholder='Write poem here' autoComplete="off" />
          
          <button type='submit' >Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost