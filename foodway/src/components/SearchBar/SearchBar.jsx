import './SearchBar.css';
import ImgLupa from '../../assets/img/Lupa.svg';
import { Search, Option, Detail } from "searchpal";

function SearchBar() {
    const UsersSearch = ({ users, session }) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Search
                    theme={(theme) => {
                        theme.accent("lightblue", "darkblue");
                        theme.border(null, 2);
                        theme.light.backdrop("rgb(240,240,240)", 0.8);
                        theme.dark.backdrop("navy", "60%");
                        return theme;
                    }}
                />
            </>
        );
    };
}

export default SearchBar;