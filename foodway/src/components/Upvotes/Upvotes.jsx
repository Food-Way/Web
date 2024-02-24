import React from "react";
const UpvoteIcon = "https://foodway.blob.core.windows.net/public/upvotes.svg";
import "./Upvotes.css";
import api_call from "../../services/apiImpl";

const Upvotes = (props) => {

    async function handleUpvotes(idComment, idEstablishment, idCustomer) {
        const response = await api_call("patch", "upvotes", {
            idCustomer: `${idCustomer}`,
            idEstablishment: `${idEstablishment}`,
            idComment: `${idComment}`,
        }, atob(sessionStorage.getItem("token")));
        console.log("upvotado", response);
    }

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