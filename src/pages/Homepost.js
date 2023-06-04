import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { AuthContext } from '../helpers/AuthContext'
const Homepost = () => {
    let navigate = useNavigate()
  const [listOfPosts, setListOfPosts] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/posts/homeposts").then((response) => {
      setListOfPosts(response.data)
      // console.log(response.data.likedPosts)
      console.log(response)
    })
  }, [])
  return (
    <div className='App'>
      {listOfPosts.map((value, index) => {
        return (
          <div key={index} className='post'  >
            <div className='title'>  {value.title} </div>
            <div onClick={() => { navigate(`/post/${value.id}`) }} className='body'>  {value.postText} </div>
            <div className='footer'>
             
              <div>
                <ThumbUpIcon className="unlikepost" fontSize='medium' onClick={() => {alert("Please login to Like a post")}} />
                {/* <button onClick={()=>{likeAPost(value.id)}}>Like</button> */}
                <label className='likesLength'>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Homepost