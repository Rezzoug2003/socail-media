import React, { useContext } from 'react'
import "./stories.scss"
import {AuthContext} from "../../context/authContext.js"

export const Stories = () => {
    const { currentUser } = useContext(AuthContext);
     const stories = [
       {
         id: 1,
         name: "John Doe",
         img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
       },
       {
         id: 2,
         name: "John Doe",
         img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
       },
       {
         id: 3,
         name: "John Doe",
         img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
       },
       {
         id: 4,
         name: "John Doe",
         img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
       },
     ];
    return (
      <div className="Stories">
        <div className="story">
          <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
        </div>
        {stories.map((story) => {
          return (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          );
        })}
      </div>
    );
}
