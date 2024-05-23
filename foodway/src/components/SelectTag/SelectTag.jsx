import React from "react";

const SelectTag = (props) => {

    return (
        <>
            <div className="select-tag-container">
                <div className="select-tag-box">
                    <div className="select-tag-title">
                        <span>Tags</span>
                    </div>
                    <div className="select-tag-content">
                        <div className="select-tag-item">
                            <span>Tag 1</span>
                        </div>
                        <div className="select-tag-item">
                            <span>Tag 2</span>
                        </div>
                        <div className="select-tag-item">
                            <span>Tag 3</span>
                        </div>
                        <div className="select-tag-item">
                            <span>Tag 4</span>
                        </div>
                        <div className="select-tag-item">
                            <span>Tag 5</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};