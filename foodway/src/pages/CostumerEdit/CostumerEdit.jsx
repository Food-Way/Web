import "./CostumerEdit.css";
import { ButtonPrimary } from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { TextAreaField } from "../../components/InputField/InputField";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../components/Auth/Auth";

const CostumerEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const [user, setUser] = useState({
    name: "",
    bio: "",
  });

  async function getUser() {
    try {
      const idUser = atob(sessionStorage.getItem("idUser"));
      console.log("idUser: ", idUser);

      const response = await api.get(`/customers/profile/${idUser}`, {
        headers: {
          Authorization: "Bearer " + atob(sessionStorage.getItem("token")),
        },
      });

      if (response.status === 200) {
        console.log("response: ", response.data);
        setFormData(response.data);
        console.log("FormData", formData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  return (
    <div className="costumer">
      <img
        className="costumer-cover"
        src="https://foodway.blob.core.windows.net/user-images/cropped-1440-900-1338933.jpeg"
        alt=""
      />
      <div className="costumer-container">
        <div className="costumer-section-form">
          <h1 className="title-edit-profile">Editar Perfil</h1>
          <div className="profile-edit">
            <div className="image-section">
              <img
                className="perfil-img"
                src="https://foodway.blob.core.windows.net/user-images/download (2).jpeg"
                alt=""
              />
              <ButtonPrimary text="Editar" className="button-edit" />
              <ButtonPrimary
                className="button-edit"
                text="Selecione uma capa"
              />
            </div>
            <div className="profile-info-section">
              <form>
                <InputField
                  classNameGeral="button-edit-div"
                  className="input-field-profile"
                  label="Nome de perfil"
                  value={formData.name} // Update the value prop to use formData.name
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                />
                <TextAreaField
                  className="input-field-profile"
                  classNameGeral="button-edit-div"
                  value={formData.bio} // Update the value prop to use formData.bio
                  label="Bio"
                  type="text"
                  id="bio"
                  onChange={handleInputChange}
                />
                <div className="profile-form-edit">
                  <ButtonPrimary className="button-save" text="Salvar" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostumerEdit;
