import React from "react";
import "./posts.scss";
import { Post } from "../post/Post";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
export const Posts = ({ userId }) => {
  //TEMPORARY
  const { isLoading, error, data } = useQuery(
    ["posts"],
    async () =>
      await makeRequest.get("/posts?userId="+userId).then((res) => {
        return res.data;
      })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};
