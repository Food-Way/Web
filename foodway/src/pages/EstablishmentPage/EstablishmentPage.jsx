
import api, { api_maps } from "../../services/api.js";
import { HandleFormModal } from "../../components/Modal/Modal";
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import { ButtonSecondaryLink } from "../../components/Button/Button"
const Phone = "https://foodway.blob.core.windows.net/public/phone.png";
const BookMenu = "https://foodway.blob.core.windows.net/public/book-menu.png";
const Report = "https://foodway.blob.core.windows.net/public/report.png";
const Add = "https://foodway.blob.core.windows.net/public/adicionar.svg";
import { TextAreaFieldComment } from "../../components/InputField/InputField";
import { useEffect, useState } from "react";
import { useEffect } from "react";
import { api_call, api_maps_call } from "../../services/apiImpl";
import { Link, useParams } from "react-router-dom";
import ContentLoader from 'react-content-loader'
import {
  CommentIndividual,
  CommentReply,
} from "../../components/Comment/Comment.jsx";

import "./EstablishmentPage.css";

const EstablishmentPage = () => {
  const params = useParams();
  const idEstablishment = params.id;
  const [updateText, setUpdateText] = useState(false);
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState([]);
  const [comments, setComments] = useState([]);

  const ProfileHeaderLoader = () => (
    <ContentLoader className="establishment-banner-box"
      speed={2}
      width={1920}
      height={250}
      viewBox="0 0 1920 250"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="1920" height="250" />
    </ContentLoader>
  )

  const MapsLoader = () => (
    <ContentLoader
      speed={2}
      width={225}
      height={100}
      viewBox="0 0 225 100"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="225" height="100" />
    </ContentLoader>
  )

  const InfoLoader = () => (
    <ContentLoader style={{ borderRadius: "0.5rem" }}
      speed={2}
      width={230}
      height={30}
      viewBox="0 0 230 30"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="230" height="30" />
    </ContentLoader>
  )

  const CommentLoader = () => (
    <ContentLoader
      speed={2}
      width={768}
      height={422}
      viewBox="0 0 768 422"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="768" height="422" />
    </ContentLoader>
  )

  async function getEstablishmentProfileData() {
    const response = await api_call("get", `/establishments/profile/${idEstablishment}`, null, null);
    console.log(response);
    setProfile(response);
    setComments(response.comments);
    getMaps(response.lat, response.lng);
  }

  async function getMaps(lat, lng) {
    const response = await api_maps_call(lat, lng);
    console.log(response)
    setUrl(response);
  }

  function showFormAdd() {
    if (sessionStorage.getItem("token") !== null) {
      return (
        <HandleFormModal
          confirmText="Comentar"
          cancelText="Cancelar"
          lblCampo1="Título"
          lblCampo2="Assunto"
          lblCampo3="Avaliação"
          iptCampo2="productPrice"
          iptCampo1="productName"
          successTitle="Comentário criado!"
          content="Adicionar comentário"
          status={200}
          method="post"
          uri="comments"
          idCustomer={atob(sessionStorage.getItem("idUser"))}
          idEstablishment={idEstablishment}
        />
      );
    }
  }

  useEffect(() => {
    getEstablishmentProfileData();
  }, []);

  return (
    <>
      <div className="establishment-content-container">
        <section>
          {profile.length === 0 ? (
            <ProfileHeaderLoader />
          ) : (
            <div
              className="establishment-banner-box"
              style={{ backgroundImage: `url(${profile.profileHeaderImg})` }}
            >
              <div className="establishment-content-banner-box">
                <div className="establishment-title-box">
                  <h1 className="title-establishment">{profile.name}</h1>
                  <span>{profile.culinary}</span>
                  {location.pathname.endsWith(atob(sessionStorage.getItem("idUser"))) ? <ButtonSecondaryLink url="/establishment-edit" text={"Editar Perfil"} /> : ""}
                </div>

                <div className="establishment-avaliation-principal">
                  <div className="establishment-avaliation-value">
                    <span>Avaliação</span>
                    <span>{profile.generalRate.toFixed(1)}</span>
                  </div>
                  <div className="avaliation-general-points">
                    <AvaliationDashCard
                      rate={profile.foodRate}
                      color="red"
                      category="Comida"
                    />
                    <AvaliationDashCard
                      rate={profile.ambientRate}
                      color="red"
                      category="Ambiente"
                    />
                    <AvaliationDashCard
                      rate={profile.serviceRate}
                      color="red"
                      category="Atendimento"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section>
          <div className="establishment-global-container">
            <div className="establishment-addcomment-box">
              {
                sessionStorage.getItem("token") !== null ?
                  (
                    <div className="establishment-avaliation-box">
                      <img src={Add} alt="Add comment" />
                      {showFormAdd()}
                    </div>
                  ) : ""
              }
            </div>
            <div className="establishment-comments-info-container">
              <div
                className={
                  comments.length > 1
                    ? "establishment-comments-all-scroll"
                    : "establishment-comments-all"
                }
              >
                {comments.length === 0 ? (
                  <CommentLoader />
                ) : (
                  comments.length === 0 ? (
                    <span className="no-content">Nenhum comentário</span>
                  ) : (
                    comments.length == 1 ? (
                      <>
                        {comments.map(
                          (item) => (
                            console.log(item),
                            (
                              <CommentIndividual
                                establishmentName={item.establishmentName}
                                rate={item.commentRate}
                                title={item.title}
                                comment={item.comment}
                                upvotes={item.upvotes}
                                idComment={item.idComment}
                                userPhoto={item.userPhoto}
                              />
                            )
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {comments.map((commentParent) => (
                          <div className="establishment-comments-box-more">
                            <>
                              <CommentIndividual
                                establishmentName={commentParent.establishmentName}
                                rate={commentParent.commentRate}
                                title={commentParent.title}
                                comment={commentParent.comment}
                                upvotes={commentParent.upvotes}
                                idComment={commentParent.idComment}
                                idCustomer={atob(sessionStorage.getItem("idUser"))}
                                idEstablishment={idEstablishment}
                                userPhoto={commentParent.userPhoto}
                              />
                              <div
                                className={
                                  commentParent.childComments.length > 1
                                    ? "scroll-comments"
                                    : "establishment-more-box"
                                }
                              >
                                {commentParent.childComments.map((commentReply) => (
                                  <CommentReply
                                    establishmentName={
                                      commentReply.establishmentName
                                    }
                                    rate={commentReply.commentRate}
                                    title={commentReply.title}
                                    upvotes={commentReply.upvotes}
                                    comment={commentReply.comment}
                                    idComment={commentReply.idComment}
                                    idCustomer={atob(
                                      sessionStorage.getItem("idUser")
                                    )}
                                    idEstablishment={idEstablishment}
                                    userPhoto={commentReply.userPhoto}
                                  />
                                ))}
                              </div>
                            </>
                          </div>
                        ))}
                      </>
                    )
                  )
                )}
              </div>
              <div className="establishment-side-box">
                <div className="establishment-general-box">
                  {profile.length === 0 ? (
                    <InfoLoader />
                  ) : (
                    <div className="establishment-value-box">
                      <span className="establishment-info-value">
                        {profile.qtdComments}
                      </span>
                      <span>Comentários</span>
                    </div>
                  )}
                  {profile.length === 0 ? (
                    <InfoLoader />
                  ) : (
                    <div className="establishment-value-box">
                      <span className="establishment-info-value">
                        {profile.qtdUpvotes}
                      </span>
                      <span>UpVotes</span>
                    </div>
                  )}
                  {profile.length === 0 ? (
                    <InfoLoader />
                  ) : (
                    <div className="establishment-value-box">
                      <span className="establishment-info-value">
                        {profile.qtdRates}
                      </span>
                      <span>Avaliações</span>
                    </div>
                  )}
                </div>
                <div className="establishment-btns-box">
                  <Link
                    to={`/establishment-menu/${idEstablishment}`}
                    className="linkItem"
                  >
                    <div className="establishment-menu-btn">
                      <img src={BookMenu} alt="Book" />
                      <span>Cardápio</span>
                    </div>
                  </Link>
                  <div className="establishment-contact-btn">
                    <img src={Phone} alt="Phone" />
                    <span>Contato</span>
                  </div>
                </div>
                <div className="establishment-location-box">
                  <span className="establishment-location-title">
                    Localização
                  </span>
                  <div className="establishment-map-box">
                    {url.length === 0 ? (
                      <MapsLoader />
                    ) : (
                      <img src={url} alt="" />
                    )}
                  </div>
                </div>
                <div className="establishment-report-box">
                  <img src={Report} alt="" />
                  <span>Reportar</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EstablishmentPage;
