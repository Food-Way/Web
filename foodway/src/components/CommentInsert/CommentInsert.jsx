import { useState } from 'react';
import { api_call } from "../../services/apiImpl";
import { ButtonPrimary } from '../Button/Button';
import { TextAreaFieldComment } from '../InputField/InputField';
import { hasValidSession } from "../Auth/Auth.jsx"
import { useNavigate } from "react-router-dom";
import parseJWT from "../../util/parseJWT";
import './CommentInsert.css';
import { toast } from 'react-toastify';
import { StarEstablishment } from '../StarEstablishment/StarEstablishment';


const updateComments = async (idEstablishment, setComments) => {
  const response = await api_call("get", `/establishments/${idEstablishment}/comments`, null, atob(sessionStorage.getItem("token")));
  console.log("Status: " + response.status)
  console.log(response.data)
  console.log("idEstablishment: " + idEstablishment)
  console.log("setComments: " + setComments)
  console.log(response.data)
  setComments(response.data);
  if (response.status === "200") {
    console.log("Entrei")
  }

};

const CommentInsert = ({ establishmentId, setComments }) => {
  const navigate = useNavigate();
  const profilePhoto = sessionStorage.getItem("profilePhoto") ? atob(sessionStorage.getItem("profilePhoto")) : "";
  const [commentText, setCommentText] = useState('');
  const bodyToken = parseJWT();
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };
  const [ratings, setRatings] = useState({
    AMBIENT: 0,
    SERVICE: 0,
    FOOD: 0
  });
  const handleChange = (type, newValue) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [type.toUpperCase()]: newValue,
    }
    ));
  };
  const validaMessagem = (message) => {

    if (message === '') {
      toast.error('Comentário não pode ser vazio');
      return false;
    }
    else if (message.length >= 532) {
      toast.error('Comentário não pode ter mais de 532 caracteres');
      return false;
    } else if (message.length < 10) {
      toast.error('Comentário não pode ter menos de 10 caracteres');
      return false;
    }
    if ((ratings.FOOD == 0) && (ratings.SERVICE == 0) && (ratings.AMBIENT == 0)) {
      toast.error('Preencha a avaliação');
      return false;
    }
    return true;
  };
  const handleSendComment = async (comment) => {
    console.log("profilePhoto " + atob(sessionStorage.getItem("profilePhoto")));
    var listRateStatus = [];

    if (validaMessagem(comment)) {
      const commentObj = {
        idCustomer: bodyToken.idUser,
        idEstablishment: establishmentId,
        userPhoto: atob(sessionStorage.getItem("profilePhoto")),
        comment: comment,
        images: []
      }

      const rateObj = {
        "idCustomer": bodyToken.idUser,
        "idEstablishment": establishmentId,
        "rates": [
          {
            "name": "AMBIENT",
            "ratePoint": ratings.AMBIENT
          },
          {
            "name": "FOOD",
            "ratePoint": ratings.FOOD
          },
          {
            "name": "SERVICE",
            "ratePoint": ratings.SERVICE
          }

        ]
      };


      const responseRate = await api_call("post", "/rates", rateObj, atob(sessionStorage.getItem("token")));

      const response = await api_call("post", "/comments", commentObj, atob(sessionStorage.getItem("token")));
      if (response.status === 200) {
        toast.success('Comentário adicionado com sucesso');
        clearCommentText();
        updateComments(establishmentId, setComments)
      } else {
        toast.error('Erro ao adicionar comentário');
      }
    }
  };
  const clearCommentText = () => {
    setCommentText('');
  };
  return (
    <div className="comment_insert">
      <span className="comment-section">
        <img className="profile_icon" src={profilePhoto != null ? "https://foodway.s3.amazonaws.com/public-images/default-user-image.webp" : profilePhoto} alt="Foto de perfil" />
        <TextAreaFieldComment
          maxLength={255}
          placeholder="Adicione uma avaliação"
          value={commentText}
          onChange={handleCommentChange}
          classNameGeral="form-group-comment"
        />
      </span>
      <div className="actions-section-default">
        <div>

          <StarEstablishment
            type="FOOD"
            name={"Comida"}
            value={ratings.FOOD}
            onChange={(newValue) => handleChange('FOOD', newValue)}
          />
          <StarEstablishment
            type="AMBIENT"
            name={"Ambiente"}
            value={ratings.AMBIENT}
            onChange={(newValue) => handleChange('AMBIENT', newValue)}
          />
          <StarEstablishment
            type="SERVICE"
            name={"Atendimento"}
            value={ratings.SERVICE}
            onChange={(newValue) => handleChange('SERVICE', newValue)}
          />

        </div>

        <div className="container_button-comment">
          <ButtonPrimary text="Cancelar" className="comment-cancel" onclick={clearCommentText} />
          <ButtonPrimary text="Adicionar" className="comment-add" onclick={
            () => {
              if (!sessionStorage.getItem("token")) {
                hasValidSession(navigate);
              } else {
                handleSendComment(commentText)
              }
            }

          } />
        </div>
      </div>
    </div>
  );
};
const CommentInsertReply = ({ establishmentId, commentParent, setComments }) => {
  // const { updateComments } = useComments();
  const profilePhoto = sessionStorage.getItem("profilePhoto") ? atob(sessionStorage.getItem("profilePhoto")) : "";
  const [commentText, setCommentText] = useState('');
  const bodyToken = parseJWT();

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };
  const validaMessagem = (message) => {
    if (message === '') {
      toast.error('Comentário não pode ser vazio');
      return false;
    }
    else if (message.length >= 532) {
      toast.error('Comentário não pode ter mais de 532 caracteres');
      return false;
    } else if (message.length < 10) {
      toast.error('Comentário não pode ter menos de 10 caracteres');
      return false;
    }

    return true;
  };
  const handleSendCommentReply = async (comment) => {
    console.log("establishmentId:" + establishmentId)
    console.log("profilePhoto " + atob(sessionStorage.getItem("profilePhoto")));
    if (validaMessagem(comment)) {
      const commentObj = {
        idParent: commentParent,
        idCustomer: bodyToken.idUser,
        idEstablishment: establishmentId,
        userPhoto: atob(sessionStorage.getItem("profilePhoto")),
        comment: comment,
        images: []
      }
      console.log("commentObj: " + commentObj)
      const response = await api_call("post", "/comments/child", commentObj, atob(sessionStorage.getItem("token")));
      if (response.status === 200) {
        toast.success('Comentá rio adicionado com sucesso');
        clearCommentText();
        updateComments(establishmentId, setComments)
      } else {
        toast.error('Erro ao adicionar comentário');
      }
    }
  };
  const clearCommentText = () => {
    setCommentText('');
  };
  return (
    <div className="comment_insert">
      <span className="comment-section">
        <img className="profile_icon" src={profilePhoto} alt="Profile" />
        <TextAreaFieldComment
          maxLength={255}
          placeholder="Adicione uma avaliação"
          value={commentText}
          onChange={handleCommentChange}
          classNameGeral="form-group-comment"
        />
      </span>
      <div className="actions-section">
        <div className="container_button-comment">
          <ButtonPrimary text="Cancelar" className="comment-cancel" onclick={clearCommentText} />
          <ButtonPrimary text="Adicionar" className="comment-add" onclick={() => {
            handleSendCommentReply(commentText)
          }} />
        </div>
      </div>
    </div>
  );
};

export { CommentInsert, CommentInsertReply };
