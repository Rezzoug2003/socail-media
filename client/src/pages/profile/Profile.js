import React, { useContext, useState } from "react";
import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Posts } from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Update } from "../../components/update/Update";

export const Profile = () => {
  const [openUpdate,setOpenUpdate]=useState(false)
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(
    ["users"],
    async () =>
      await makeRequest.get(`/users/find/${id}`).then((res) => {
        return res.data;
      })
  );
    const { isLoading: rIsLoading, data: relationshipData } = useQuery(
      ["relationship"],
      () =>
        makeRequest
          .get("/relationships?followedUserId=" + id)
          .then((res) => {
            return res.data;
          })
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (relationships) => {
      if (relationships) return makeRequest.delete("/relationships?followedUserId=" + id);
      return makeRequest.post("/relationships", { followedUserId: id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );
  const handleClick = async (e) => {
    e.preventDefault();

    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  
  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data.coverPic} alt="" className="cover" />
            <img
              src={"/upload/" + data.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>

                {rIsLoading ? (
                  "Loading"
                ) : id == currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleClick}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={id} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};
