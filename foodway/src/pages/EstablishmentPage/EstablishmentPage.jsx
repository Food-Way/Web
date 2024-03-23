
import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
const Phone = "https://foodway-public-s3.s3.amazonaws.com/website-images/phone.png";
const BookMenu = "https://foodway-public-s3.s3.amazonaws.com/website-images/book-menu.png";
const Report = "https://foodway-public-s3.s3.amazonaws.com/website-images/report.png";
import { useEffect, useState } from "react";
import { api_call, nifi_call } from "../../services/apiImpl";
import parseJWT from "../../util/parseJWT";
import { Link, useParams } from "react-router-dom";
import ContentLoader from 'react-content-loader'
import {
  CommentIndividual,
  CommentReply,
} from "../../components/Comment/Comment.jsx";
import "./EstablishmentPage.css";
import CommentInsert from "../../components/CommentInsert/CommentInsert.jsx";
import { ButtonSecondary, ButtonSecondaryLink } from "../../components/Button/Button.jsx";
import GenericModal from "../../components/GenericModel/GenericModel.jsx";
import { InputField, TextAreaField } from "../../components/InputField/InputField";
import { ButtonPrimary } from "../../components/Button/Button.jsx";
import { toast } from 'react-toastify';


const EstablishmentPage = () => {
  const [url_maps, setUrlMaps] = useState("");
  const bodyToken = parseJWT();
  const [openReportModal, setOpenReportModal] = useState(false);
  const handleCloseReportModal = () => setOpenReportModal(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const handleOpenContactModal = () => setOpenContactModal(true);
  const handleCloseContactModal = () => setOpenContactModal(false);
  const [profile, setProfile] = useState([]);
  const [comments, setComments] = useState([]);
  const [messageData, setMessageData] = useState("");
  const params = useParams();
  const idUser = params.id;

  function handleOpenReportModal () {
    if (sessionStorage.getItem("token")) {
      setOpenReportModal(true);
    } else {
      toast.error('Realize o login primeiro!');
    }
  }

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

  const handleClick = () => {
    const toFoodway = encodeURIComponent('help@foodway.com');
    const cc = encodeURIComponent(profile.email);
    const subject = encodeURIComponent('Reportar Problema no Estabelecimento');
    const body = encodeURIComponent('Olá,\n\nEstou entrando em contato para reportar um problema no estabelecimento.\n\nAtenciosamente,\n\nNome do Cliente\n\nDescrição do problema:');
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${toFoodway}&cc=${cc}&su=${subject}&body=${body}`;

    window.open(gmailLink, '_blank');
  };

  const addCommentToState = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  async function getEstablishmentProfileData() {
    console.log(idUser)
    const response = await api_call("get", `/establishments/profile/${idUser}`, null, null);
    setProfile(response.data);
    console.log(response.data)
    setComments(response.data.comments);
    setUrlMaps(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAKELgmqf4j5kRAdn9EKTC28cMao0sQvJE&q=${response.data.lat},${response.data.lng}&zoom=18&maptype=roadmap`)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeMessageData = (e) => {
    setMessageData(e.target.value); 
  };

  const handleSendEmail = async () => {
    try {
      const response = await nifi_call("post", "/report", {
        complainantEmail: bodyToken.email,
        complainantName: bodyToken.username,
        emailMessage: messageData,
        emailSubject: "Reportar Problema no Estabelecimento",
        establishmentEmail: "leonardo.oliveira@sptech.school",
        establishmentName: profile.establishmentName,
        ownerName: profile.name
      },null, null);
      console.log(response);
    }catch (error) {
      console.log(error);
    }
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
                  <h1 className="title-establishment">{profile.establishmentName}</h1>
                  <span>{profile.culinary}</span>
                  {location.pathname.endsWith(idUser) ? <ButtonSecondaryLink width="10vw" height="6vh" url="/establishment/edit" text={"Editar Perfil"} /> : ""}
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
              <div className="establishment-add-comment-list-comments">
                <div className="establishment-addcomment-box">
                  {sessionStorage.getItem("token") ? <CommentInsert establishmentId={idUser} onCommentAdded={addCommentToState} /> : null}
                </div>
                <div
                  className={comments.length > 1 ? "establishment-comments-all-scroll" : "establishment-comments-all"}>
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
                        idEstablishment={idUser}
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
                              idEstablishment={idUser}
                              userPhoto={commentReply.userPhoto}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="establishment-side-box">
                <div className="establishment-general-box">
                  {profile === undefined || profile.length === 0 ? (
                    <InfoLoader />
                  ) : (
                    <div className="establishment-value-box">
                      <span className="establishment-info-value">
                        {profile.qtdComments}
                      </span>
                      <span>Comentários</span>
                    </div>
                  )}
                  {profile === undefined || profile.length === 0 ? (
                    <InfoLoader />
                  ) : (
                    <div className="establishment-value-box">
                      <span className="establishment-info-value">
                        {profile.qtdUpvotes}
                      </span>
                      <span>UpVotes</span>
                    </div>
                  )}
                  {profile === undefined || profile.length === 0 ? (
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
                    to={`/establishment-menu/${idUser}`}
                    className="linkItem"
                  >
                    <div className="establishment-menu-btn">
                      <img src={BookMenu} alt="Ícone de livro" />
                      <span>Cardápio</span>
                    </div>
                  </Link>
                  <div className="establishment-contact-btn">
                    <img src={Phone} alt="Ícone de telefone" />
                    <span onClick={handleOpenContactModal}>Contato</span>
                    <GenericModal open={openContactModal} handleClose={handleCloseContactModal}>
                      <div className="contact-modal-container">
                        <h1 className="establishment-contact-title">Contato - {profile.name}</h1>
                        <div className="contact-modal-box">
                          <span className="contact-item">Email para contato: {profile.email}</span>
                          <span className="contact-item">Telefone: {profile.phone == null ? "Não adicionado" : profile.phone}</span>
                        </div>
                          <span className="establishment-location-title establishment-contact-title">Localização</span>
                        <iframe
                          style={{
                            width: "100%",
                            height: "300px",
                            borderRadius: "0.5rem",
                            border: "1px solid #c4c4c4",
                            marginTop: "1rem",
                          }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          src={url_maps}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </GenericModal>
                  </div>
                </div>
                <div className="establishment-location-box">
                  <span className="establishment-location-title">
                    Localização
                  </span>
                  <div className="establishment-map-box">
                    {url_maps === undefined || url_maps.length === 0 ? (
                      <MapsLoader />
                    ) : (
                      <iframe
                        style={{
                          width: "100%",
                          borderRadius: "0.5rem",
                          border: "1px solid #c4c4c4",
                          marginTop: "1rem",
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
                  <img src={Report} alt="Ícone de perigo" />
                  <span onClick={handleOpenReportModal}>Reportar</span>
                  <GenericModal classNameModal={"modal-page-establishment-report"} classNameBox={"box-page-establishment-report"} open={openReportModal} handleClose={handleCloseReportModal}>
                    <div className="email-modal-container">
                      <form onSubmit={handleSubmit}>
                        <InputField
                          type="email"
                          label="Email"
                          placeholder="Email do estabelecimento"
                          id="email"
                          value={profile.email}
                          disabled={true}
                          autocomplete="establishment-email"
                        />
                        <InputField
                          type="subject"
                          label="Assunto"
                          placeholder="Assunto"
                          id="subject"
                          value={"Reportar Problema no Estabelecimento"}
                          disabled={true}
                          autocomplete="subject"
                        />
                        <TextAreaField
                          label="Mensagem"
                          placeholder="Mensagem"
                          id="message"
                          value={`
                                 Olá,\n\nEstou entrando em contato para reportar um problema no estabelecimento.\n\nAtenciosamente,\n\nNome do Cliente: ${bodyToken.username}\n\nDescrição do problema:
                               `}
                          onChange={handleChangeMessageData}
                        />
                      </form>
                      <div className="button-modal-container">
                        <ButtonPrimary text="Enviar" onclick={handleSendEmail} width={"39%"} height={"7rem"} />
                        <ButtonSecondary text="Cancelar" onclick={handleCloseReportModal} width={"39%"} height={"7rem"}  />
                      </div>
                      </div>
                  </GenericModal>
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
