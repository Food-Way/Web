import "./SentimentTag.css";

const Positive = () => {
    return (
        <>
            <div className="sentiment-tag positive">
                <span className="sentiment-label">Muito bom!! :)</span>
            </div>
        </>
    )
}

const Neutral = () => {
    return (
        <>
            <div className="sentiment-tag neutral">
                <span className="sentiment-label">Interessante -_-</span>
            </div>
        </>
    )
}

const Negative = () => {
    return (
        <>
            <div className="sentiment-tag negative">
                <span className="sentiment-label">Muito ruim :(</span>
            </div>
        </>
    )
}

export {Neutral, Negative, Positive};