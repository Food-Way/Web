import { useState, React, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { faUser, faMagnifyingGlass, faStore, faUserLarge, faArrowRightFromBracket, faChartSimple, faComments, faRankingStar, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MenuEstablishment.css';

function MenuEstablishment() {
    const [establishment, setEstablishment] = useState([
        { "id": 1, "nome": "Restaurante Italiano" },
        { "id": 2, "nome": "Churrascaria" },
        { "id": 3, "nome": "Comida Mexicana" },
        { "id": 4, "nome": "Sushi Bar" },
        { "id": 5, "nome": "Cafeteria" },
        { "id": 6, "nome": "Pizzaria" },
        { "id": 7, "nome": "Restaurante Vegetariano" },
        { "id": 8, "nome": "Comida Indiana" },
        { "id": 9, "nome": "Restaurante de Frutos do Mar" }
    ]);

    const [users, setUsers] = useState([
        { "id": 1, "nome": "Alice" },
        { "id": 2, "nome": "Bob" },
        { "id": 3, "nome": "Charlie" },
        { "id": 4, "nome": "David" },
        { "id": 5, "nome": "Eva" }
    ]);

    const typeUser = sessionStorage.getItem("typeUser");

    const handleLogoff = () => {
        sessionStorage.clear();
        toast.success("Logout realizado com sucesso!");
        navigate("/");
    };

    function setCheck(id) {
        var check = document.getElementById(id);
        if (check.checked) {
            check.checked = false;
        } else {
            check.checked = true;
        }
    }

    var results = [10, 20, 30, 44, 70, 98];

    return (
        <>
            <Sidebar>
                <Menu>
                    <MenuItem icon={(<FontAwesomeIcon icon={faUser} className="item-active" />)}>
                        Perfil
                    </MenuItem>

                    {/* Utilizar parseJWT */}
                    {typeUser === "ESTABLISHMENT " ? (
                        <>
                            <MenuItem icon={(<FontAwesomeIcon icon={faChartSimple} />)}> Desempenho </MenuItem>
                            <MenuItem icon={(<FontAwesomeIcon icon={faBookOpen} />)}> Cardápio </MenuItem>
                            <MenuItem icon={(<FontAwesomeIcon icon={faComments} />)}> Comentários </MenuItem>
                            <MenuItem icon={(<FontAwesomeIcon icon={faRankingStar} />)}> Relevância </MenuItem>
                        </>
                    ) : (
                        <>
                            <SubMenu icon={(<FontAwesomeIcon icon={faMagnifyingGlass} />)} label={"Busca"}>
                                <SubMenu icon={(<FontAwesomeIcon icon={faStore} />)} label={"Estabelecimento " + "(" + establishment.length + ")"}>
                                    {establishment.map((item) => {
                                        return (
                                            <MenuItem key={item.id} onClick={() => setCheck("e" + item.id)}>
                                                <div className="menu-item">
                                                    <input type="checkbox" name="" id={"e" + item.id} />
                                                    <span>{item.nome}</span>
                                                </div>
                                            </MenuItem>
                                        )
                                    })}
                                </SubMenu>
                                {sessionStorage.getItem("token") !== null ? (
                                    <SubMenu icon={(<FontAwesomeIcon icon={faUserLarge} />)} label={"Usuários " + "(" + users.length + ")"}>
                                        {users.map((item) => {
                                            return (
                                                <MenuItem key={item.id} onClick={() => setCheck("u" + item.id)}>
                                                    <div className="menu-item">
                                                        <input type="checkbox" name="" id={"u" + item.id} />
                                                        <span>{item.nome}</span>
                                                    </div>
                                                </MenuItem>
                                            )
                                        })}
                                    </SubMenu>
                                ) : (
                                    ''
                                )}
                            </SubMenu>
                        </>
                    )}
                    {sessionStorage.getItem("token") !== null ? (
                        <MenuItem icon={(<FontAwesomeIcon icon={faArrowRightFromBracket} />)} onClick={handleLogoff}> Sair </MenuItem>
                    ) : (
                        ''
                    )}
                </Menu>
                <div className="boxCopyright">
                    <span>Todos os direitos reservados</span>
                    <b>FoodWay © 2023</b>
                </div>
            </Sidebar>;
        </>
    );
}

export default MenuEstablishment;