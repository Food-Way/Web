import { useState } from 'react';
import { api_call } from "../../services/apiImpl";
import { ButtonPrimary } from '../Button/Button';
import { TextAreaFieldComment } from '../InputField/InputField';
import './CommentInsert.css';

import { toast } from 'react-toastify';

const CommentInsert = ({ establishmentId, onCommentAdded }) => {
  const profilePhoto = sessionStorage.getItem("profilePhoto") ? atob(sessionStorage.getItem("profilePhoto")) : "";
  const [commentText, setCommentText] = useState('');

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

  const handleSendComment = async (comment) => {
    if (validaMessagem(comment)) {
      const commentObj = {
        idCustomer: atob(sessionStorage.getItem("idUser")),
        idEstablishment: establishmentId,
        comment: comment,
        images: []
      }
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
        <img className="profile_icon" src={profilePhoto} alt="Foto de perfil" />
        <TextAreaFieldComment
          maxLength={532}
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
            handleSendComment(commentText)
          }} />
        </div>
      </div>
    </div>
  );
};

export default CommentInsert;
