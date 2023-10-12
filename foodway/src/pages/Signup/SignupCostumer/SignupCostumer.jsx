import "./SignupCostumer.css";
import loginIMG from "../../../assets/img/images/loginImg.png";
import { ButtonPrimary } from "../../../components/Button/Button";

const SignupCostumer = () => {
  return (
    <main className="main-signup">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Login</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <span>Não possui uma conta? Cadastre-se</span>
            <ButtonPrimary text="Entrar" />
          </form>
        </div>
        <img src={loginIMG} className="img-login" />
      </div>
    </main>
  );
};

export default SignupCostumer;
