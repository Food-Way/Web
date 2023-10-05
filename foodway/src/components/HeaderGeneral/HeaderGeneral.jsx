import LogoFoodWay from  '../../assets/img/FoodWayLogo.png';
import SelectCategory from '../SelectCategory/SelectCategory';
import SearchBar from '../SearchBar/SearchBar';
import './HeaderGeneral.css';


function Header() {
    return (
        <>
            <header>
                <div className='container'>
                    <div className='left'>
                        <img src={LogoFoodWay} alt="Logo FoodWay" />
                        <h1>FoodWay</h1>
                    </div>
                    <SelectCategory />
                    <SearchBar />
                    {/* Select component local */}
                    <nav>
                        <ul>
                            <li>Inicio</li>
                            <li>Sobre</li>
                            <li>Login</li>
                            <li className='active'>Cadastro</li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;