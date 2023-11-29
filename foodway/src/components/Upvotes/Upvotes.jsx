import React from "react";
const UpvoteIcon = "https://foodway.blob.core.windows.net/public/upvotes.svg";
import "./Upvotes.css";
import api from "../../services/api";

const Upvotes = (props) => {

    function handleUpvotes(idComment, idEstablishment, idCustomer) {

        console.log(props.idCustomer);
        console.log(props.idEstablishment);
        console.log(props.idComment);


        const response = api.post(`upvotes`, {
            idCustomer: `${idCustomer}`,
            idEstablishment: `${idEstablishment}`,
            idComment: `${idComment}`,
        }, {
            headers: {
                Authorization: 'Bearer ' + atob(sessionStorage.getItem("token")),
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("upvotado");
                }
            })
            .catch((erro) => console.log(erro));
    };

    return (
        <>
            <div className="upvotes" onClick={location.pathname.startsWith("/establishment/info/") ? ()=>{handleUpvotes(props.idComment, props.idEstablishment, props.idCustomer)} : ""}>
                <img src={UpvoteIcon} alt="" />
                <span>{props.upvotes ? props.upvotes : 0}</span>
            </div>
        </>
    )
}

export default Upvotes;