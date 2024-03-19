import React, { useEffect, useRef, useState } from "react";
import { Comment } from "../../components/Comment/Comment";
import HomeCardEstablishment from "../../components/HomeCardEstablishment/HomeCardEstablishment";
import RateCard from "../../components/RateCard/RateCard";
import { ButtonSecondaryLink } from "../../components/Button/Button"
import api_call from "../../services/apiImpl";
import ContentLoader from 'react-content-loader';
import { useParams } from "react-router-dom";

import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const profileDescriptionRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const params = useParams();
  const idUser = params.id;

  const ProfileHeaderLoader = () => (
    <ContentLoader
      speed={2}
      width={2304}
      height={291}
      viewBox="0 0 2304 291"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="2304" height="291" />
    </ContentLoader>
  )

  const ProfilePhotoLoader = () => (
    <ContentLoader style={{ position: "absolute", top: "15rem", left: "50rem" }}
      speed={2}
      width={300}
      height={265}
      viewBox="0 0 300 265"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <circle cx="144" cy="125" r="125" />
    </ContentLoader>
  )

  const ProfileStatusLoader = () => (
    <ContentLoader
      speed={2}
      width={490}
      height={102}
      viewBox="0 0 490 102"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="490" height="102" />
    </ContentLoader>
  )

  const CommentLoader = () => (
    <ContentLoader
      speed={2}
      width={1244}
      height={515}
      viewBox="0 0 1244 515"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="4" y="-42" rx="0" ry="0" width="500" height="250" />
      <rect x="4" y="239" rx="0" ry="0" width="500" height="250" />
      <rect x="537" y="238" rx="0" ry="0" width="500" height="250" />
      <rect x="532" y="-42" rx="0" ry="0" width="500" height="250" />
    </ContentLoader>
  )

  const FavEstablishmentsLoader = () => (
    <ContentLoader
      speed={2}
      width={2764}
      height={280}
      viewBox="0 0 2764 280"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="2" y="13" rx="0" ry="0" width="250" height="250" />
      <rect x="266" y="15" rx="0" ry="0" width="250" height="250" />
      <rect x="530" y="14" rx="0" ry="0" width="250" height="250" />
      <rect x="794" y="13" rx="0" ry="0" width="250" height="250" />
    </ContentLoader>
  )

  async function getUser() {
    const response = await api_call("get", `customers/profile/${idUser}`, null, atob(sessionStorage.getItem("token")))
    console.log(response.data)
    setUser(response.data);
    setComments(response.data.comments);
    firstAndEnd(response.data.name);
    setEstablishments(response.data.establishmentDTOs);
  }


  function firstAndEnd(nameUser) {
    // console.log(nameUser);
    var nameUserDiv = document.querySelector(".profile-username");
    let words = nameUser.split(' ');
    let firstWord = words[0];
    let endWord = words[words.length - 1];
    // console.log([firstWord + " " + endWord]);
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
    var html = document.querySelector('html');
    html.style.overflowY = 'auto';
    getUser();
    scrollToBottomAndBack();
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile">
          <section>
            {user === undefined || user.length === 0 ? (
              <ProfileHeaderLoader />
            ) : (
              <img className="user-banner" src={user.profileHeaderImg} alt="Foto de capa" />
            )}
            <div className="user-info-container">
              <div className="user-info-box">
                <div className="user-info-left">
                  {user === undefined || user.length === 0 ? (
                    <ProfilePhotoLoader />
                  ) : (
                    <img className="profile-photo" src={user.profilePhoto} alt="Foto de perfil" />
                  )}
                  <span className="profile-username"></span>
                  {location.pathname.endsWith(idUser) ? <ButtonSecondaryLink url="/user-profile-edit" text={"Editar Perfil"} width={"11vw"} /> : ""}
                </div>
                {user === undefined || user.length === 0 ? (
                  <ProfileStatusLoader />
                ) : (
                  <div className="user-info-right">
                    <RateCard
                      xp={user.xp}
                      level={user.level}
                      profileRate={user.profileRate}
                      qtdComments={user.qtdComments}
                      upvotes={user.qtdUpvotes}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="last-comment-container">
              <span className="profile-title">Últimas avaliações</span>
              <div className="last-comment-box">
                {comments === undefined || comments.length === 0 ? (
                  <CommentLoader />
                ) : (
                  comments === undefined || comments.length === 0 ? (
                    <span className="no-content">Nenhuma avaliação</span>
                  ) : (
                    comments.map((item, index) => (
                      <Comment
                        key={index}
                        establishmentName={item.establishmentName}
                        rate={item.commentRate}
                        title={item.title}
                        comment={item.comment}
                        upvotes={item.upvotes}
                      />
                    ))
                  )
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="fav-estabs-container">
              <span className="profile-title">Restaurantes favoritos</span>
              <div className="fav-estabs-box">
                {establishments === undefined || establishments.length === 0 ? (
                  <FavEstablishmentsLoader />
                ) : (
                  establishments === undefined || establishments.length === 0 ? (
                    <span className="no-content">Nenhum restaurante favorito</span>
                  ) : (
                    establishments.map((item, index) => (
                      <HomeCardEstablishment
                        key={index}
                        establishment={item.establishmentName}
                        category={item.culinary[0].name}
                        image={item.photo}
                        rattingNumber={item.establishmentRate}
                      />
                    ))
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default UserProfile;