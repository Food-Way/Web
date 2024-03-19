import ReactStars from "react-rating-stars-component";
import './ReactStars.css'
import { useState, useEffect } from "react";
const ratingTexts = {
    0.5: 'A Melhorar',
    1: 'Pouco Eficaz',
    1.5: 'Insatisfatório',
    2: 'Insatisfatório+',
    2.5: 'Aceitável',
    3: 'Aceitável+',
    3.5: 'Bom',
    4: 'Muito Bom',
    4.5: 'Excelente',
    5: 'Excepcional',
};

const StarEstablishment = ({ type, value, onChange }) => {
    const [ratingText, setRatingText] = useState('');

    // Atualiza o texto da avaliação sempre que o valor muda
    useEffect(() => {
        setRatingText(ratingTexts[value] || '');
    }, [value]);

    return (
        <div className='rate-select'>
            <p>{type}</p>
            <div className="star-component">
                <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ed0000"
                    value={value}
                    onChange={(newValue) => {
                        onChange(newValue);
                        setRatingText(ratingTexts[newValue]);
                    }}
                    isHalf={true}
                />
                <p>{ratingText}</p></div>
        </div>
    );
};

export { StarEstablishment };