import InputField from "../../../components/InputField/InputField";
import "./SignupEstablishment.css";
import { ButtonPrimary } from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { Auth } from "../../../components/Auth/Auth";
const SignupEstablishment = () => {
  const loginIMG =
    "https://foodway.blob.core.windows.net/public/cadastroEstablishment.png";
  return (
    <main className="main-signupestablishment">
      <Auth />
      <div className="container">
        <div className="form">
          <div className="form-container">
            <h1 className="title">Cadastro de Estabelecimento</h1>
            <form>
              <span className="">
                Não possui uma conta? <Link to="/sign-up">Cadastre-se</Link>
              </span>
              <ButtonPrimary text="Entrar" />
            </form>
          </div>
        </div>
        <div className="imgContainer">
          <img className="img-login" src={loginIMG} />
        </div>
      </div>
    </main>
  );
};

export default SignupEstablishment;
