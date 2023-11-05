import { useNavigate } from "react-router-dom";

const LinkToPage = ({ to, text, styleLink }) => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <a
      className={styleLink}
      onClick={() => {
        handleNavigate(to);
      }}
    >
      {text}
    </a>
  );
};
export default LinkToPage;
