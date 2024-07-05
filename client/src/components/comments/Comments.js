import React, { useContext, useState } from "react";
import "./comment.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import moment from "moment";

export const Comments = ({ postId }) => {
  const [desc,setDesc]=useState("")
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(
    ["comments"],
    async () =>
      await makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      })
  );
   const queryClient = useQueryClient();

   const mutation = useMutation(
     (newComment) => {
       return makeRequest.post("/comments", newComment);
     },
     {
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries(["comments"]);
       },
     }
   );

   const handleClick = async (e) => {
     e.preventDefault();
    
    
     mutation.mutate({ desc,postId });
     setDesc("");
    
   };

  //Temporary

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>

      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((comment) => {
            return (
              <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                  <span>{comment.name}</span>
                  <p>{comment.desc}</p>
                </div>
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
            );
          })}
    </div>
  );
};
