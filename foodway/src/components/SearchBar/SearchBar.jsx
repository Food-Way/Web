import "./SearchBar.css";
// import ImgLupa from "../../assets/img/Lupa.svg";
// import { Search, Option, Detail } from "searchpal";

const SearchBar = ({ defaultMSG }) => {
  const ImgLupa = "https://foodway.blob.core.windows.net/public/header.png";
  return (
    <>
      <input className="searchBar" type="text" placeholder={defaultMSG} />
    </>
  );
};

export default SearchBar;
