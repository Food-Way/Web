
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import Phone from "../../../public/phone.png";
import BookMenu from "../../../public/book-menu.png";
import Report from "../../../public/report.png";
import { useEffect, useState } from "react";
import { api_call } from "../../services/apiImpl";
import parseJWT from "../../util/parseJWT";
import { Link } from "react-router-dom";
import ContentLoader from 'react-content-loader'
import {
  CommentIndividual,
  CommentReply,
} from "../../components/Comment/Comment.jsx";
import "./EstablishmentPage.css";
import CommentInsert from "../../components/CommentInsert/CommentInsert.jsx";
import { ButtonSecondaryLink } from "../../components/Button/Button.jsx";

const EstablishmentPage = () => {
  const [url_maps, setUrlMaps] = useState("");
  const bodyToken = parseJWT();
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
      width={"40"}
      height={422}
      viewBox="0 0 40 422"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="768" height="422" />
    </ContentLoader>
  )

  const addCommentToState = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  async function getEstablishmentProfileData() {
    const response = await api_call("get", `/establishments/profile/${bodyToken.sub}`, null, null);
    setProfile(response.data);
    setComments(response.data.comments);
    setUrlMaps(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAKELgmqf4j5kRAdn9EKTC28cMao0sQvJE&q=${response.data.lat},${response.data.lng}&zoom=18&maptype=roadmap`)
  }

  useEffect(() => {
    getEstablishmentProfileData();

  }, []);

  return (
    <>
      <div className="establishment-content-container">
        <section>
          {profile.length === 0 ? <ProfileHeaderLoader /> : (
            <div
              className="establishment-banner-box"
              style={{ backgroundImage: `url(${profile.profileHeaderImg})` }}>
              <div className="establishment-content-banner-box">
                <div className="establishment-title-box">
                  <h1 className="title-establishment">{profile.name}</h1>
                  <span>{profile.culinary}</span>
                  {location.pathname.endsWith(bodyToken.sub) ? <ButtonSecondaryLink url="/establishment-edit" text={"Editar Perfil"} /> : ""}
                </div>
                <div className="establishment-avaliation-principal">
                  <div className="establishment-avaliation-value">
                    <span>Avaliação</span>
                    <span>{profile.generalRate.toFixed(1)}</span>
                  </div>
                  <div className="avaliation-general-points">
                    <AvaliationDashCard rate={profile.foodRate} color="red" category="Comida" />
                    <AvaliationDashCard rate={profile.ambientRate} color="red" category="Ambiente" />
                    <AvaliationDashCard rate={profile.serviceRate} color="red" category="Atendimento" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section>
          <div className="establishment-global-container">
            <div className="establishment-comments-info-container">
              <div
                className={comments.length > 1 ? "establishment-comments-all-scroll" : "establishment-comments-all"}>
                <div className="establishment-addcomment-box">
                  {sessionStorage.getItem("token") ? <CommentInsert establishmentId={bodyToken.sub} onCommentAdded={addCommentToState} /> : null}
                </div>
                {comments.length === 0 ? <CommentLoader /> : comments.map((commentParent, index) => (
                  <div className="establishment-comments-box-more" key={index}>
                    <CommentIndividual
                      key={commentParent.idComment}
                      establishmentName={commentParent.establishmentName}
                      rate={commentParent.commentRate}
                      title={commentParent.title}
                      comment={commentParent.comment}
                      upvotes={commentParent.upvotes}
                      idComment={commentParent.idComment}
                      idEstablishment={bodyToken.sub}
                      userPhoto={commentParent.userPhoto}
                    />
                    {commentParent.childComments && commentParent.childComments.length > 0 && (
                      <div
                        className={commentParent.childComments.length > 1 ? "scroll-comments" : "establishment-more-box"}>
                        {commentParent.childComments.map((commentReply, index) => (
                          <CommentReply
                            key={index}
                            establishmentName={commentReply.establishmentName}
                            rate={commentReply.commentRate}
                            title={commentReply.title}
                            upvotes={commentReply.upvotes}
                            comment={commentReply.comment}
                            idComment={commentReply.idComment}
                            idEstablishment={bodyToken.sub}
                            userPhoto={commentReply.userPhoto}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
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
                    to={`/establishment-menu/${bodyToken.sub}`}
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
                    {url_maps.length === 0 ? (
                      <MapsLoader />
                    ) : (
                      <iframe
                        style={{ 
                          border: 0,
                          width: "100%",
                        }} 
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" 
                        src={url_maps}
                        allowFullScreen 
                      ></iframe>
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
