import {
  InputField,
  TextAreaField,
} from "../../components/InputField/InputField";
import "./CustomerEditPersonal.css";
import { ButtonPrimary } from "../../components/Button/Button";
import { useState, useEffect } from "react";
import { Box, Input, Modal } from "@mui/material";
import api from "../../services/api";
import { toast } from "react-toastify";

const CustomerEditPersonal = () => {
  const [content, setContent] = useState("");

  const token = atob(sessionStorage.getItem("token"));
  const id = atob(sessionStorage.getItem("idUser"));
  const [formData, setFormData] = useState({});

  const handlePatchCustomerPersonal = () => {
    const data = {
      email: atob(sessionStorage.getItem("email")),
      emailNew: formData.email,
      password: formData.password,
      passwordNew: formData.passwordNew,
      passwordConfirm: formData.passwordConfirm,
    };

    if (data.emailNew === undefined) {
      data.emailNew = data.email;
    }
    if (data.password === undefined) {
      data.password = "";
    }
    if (data.passwordNew === undefined) {
      data.passwordNew = "";
    }
    if (data.passwordConfirm === undefined) {
      data.passwordConfirm = "";
    }

    if (data.passwordNew !== data.passwordConfirm) {
      toast.error("As senhas não conferem!");
      return;
    }

    api
      .patch(`customers/personal/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Dados atualizados com sucesso!");
        console.log(response);
        handleClose();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error("Erro ao atualizar dados!");
        }
        if (error.response.status === 401) {
          toast.error("Erro ao se autenticar!");
        }
      });
  };

  const getCostumer = () => {
    console.log("Token " + token);
    console.log("Id " + id);
    api
      .get(`customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCostumer();
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEditPassword = () => {
    setContent("editPassword");
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setContent("edit");
    setOpen(true);
  };

  return (
    <div className="establishment-edit">
      <Modal
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-edit-profile">
          {content === "edit" ? (
            <div className="edit-modal">
              <h2>Confirme as alterações</h2>
              <p className="descriptio-warn">
                Ao confirmar as alterações, suas informações serão atualizadas.
              </p>
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Senha"
                id="password"
                onChange={handleInputChange}
              />
              <ButtonPrimary
                text="Atualizar informações"
                className="send-cover-btn"
                onclick={handlePatchCustomerPersonal}
              />
            </div>
          ) : null}
          {content === "editPassword" ? (
            <div className="edit-modal">
              <h2>Confirme as alteração da senha</h2>
              <p className="descriptio-warn">
                Ao confirmar as alterações, suas informações serão atualizadas.
              </p>
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Senha Atual"
                id="password"
                onChange={handleInputChange}
              />
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Nova Senha"
                id="passwordNew"
                onChange={handleInputChange}
              />
              <InputField
                type={"password"}
                className="input-field-profile"
                label="Confirme a nova senha"
                id="passwordConfirm"
                onChange={handleInputChange}
              />

              <ButtonPrimary
                text="Atualizar informações"
                className="send-cover-btn"
                onclick={handlePatchCustomerPersonal}
              />
            </div>
          ) : null}
        </Box>
      </Modal>
      <div className="establishment-edit-container">
        <div className="establishment-edit-container-form">
          <div className="form-container-edit-profile">
            {" "}
            <div className="title">
              <h2>Informações do usuario</h2>
            </div>
            <form>
              <div className="input-fields">
                <InputField
                  disabled={true}
                  onChange={handleInputChange}
                  id={"nome-establishment"}
                  label="Nome"
                  defaultValue={formData.name}
                  value={formData.name}
                  type="text"
                  placeholder="Nome "
                  className="input-field-default-establisment-edit"
                  classNameGeral="form-group-establisment-edit"
                />

                <InputField
                  onChange={handleInputChange}
                  disabled={true}
                  id={"cpf"}
                  label="CPF"
                  type="text"
                  defaultValue={formData.cpf}
                  value={formData.cpf}
                  placeholder="CPF"
                  mask="999.999.999-99"
                  className="input-field-default-establisment-edit"
                  classNameGeral="form-group-establisment-edit-fill"
                />
              </div>
              <div className="input-fields">
                <InputField
                  onChange={handleInputChange}
                  id={"emailNew"}
                  label="Email"
                  type="text"
                  defaultValue={formData.email}
                  value={formData.emailNew}
                  placeholder="Email"
                  className="input-field-default-establisment-edit"
                  classNameGeral="form-group-establisment-edit-fill-edit"
                />
              </div>
              <div className="establishment-edit-sec-btn">
                <ButtonPrimary
                  className="button-establishment-editPassword"
                  text={"Atualizar senha"}
                  onclick={handleOpenEditPassword}
                />
                <ButtonPrimary
                  className="button-establishment-edit"
                  text={"Atualizar"}
                  onclick={handleOpenEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEditPersonal;
