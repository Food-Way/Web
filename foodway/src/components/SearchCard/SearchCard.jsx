import React from "react";
import ReactStars from "react-rating-stars-component";
import Comments from "../Comments/Comments";
import Upvotes from "../Upvotes/Upvotes";
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import starBlack from "../../../public/star-black.svg";
import "./SearchCard.css";

const SearchCard = (props) => {
    const LogoFoodway = "https://foodway.blob.core.windows.net/public/FoodWayLogo.png"
    return (
        <>
            <div className="card-container">
                <div className="card-box">
                    <div className="card-header">
                        <img src={LogoFoodway} alt="" className="card-image" />
                    </div>
                    <div className="card-body">
                        <span className="user-title">Figueira Rubaiyat</span>
                        <span className="user-subtitle">Restaurante japônes</span>
                        <ReactStars
                            count={5}
                            edit={false}
                            size={20}
                            value={5}
                            isHalf={true}
                            activeColor={"#222"}
                        />
                        <p className="user-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ratione tempore laborum id rem ipsum in, a expedita, delectus libero enim rerum debitis blanditiis reiciendis est repudiandae aspernatur nihil eum?</p>
                    </div>
                    <div className="card-footer">
                        <div className="rate-box">
                            <Comments />
                            <Upvotes />
                        </div>
                        <div className="card-footer-box">
                            <div className="favorite">
                                <ReactStars
                                    count={1}
                                    edit={true}
                                    size={24}
                                    value={1}
                                    isHalf={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchCard;