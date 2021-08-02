import React from 'react';
import car from './../../images/car.png';
import train from './../../images/train.png';
import bus from './../../images/bus.png';
import bike from './../../images/bike.png';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const images = {bike:bike, car:car, bus:bus, train:train};
    const keys = Object.keys(images);
    // let count=1;
    return (
        <div className="container">
            <div className="row justify-content-around">
                {keys.map(key=><div  className='col-md-3 p-5'  key={key} ><Link to={`/destination/${key}`} style={{textDecoration:'none', color: 'black'}}><Card image={images[key]} vehicle={key}/></Link></div>)}
            </div>
        </div>
    );
};
export default Home;