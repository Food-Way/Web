import React from "react";
const UpvoteIcon = "https://foodway-public-s3.s3.amazonaws.com/website-images/upvotes.svg";
import "./Upvotes.css";
import api_call from "../../services/apiImpl";
import { hasValidSession } from "../Auth/Auth.jsx"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Upvotes = (props) => {
    const navigate = useNavigate();
    async function handleUpvotes(idComment, idEstablishment, idCustomer) {
        console.log("idComment: " + idComment);
        console.log("idEstablishment " + idEstablishment);
        console.log("idCustomer" + idCustomer);
        const response = await api_call("patch", "upvotes", {
            idCustomer: `${idCustomer}`,
            idEstablishment: `${idEstablishment}`,
            idComment: `${idComment}`,
        }, atob(sessionStorage.getItem("token")));
        console.log("upvotado", response);
    }

    return (
        <>
            <div className="upvotes" onClick={() => {
                if (!sessionStorage.getItem("token")) {
                    hasValidSession(navigate);
                }
                if (atob(sessionStorage.getItem('typeUser')) != 'CLIENT') {
                    toast.info("Somente clientes podem realizar upvotes")
                }
                else {
                    handleUpvotes(props.idComment, props.idEstablishment, props.idCustomer)
                }
            }}>
                <img src={UpvoteIcon} alt="" />
                <span>{props.upvotes ? props.upvotes : 0}</span>
            </div >
        </>
    )
}

export default Upvotes;