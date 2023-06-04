import React,{useState, useContext, useEffect} from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'
// import "./App.css";
import { useNavigate} from 'react-router-dom';
const Mypost = () => {
    const navigate = useNavigate()
    const {authState} = useContext(AuthContext)
  const [listOfPosts, setListOfPosts] = useState([])
  const [likedPosts, setlikedPosts] = useState([])
  // * fetching from the local database
  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      navigate("/login")
    }
    axios.get("http://localhost:3001/posts/userpost",{
      headers: { accessToken: localStorage.getItem("accessToken") }
    }).then((response) => {
      setListOfPosts(response.data.listOfPosts)
      setlikedPosts(response.data.likedPosts.map((like)=>{
        return like.PostId
      }))
      // console.log(response.data.likedPosts)
    })
  }, [])
  const likeAPost = (postId) => {
    if(authState)
    axios.post("http://localhost:3001/likes", { PostId: postId }, {
      headers: { accessToken: localStorage.getItem("accessToken") }
    }).then((response) => {
      console.log(postId)
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.liked) {

            return { ...post, Likes: [...post.Likes, 0] }
          }
          else {
            const likedArry = post.Likes;
            likedArry.pop();
            return { ...post, Likes: likedArry }
          }
        }
        else {
          return post
        }
      }))
      if(likedPosts.includes(postId)){
        setlikedPosts(likedPosts.filter((id)=>{
           return id!==postId
        }))
      }
      else{
        setlikedPosts([...likedPosts,postId])
      }
    })
  }
  return (
    <div className='App'>
      {listOfPosts.map((value, index) => {
        return (
          <div key={index} className='post'  >
            <div className='title'>  {value.title} </div>
            <div onClick={() => { navigate(`/mypost/${value.id}`) }} className='body'>  {value.postText} </div>
            <div className='footer'>
              <div>
                {value.username}
              </div>
              <div>
                <ThumbUpIcon className={likedPosts.includes(value.id)?"likepost":"unlikepost"} fontSize='medium' onClick={() => { likeAPost(value.id) }} />
                <label className='likesLength'>{value.Likes.length}</label>
              </div>
            </div>
          </div>
            )
        })}
      </div>
  )
}

export default Mypost