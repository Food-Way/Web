import React from "react";
import ReactStars from "react-rating-stars-component";
import Comments from "../Comments/Comments";
import Upvotes from "../Upvotes/Upvotes";
import CulinaryTag from "../CulinaryTag/CulinaryTag";
import { ButtonPrimaryLink } from "../Button/Button";

import "./SearchDetails.css";

const SearchDetails = () => {
    const LogoFoodway = "https://foodway.blob.core.windows.net/public/FoodWayLogo.png"

    return (
        <>
            <div className="search-details-container">
                <div className="search-details-box">
                    <div className="search-detail-header">
                        <div className="left-header-side">
                            <img src={LogoFoodway} alt="" />
                            <CulinaryTag />
                        </div>
                        <div className="middle-header-side">
                            <span className="user-detail-name">Leo</span>
                            <div className="rate-detail-user">
                                <span className="user-rate-number">5.0</span>
                                <ReactStars
                                    count={1}
                                    edit={true}
                                    size={24}
                                    value={1}
                                    isHalf={false}
                                    activeColor="#ff0000"
                                />
                            </div>
                        </div>
                        <div className="right-header-side">
                            <Upvotes />
                            <Comments />
                        </div>
                    </div>
                    <div className="search-detail-body">
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                    <div className="search-detail-footer">
                        {/* <ButtonPrimaryLink text="Acessar" /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchDetails;