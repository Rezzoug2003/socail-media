import React, { useContext, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import "./post.scss";
import moment from "moment";
import { Comments } from "../comments/Comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
export const Post = ({ post }) => {
  const [OpenOrCloseComment, setOpenOrCloseComment] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(
    ["likes", post.id],
    async () =>
      await makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      })
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (likes) => {
      if (likes) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const handleClick = async (e) => {
    e.preventDefault();

    mutation.mutate(data.includes(currentUser.id));
  };
  const deleteMutation = useMutation((postId)=>
    
{       return makeRequest.delete("/posts/" +postId);
} ,   
    
   {   onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },}
    
  );
  const handleDelete = (e) => {
    e.preventDefault();
    deleteMutation.mutate(post.id);
  }
 
  return (
    <div className="post">
      {isLoading ? (
        "loading"
      ) : (
        <div className="container">
          <div className="user">
            <div className="userInfo">
              <img src={"/upload/" + post.profilePic} alt="" />
              <div className="details">
                <Link
                  to={`/profile/${post.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <span span className="name">
                    {post.name}
                  </span>
                </Link>
                <span className="date">{moment(post.createdAt).fromNow()}</span>
              </div>
            </div>
            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && post.userId === currentUser.id && (
              <button onClick={handleDelete}>delete</button>
            )}
          </div>
          <div className="content">
            <p>{post.desc}</p>
            <img src={"/upload/" + post.img} alt="" />
          </div>
          <div className="info">
            <div className="item">
              {isLoading ? (
                "loading"
              ) : data.includes(currentUser.id) ? (
                <FavoriteOutlinedIcon onClick={handleClick} />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={handleClick} />
              )}
              {data.length} Likes
            </div>
            <div className="item">
              <TextsmsOutlinedIcon
                onClick={() => {
                  setOpenOrCloseComment(!OpenOrCloseComment);
                }}
              />
              12 Comments
            </div>
            <div className="item">
              <ShareOutlinedIcon />
              Share
            </div>
          </div>
          {OpenOrCloseComment && <Comments postId={post.id} />}
        </div>
      )}
    </div>
  );
};
