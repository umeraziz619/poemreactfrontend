import React, { useEffect, useState, useContext } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../helpers/AuthContext";
const Post = () => {
  const { authState } = useContext(AuthContext);
  let { id } = useParams();
  const navigate = useNavigate();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setnewComment] = useState("");
  useEffect(() => {
    //eslint-disable-nextline
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    //eslint-disable-nextline
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        { commentBody: newComment, PostId: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert("First please login to add a comment");
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setnewComment("");
        }
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        // alert("Tokenn delted successfully")
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };
  const deltePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers:{ accessToken: localStorage.getItem("accessToken") },
      })
      .then(()=>{
        alert("Post delted successfully")
        navigate("/")
      });
  };
  return (
    <div className="postPage">
      <div className="leftSide" id="individual">
        <div className="leftContainer">
          <div className="title">{postObject.title}</div>
          <div className="postText">{postObject.postText}</div>
          <div className="footermanager">
            <div className="footer" style={{backgroundColor:'none',color:'white'}}> <span style={{color:'#f3f005',fontSize:'27px',}}>Posted by:</span>{postObject.username} </div>
            {authState.username === postObject.username && (
              <div>
                <DeleteIcon
                  fontSize="large"
                  onClick={()=>{deltePost(postObject.id)}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Coments...."
            value={newComment}
            autoComplete="off"
            onChange={(event) => {
              setnewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Post Comment</button>
        </div>
        <div className="listOfComments" style={{}}>
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <div>

                {comment.commentBody}
               
                </div>
                <div>

                {authState.username === comment.username && (
                  <>
                    <button style={{width:'50px',}} onClick={() => deleteComment(comment.id)}>X</button>
                    <span style={{display:'block'}}>{comment.username}</span>
                  </>
                )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
