    import { React, useEffect, useState } from "react";
    import CheckboxSelect from "../../components/CheckboxSelect/CheckboxSelect";

    import "./TagDashCard.css";

    function TagDashCard() {

        function openTag() {
            return (
                <>
                    <CheckboxSelect
                        selectedValues={""}
                        setSelectedValues={""}
                        selectedCulinaries={""}
                        setSelectedCulinaries={""}
                    />
                </>
            )
        }

        return (
            <>
                <div className="tag-dash-container">
                    <div className="selection-tag-box">
                        <span className="title-selection-tag">Tags escolhidas</span>
                        <div className="btn-dash-tag" onClick={() => openTag()}>
                            <span>Selecionar tag</span>
                        </div>
                    </div>
                    <div className="tag-dash-itens">
                        <div className="tag-dash-item">
                            <span>Tag 1</span>
                        </div>
                        <div className="tag-dash-item">
                            <span>Tag 1</span>
                        </div>
                        <div className="tag-dash-item">
                            <span>Tag 1</span>
                        </div>
                        <div className="tag-dash-item">
                            <span>Tag 1</span>
                        </div>
                        <div className="tag-dash-item">
                            <span>Tag 1</span>
                        </div>
                        <div className="tag-dash-item">
                            <span>Tag 1</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default TagDashCard;