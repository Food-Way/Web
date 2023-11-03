import React from "react";
import Banner from "../../../public/capa.png"
import Comment from "../../components/Comment/Comment";
import HomeCardEstablishment from "../../components/HomeCardEstablishment/HomeCardEstablishment";
import RateCard from "../../components/RateCard/RateCard";
import ProfilePhoto from "../../../public/foto-foto-de-perfil.png"
import {ButtonSecondary} from "../../components/Button/Button"

import "./MyUserProfile.css";

const MyUserProfile = () => {
  return (
    <>
      <div className="my-user-profile-container">
        <div>
          {/* menu */}
        </div>
        <div className="profile">
          <section>
            <img src={Banner} alt="" />
            <div className="user-info-container">
              <div className="user-info-box">
                <div className="user-info-left">
                  {/* <img src={ProfilePhoto} alt="" /> */}
                  <span className="profile-username">Bruna Ballerini</span>
                  <span className="profile-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, consequatur ullam! Doloribus enim architecto consectetur hic ex. Iusto velit maiores quos magnam nesciunt obcaecati alias qui vitae incidunt, nihil animi?</span>
                  {/* <ButtonSecondary text={"Editar Perfil"}/> */}
                </div>
                <div className="user-info-right">
                  <RateCard />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="last-comment-container">
              <span className="profile-title">Últimas avaliações</span>
              <div className="last-comment-box">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
              </div>
            </div>
          </section>
          <section>
            {/* <div className="all-container"> */}
            <div className="fav-estabs-container">
              <span className="profile-title">Restaurantes favoritos</span>
              <div className="fav-estabs-box">
                <HomeCardEstablishment
                  establishment="Chi Fu"
                  category="Japônes"
                  image="https://media.discordapp.net/attachments/1019746001331961939/1169723905053835285/Cantor_deleta_seu_TikTok_por_dancar_Loli_God_Requiem_1133x637.png?ex=65567147&is=6543fc47&hm=9b7c3676b01b7eaeb925d5336f18dbf5ac850ba9fe379f4b7d9034289e77871b&=&width=831&height=468"
                  rattingNumber={4.6}
                />
                <HomeCardEstablishment
                  establishment="Chi Fu"
                  category="Japônes"
                  image="https://media.discordapp.net/attachments/1019746001331961939/1169723905053835285/Cantor_deleta_seu_TikTok_por_dancar_Loli_God_Requiem_1133x637.png?ex=65567147&is=6543fc47&hm=9b7c3676b01b7eaeb925d5336f18dbf5ac850ba9fe379f4b7d9034289e77871b&=&width=831&height=468"
                  rattingNumber={4.6}
                />
                <HomeCardEstablishment
                  establishment="Chi Fu"
                  category="Japônes"
                  image="https://media.discordapp.net/attachments/1019746001331961939/1169723905053835285/Cantor_deleta_seu_TikTok_por_dancar_Loli_God_Requiem_1133x637.png?ex=65567147&is=6543fc47&hm=9b7c3676b01b7eaeb925d5336f18dbf5ac850ba9fe379f4b7d9034289e77871b&=&width=831&height=468"
                  rattingNumber={4.6}
                />
                <HomeCardEstablishment
                  establishment="Chi Fu"
                  category="Japônes"
                  image="https://media.discordapp.net/attachments/1019746001331961939/1169723905053835285/Cantor_deleta_seu_TikTok_por_dancar_Loli_God_Requiem_1133x637.png?ex=65567147&is=6543fc47&hm=9b7c3676b01b7eaeb925d5336f18dbf5ac850ba9fe379f4b7d9034289e77871b&=&width=831&height=468"
                  rattingNumber={4.6}
                />
              </div>
            </div>
            {/* </div> */}
          </section>
        </div>
      </div>
    </>
  )
}

export default MyUserProfile;