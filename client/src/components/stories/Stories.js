import React, { useContext, useState } from 'react'
import "./stories.scss"
import {AuthContext} from "../../context/authContext.js"
import { makeRequest } from '../../axios.js';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
   const queryClient = useQueryClient();
 const { isLoading, error, data } = useQuery(
   ["stories"],
   async () =>
     await makeRequest.get("/stories").then((res) => {
       return res.data;
     })
 );
   const mutation = useMutation(
     (newStory) => {
       return makeRequest.post("/stories", newStory);
     },
     {
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries(["stories"]);
       },
     }
   );
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({  img: imgUrl });
    setFile(null);
  };
   
    return (
      <div className="Stories">
        <div className="story">
          <img src={file?URL.createObjectURL(file): "/upload/" + currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button onClick={handleClick}>+</button>
          <div className="file">
            <label htmlFor="storyImg">
              <CloudUploadIcon className="icon" />
            </label>
            <input
              type="file"
              id="storyImg"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
        {isLoading?"loading" :data.map((story) => {
          return (
            <div className="story" key={story.id}>
              <img src={"/upload/"+story.img} alt="" />
              <span>{story.name}</span>
            </div>
          );
        })}
      </div>
    );
}
