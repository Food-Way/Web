import React, { useEffect, useState } from "react";
import Banner from "../../../public/capa.png"
import Comment from "../../components/Comment/Comment";
import HomeCardEstablishment from "../../components/HomeCardEstablishment/HomeCardEstablishment";
import RateCard from "../../components/RateCard/RateCard";
import DefaultImage from "../../../public/default-user-image.png";
import { ButtonSecondary } from "../../components/Button/Button"
import api from "../../services/api";

import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [establishments, setEstablishments] = useState([]);

  function getUser() {

    const idUser = atob(sessionStorage.getItem("idUser"));
    console.log("idUser: ", idUser);

    const response = api.get(`/customers/profile/${idUser}`, {
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
        }
      })
      .catch((erro) => console.log(erro));

  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
    <div className="profile-container">
      <div>
        {/* menu */}
      </div>
      <div className="profile">
        <section>
          <img src={Banner} alt="" />
          <div className="user-info-container">
            <div className="user-info-box">
              <div className="user-info-left">
                <img className="profile-photo" src={user.profilePhoto === "" ? DefaultImage : user.profilePhoto} alt="" />
                <span className="profile-username">{user.name}</span>
                <span className="profile-description">{user.bio}</span>
                {sessionStorage.getItem("my-profile") === atob("true") ? <ButtonSecondary text={"Editar Perfil"} /> : ""}
              </div>
              <div className="user-info-right">
                <RateCard
                  xp={user.xp}
                  level={user.level}
                  profileRate={user.profileRate}
                  qtdComments={user.qtdComments}
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="last-comment-container">
            <span className="profile-title">Últimas avaliações</span>
            <div className="last-comment-box">
              {comments.map((item) => (
                <Comment
                  establishmentName={item.establishmentName}
                  rate={item.commentRate}
                  title={item.title}
                  comment={item.comment}
                />
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="fav-estabs-container">
            <span className="profile-title">Restaurantes favoritos</span>
            <div className="fav-estabs-box">
              {establishments.map((item) => (
                <HomeCardEstablishment
                  establishment={item.establishmentName}
                  category={item.culinary}
                  image="https://media.discordapp.net/attachments/1019746001331961939/1169723905053835285/Cantor_deleta_seu_TikTok_por_dancar_Loli_God_Requiem_1133x637.png?ex=65567147&is=6543fc47&hm=9b7c3676b01b7eaeb925d5336f18dbf5ac850ba9fe379f4b7d9034289e77871b&=&width=831&height=468"
                  rattingNumber={item.establishmentRate}
                />
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