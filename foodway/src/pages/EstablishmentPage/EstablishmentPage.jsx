
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
import { Link, useParams } from "react-router-dom";
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
  const apiKey = "AIzaSyAKELgmqf4j5kRAdn9EKTC28cMao0sQvJE";

  function getEstablishmentProfileData() {
    const response = api
      .get(`/establishments/profile/${idEstablishment}`)
      .then((response) => {
        if (response.status === 200) {
          setProfile(response.data);
          setComments(response.data.comments);
          getMaps(response.data.lat, response.data.lng);
        }
      })
      .catch((erro) => console.log(erro));
  }

  async function getMaps(lat, lng) {
    // if (search.length > 0) {

    try {
      const response = await api_maps.get(
        `staticmap?center=${lat},${lng}&zoom=15&size=225x100&key=${apiKey}`,
        {
          responseType: "arraybuffer",
        }
      );

      if (response.status === 200 && response.data) {
        const blob = new Blob([response.data], { type: "image/png" });
        const dataUrl = URL.createObjectURL(blob);
        setUrl(dataUrl);
      } else {
        console.error("Resposta inválida da API de Mapas:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar o mapa:", error);
    }
    // }
  }



  useEffect(() => {
    getEstablishmentProfileData();
  }, []);

  var id = 1;
  return (
    <>
      <div className="establishment-content-container">
        <section>
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
                  <span>{profile.generalRate}</span>
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
          {/* <ButtonSecondaryLink url="/establishment-edit" text={"Editar Perfil"} /> */}
        </section>
        <section>
          <div className="establishment-global-container">
            <div className="establishment-addcomment-box">
              <div className="add-comment-form">
                {/* <TextAreaFieldComment placeholder={"Adicione um comentário"} /> */}
                <button className="submit-comment-btn" >Comentar</button>
                {/*onClick={handleAddComment}*/}
              </div>
            </div>
            <div className="establishment-comments-info-container">
              <div
                className={
                  comments.length > 1
                    ? "establishment-comments-all-scroll"
                    : "establishment-comments-all"
                }
              >
                {comments.map((commentParent, index) => (
                  <div className="establishment-comments-box-more" key={commentParent.idComment}>
                    <CommentIndividual
                      key={commentParent.idComment} // Unique key for each parent comment
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
                      {commentParent.childComments.map((commentReply, indexx) => (
                        <CommentReply
                          key={`${commentParent.idComment}-${commentReply.idComment}`} // Concatenate to ensure uniqueness
                          establishmentName={commentReply.establishmentName}
                          rate={commentReply.commentRate}
                          title={commentReply.title}
                          upvotes={commentReply.upvotes}
                          comment={commentReply.comment}
                          idComment={commentReply.idComment}
                          idCustomer={atob(sessionStorage.getItem("idUser"))}
                          idEstablishment={idEstablishment}
                          userPhoto={commentReply.userPhoto}
                        />
                      ))}
                    </div>
                  </div>
                ))}

              </div>
              <div className="establishment-side-box">
                <div className="establishment-general-box">
                  <div className="establishment-value-box">
                    <span className="establishment-info-value">
                      {profile.qtdComments}
                    </span>
                    <span>Comentários</span>
                  </div>
                  <div className="establishment-value-box">
                    <span className="establishment-info-value">
                      {profile.qtdUpvotes}
                    </span>
                    <span>UpVotes</span>
                  </div>
                  <div className="establishment-value-box">
                    <span className="establishment-info-value">
                      {profile.qtdRates}
                    </span>
                    <span>Avaliações</span>
                  </div>
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
                </div>
                <div className="establishment-location-box">
                  <span className="establishment-location-title">
                    Localização
                  </span>
                  <div className="establishment-map-box">
                    <img src={url} alt="" />
                  </div>
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
