import AvaliationDashCard from "../../components/AvaliationDashCard/AvaliationDashCard";
import { useEffect, useState } from "react";
import { api_call } from "../../services/apiImpl";
import parseJWT from "../../util/parseJWT";
import { Link, useParams } from "react-router-dom";
import ContentLoader from 'react-content-loader';
import { CommentIndividual } from "../../components/Comment/Comment.jsx";
import "./EstablishmentPage.css";
import { CommentInsert } from "../../components/CommentInsert/CommentInsert.jsx";
import { ButtonSecondary } from "../../components/Button/Button.jsx";
import GenericModal from "../../components/GenericModel/GenericModel.jsx";
import { InputField, TextAreaField } from "../../components/InputField/InputField";
import { ButtonPrimary, ButtonSecondaryLink } from "../../components/Button/Button.jsx";
import { toast } from 'react-toastify';
const Phone = "https://foodway.s3.amazonaws.com/public-images/phone.png";
const BookMenu = "https://foodway.s3.amazonaws.com/public-images/book-menu.png";
const Report = "https://foodway.s3.amazonaws.com/public-images/report.png";

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
  const idEstablishment = params.id;

  function handleOpenReportModal() {
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
      width={780}
      height={422}
      viewBox="0 0 780 422"
      backgroundColor="#ffffff"
      foregroundColor="#c4c4c4"
    >
      <rect x="0" y="0" rx="0" ry="0" width="780" height="422" />
    </ContentLoader>
  )

  async function getEstablishmentProfileData() {
    const response = await api_call("get", `/establishments/profile/${idEstablishment}`, null, null);
    console.log("Response")
    console.log(response.data)
    setProfile(response.data);
    console.log("Profile")
    console.log(profile)
    setComments(response.data.comments);
    setUrlMaps(`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GMAPS_API_KEY}&q=${response.data.lat},${response.data.lng}&zoom=18&maptype=roadmap`)
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
        establishmentEmail: profile.email,
        establishmentName: profile.establishmentName,
        ownerName: profile.name
      }, null, null);
      console.log(response);
      if (response.status === 200) {
        toast.success('Email enviado com sucesso!');
        handleCloseReportModal();
      }
    } catch (error) {
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
              style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${profile.profileHeaderImg})`,
                height: '300px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
              <div className="establishment-content-banner-box">
                <div className="establishment-title-box">
                  <h1 className="title-establishment">{profile.establishmentName}</h1>
                  <span>{profile.culinary}</span>
                  {bodyToken && atob(sessionStorage.getItem("typeUser")) == "ESTABLISHMENT" ? <ButtonSecondaryLink width="10vw" height="6vh" url="/establishment/edit" text={"Editar Perfil"} /> : ""}
                </div>
                <div className="establishment-avaliation-principal">
                  <div className="establishment-avaliation-value">
                    <span>Avaliação </span>
                    <span>{profile.generalRate.toFixed(1)}</span>
                  </div>
                  <div className="avaliation-general-points">
                    <AvaliationDashCard rate={profile.foodRate} color="white" category="Comida" />
                    <AvaliationDashCard rate={profile.ambientRate} color="white" category="Ambiente" />
                    <AvaliationDashCard rate={profile.serviceRate} color="white" category="Atendimento" />
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
                  <CommentInsert establishmentId={idEstablishment} setComments={setComments} />
                </div>
                <div
                  className={comments.length > 1 ? "establishment-comments-all-scroll" : "establishment-comments-all"}>
                  {profile === undefined || profile.length === 0 ? (
                    <CommentLoader />
                  ) : (
                    comments.length === 0 || comments === undefined ? (
                      <div className="no-content-establishment-page-box">
                        <span className="no-content-establishment-page">Nenhum comentário realizado</span>
                      </div>
                    ) : (
                      comments.map((commentParent, index) => (
                        <div className="establishment-comments-box-more" key={index}>
                          <CommentIndividual
                            key={index}
                            size={30}
                            establishmentName={commentParent.establishmentName}
                            rate={commentParent.generalRate}
                            title={commentParent.title}
                            comment={commentParent.comment}
                            upvotes={commentParent.upvotes}
                            idComment={commentParent.idPost}
                            idEstablishment={idEstablishment}
                            userPhoto={commentParent.userPhoto}
                            replies={commentParent.replies}
                            setComments={setComments}
                          />
                        </div>
                      ))
                    )
                  )}
                </div>
              </div>
              <div className="establishment-side-box">
                <div className="establishment-tags-box">
                  <span className="establishment-tags-title">Tags</span>
                  <div className="establishment-tag-content">
                    {profile === undefined || profile.length === 0 ? (
                      <InfoLoader />
                    ) : (
                      profile.tags === undefined || profile.tags.length === 0 ? (
                        <span className="no-content">Nenhuma Tag selecionada</span>
                      ) : (
                        profile.tags.map((item, index) => (
                          <div className="establishment-tag-box" key={index}>
                            <span>{item.name}</span>
                          </div>
                        ))
                      )
                    )}
                  </div>
                </div>
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
                    to={`/establishment-menu/${idEstablishment}`}
                    className="linkItem"
                  >
                    <div className="establishment-menu-btn" onClick={() => {
                      sessionStorage.setItem("idEstablishment", idEstablishment);
                    }}>
                      <img src={BookMenu} alt="Ícone de livro" />
                      <span>Cardápio</span>
                    </div>
                  </Link>
                  <div className="establishment-contact-btn" onClick={handleOpenContactModal}>
                    <img src={Phone} alt="Ícone de telefone" />
                    <span>Contato</span>
                  </div>
                  <GenericModal open={openContactModal} handleClose={handleCloseContactModal}>
                    <div className="contact-modal-container">
                      <h1 className="establishment-contact-title">Contato - {profile.name}</h1>
                      <div className="contact-modal-box">
                        <span className="contact-item"><span className="label-contact-item">Email para contato:</span> {profile.email}</span>
                        <span className="contact-item"><span className="label-contact-item">Telefone:</span> {profile.phone == null ? "Não adicionado" : profile.phone}</span>
                      </div>
                      <span className="establishment-location-title establishment-contact-title">Localização</span>
                      <iframe
                        style={{
                          width: "80%",
                          height: "300px",
                          borderRadius: "0.5rem",
                          border: "1px solid #c4c4c4",
                        }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={url_maps}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </GenericModal>
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
                          height: "120px",
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
                {/* <div className="establishment-report-box">
                  <img src={Report} alt="Ícone de perigo" />
                  <span onClick={handleOpenReportModal}>Reportar</span>
                  <GenericModal classNameModal={"modal-page-establishment-report"} classNameBox={"box-page-establishment-report"} open={openReportModal} handleClose={handleCloseReportModal}>
                    <div className="email-modal-container">
                      <h1 className="establishment-report-title">Reportar Problema - {profile.establishmentName}</h1>
                      <form onSubmit={handleSubmit}>
                        <InputField
                          type="email"
                          label="Email"
                          placeholder="Email do estabelecimento"
                          id="email"
                          value={profile.email}
                          disabled="true"
                          autocomplete="establishment-email"
                        />
                        <InputField
                          type="subject"
                          label="Assunto"
                          placeholder="Assunto"
                          id="subject"
                          value={"Reportar Problema no Estabelecimento"}
                          disabled="true"
                          autocomplete="subject"
                        />
                        <TextAreaField
                          label="Mensagem"
                          placeholder="Mensagem"
                          id="message"
                          onChange={handleChangeMessageData}
                        />
                      </form>
                      <div className="button-modal-container-report">
                        <ButtonPrimary text="Enviar" onclick={handleSendEmail} width={"39%"} height={"6rem"} />
                        <ButtonSecondary text="Cancelar" onclick={handleCloseReportModal} width={"39%"} height={"6rem"} />
                      </div>
                    </div>
                  </GenericModal>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EstablishmentPage;