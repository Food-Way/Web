import { useLocation } from "react-router-dom";
import FooterMain from "./FooterMain/FooterMain";
import FooterSecondary from "./FooterSecondary/FooterSecondary";

const Footer = () => {
  const location = useLocation();
  return (
    <footer>
      {location.pathname === "/" ? <FooterMain /> : <FooterSecondary />}
    </footer>
  );
};
export default Footer;
