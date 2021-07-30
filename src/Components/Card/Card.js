import React from 'react';
import './Card.css';

const Card = ({ image, vehicle }) => {
    return (
        <div className="card" style={{ padding: '20px', borderRadius: '10px', minHeight:'250px'}}>
            <img className="card-img-top" src={image} alt="Card cap" />
            <div className="card-body">
                <h5 className="card-title text-center"><strong>{vehicle.toUpperCase()}</strong></h5>
            </div>
        </div>
    );
};

export default Card;

