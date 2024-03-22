import React from "react";
const UpvoteIcon = "https://foodway-public-s3.s3.amazonaws.com/website-images/upvotes.svg";
import "./Upvotes.css";
import api_call from "../../services/apiImpl";

const Upvotes = (props) => {
    async function handleUpvotes(idComment, idEstablishment, idCustomer) {
        console.log(idComment);
        console.log(idEstablishment);
        console.log(idCustomer);
        const response = await api_call("patch", "upvotes", {
            idCustomer: `${idCustomer}`,
            idEstablishment: `${idEstablishment}`,
            idComment: `${idComment}`,
        }, atob(sessionStorage.getItem("token")));
        console.log("upvotado", response);
    }

    return (
        <>
            <div className="upvotes" onClick={sessionStorage.getItem('token') == true && atob(sessionStorage.getItem('typeUser') == 'CUSTOMER') ? ()=>{handleUpvotes(props.idComment, props.idEstablishment, props.idCustomer)} : null}>
                <img src={UpvoteIcon} alt="" />
                <span>{props.upvotes ? props.upvotes : 0}</span>
            </div>
        </>
    )
}

export default Upvotes;