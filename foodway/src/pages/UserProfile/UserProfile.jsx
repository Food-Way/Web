import React, { useEffect, useRef, useState } from "react";
import Banner from "../../../public/capa.png"
import { Comment } from "../../components/Comment/Comment";
import HomeCardEstablishment from "../../components/HomeCardEstablishment/HomeCardEstablishment";
import RateCard from "../../components/RateCard/RateCard";
import DefaultImage from "../../../public/default-user-image.png";
import { ButtonSecondary } from "../../components/Button/Button"
import api from "../../services/api";
import ContentLoader from 'react-content-loader'


import "./UserProfile.css";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState([]);
  const profileDescriptionRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [establishments, setEstablishments] = useState([]);

  const MyLoader = () => (
    <ContentLoader
      speed={2}
      width={1105}
      height={451}
      viewBox="0 0 1105 451"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="12" y="309" rx="2" ry="2" width="400" height="212" />
      <rect x="407" y="323" rx="2" ry="2" width="400" height="212" />
    </ContentLoader>
  )

  function getUser() {
    const idUser = atob(sessionStorage.getItem("idUser"));
    console.log("idUser: ", idUser);

    const response = api.get(`/customers/profile/${id}`, {
      headers: {
        Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setComments(response.data.comments);
          setEstablishments(response.data.establishmentDTOs);
          console.log("response: ", response.data);
          console.log("user: ", user);
          console.log("comments: ", comments);
          console.log("establishments: ", establishments);
          firstAndEnd(response.data.name);
        }
      })
      .catch((erro) => console.log(erro));
  }

  function firstAndEnd(nameUser) {
    console.log(nameUser);
    var nameUserDiv = document.querySelector(".profile-username");
    let words = nameUser.split(' ');
    let firstWord = words[0];
    let endWord = words[words.length - 1];
    console.log([firstWord + " " + endWord]);
    nameUserDiv.innerHTML = `${[firstWord + " " + endWord]}`;
  }

  const scrollToBottomAndBack = () => {
    if (profileDescriptionRef.current) {
      const targetScroll = profileDescriptionRef.current.scrollHeight;

      const duration = 20000;
      let startTime;

      const scrollAnimation = (timestamp) => {
        if (!startTime) startTime = timestamp;

        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        profileDescriptionRef.current.scrollTop = targetScroll * percentage;

        if (progress < duration) {
          requestAnimationFrame(scrollAnimation);
        }
      };

      requestAnimationFrame(scrollAnimation);
    }
  };

  function showDescription(bio) {
    if (bio.length > 30) {
      return (
        <span className="profile-description" ref={profileDescriptionRef}>
          {bio}
        </span>
      )
    } else {
      return (
        <span className="profile-description description-scroll" ref={profileDescriptionRef}>
          {bio}
        </span>
      )
    }
  }

  useEffect(() => {
    getUser();
    scrollToBottomAndBack();
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile">
          <section>
            <img className="user-banner" src={user.profileHeaderImg} alt="" />
            <div className="user-info-container">
              <div className="user-info-box">
                <div className="user-info-left">
                  <img className="profile-photo" src={user.profilePhoto} alt="" />
                  <span className="profile-username"></span>
                  {/* {(() => showDescription(user.bio))()} */}
                  {sessionStorage.getItem("my-profile") === atob(true) ? <ButtonSecondary text={"Editar Perfil"} /> : ""}
                </div>
                <div className="user-info-right">
                  <RateCard
                    xp={user.xp}
                    level={user.level}
                    profileRate={user.profileRate}
                    qtdComments={user.qtdComments}
                    qtdUpvotes={user.qtdUpvotes}
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="last-comment-container">
              <span className="profile-title">Últimas avaliações</span>
              <div className="last-comment-box">
                {/* <MyLoader /> */}
                {comments.map((item) => (
                  <>
                    <Comment
                      establishmentName={item.establishmentName}
                      rate={item.commentRate}
                      title={item.title}
                      comment={item.comment}
                      upvotes={item.upvotes}
                    />
                  </>
                ))}
              </div>
            </div>
          </section>
          <section>
            <div className="fav-estabs-container">
              <span className="profile-title">Restaurantes favoritos</span>
              <div className="fav-estabs-box">
                {establishments.map((item) => (
                  <>
                    <HomeCardEstablishment
                      establishment={item.establishmentName}
                      category={item.culinary[0].name}
                      image={item.photo}
                      rattingNumber={item.establishmentRate}
                    />
                  </>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default UserProfile;