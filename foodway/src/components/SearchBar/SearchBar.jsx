import './SearchBar.css';
import ImgLupa from '../../assets/img/Lupa.svg';
// import { Search, Option, Detail } from "searchpal";

const  SearchBar= ({defaultMSG}) => {
    return(
        <>
        <input type="text" defaultValue={defaultMSG}/>
        </>
    )
    // const UsersSearch = ({ users, session }) => {
    //     const [open, setOpen] = useState(false);

    //     return (
    //         <>
    //         <h1>Teste</h1>
    //         </>
    //     );
    // };
}

export default SearchBar;