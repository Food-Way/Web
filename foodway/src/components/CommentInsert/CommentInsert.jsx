import { useState } from 'react';
import { api_call } from "../../services/apiImpl";
import { ButtonPrimary } from '../Button/Button';
import { TextAreaFieldComment } from '../InputField/InputField';
import parseJWT from "../../util/parseJWT";
import './CommentInsert.css';
import { toast } from 'react-toastify';
import { StarEstablishment } from '../StarEstablishment/StarEstablishment';
const CommentInsert = ({ establishmentId, onCommentAdded }) => {
  const profilePhoto = sessionStorage.getItem("profile-photo") ? atob(sessionStorage.getItem("profile-photo")) : "";
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
    console.log(ratings);
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
    var listRateStatus = [];
    if (validaMessagem(comment)) {
      const commentObj = {
        idCustomer: bodyToken.idUser,
        idEstablishment: establishmentId,
        userPhoto: atob(sessionStorage.getItem("profile-photo")),
        comment: comment,
        images: []
      }

      const typeOfRate = [
        { tipo: "AMBIENT", valor: ratings.AMBIENT },
        { tipo: "FOOD", valor: ratings.FOOD },
        { tipo: "SERVICE", valor: ratings.SERVICE }
      ];

      for (const rate of typeOfRate) {
        const rateObj = {
          "idCustomer": bodyToken.idUser,
          "idEstablishment": establishmentId,
          "ratePoint": rate.valor,
          "typeRate": rate.tipo
        };

        console.log(rateObj)
        console.log(rateObj.idCustomer)
        console.log(rateObj.idEstablishment)
        console.log(rateObj.ratePoint)
        console.log(rateObj.typeRate)
        const responseRate = await api_call("post", "/rates", rateObj, atob(sessionStorage.getItem("token")));
        console.log(responseRate);
        // console.log("responseRate: " + responseRate)
        // console.log("Passei " + rateObj.typeRate)
        // listRateStatus.push(responseRate.status);
      }
      // console.log(listRateStatus);



      const response = await api_call("post", "/comments", commentObj, atob(sessionStorage.getItem("token")));
      if (response.status === 200) {
        toast.success('Comentário adicionado com sucesso');
        clearCommentText();
        onCommentAdded(response.data);
        console.log(response);
      } else {
        console.log(response);
        toast.error('Erro ao adicionar comentário');
      }
    }
  };

  const clearCommentText = () => {
    console.log('clearCommentText');
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
      <div className="actions-section-default">
        <div>

          <StarEstablishment
            type="FOOD"
            value={ratings.FOOD}
            onChange={(newValue) => handleChange('FOOD', newValue)}
          />
          <StarEstablishment
            type="AMBIENT"
            value={ratings.AMBIENT}
            onChange={(newValue) => handleChange('AMBIENT', newValue)}
          />
          <StarEstablishment
            type="SERVICE"
            value={ratings.SERVICE}
            onChange={(newValue) => handleChange('SERVICE', newValue)}
          />

        </div>

        <div className="container_button-comment">
          <ButtonPrimary text="Cancelar" className="comment-cancel" onclick={clearCommentText} />
          <ButtonPrimary text="Adicionar" className="comment-add" onclick={() => {
            handleSendComment(commentText)
          }} />
        </div>
      </div>
    </div>
  );
};
const CommentInsertReply = ({ establishmentId, onCommentAdded, commentParent }) => {
  const profilePhoto = sessionStorage.getItem("profile-photo") ? atob(sessionStorage.getItem("profile-photo")) : "";
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
    if (validaMessagem(comment)) {
      const commentObj = {
        idParent: commentParent,
        idCustomer: bodyToken.idUser,
        idEstablishment: establishmentId,
        userPhoto: atob(sessionStorage.getItem("profile-photo")),
        comment: comment,
        images: []
      }
      const response = await api_call("post", "/comments/child", commentObj, atob(sessionStorage.getItem("token")));
      if (response.status === 200) {
        toast.success('Comentário adicionado com sucesso');
        clearCommentText();

        console.log(response);
      } else {
        console.log(response);
        toast.error('Erro ao adicionar comentário');
      }
    }
  };

  const clearCommentText = () => {
    console.log('clearCommentText');
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
