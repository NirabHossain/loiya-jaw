import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './Destination.css';
import car from './../../images/car.png';
import bus from './../../images/bus.png';
import bike from './../../images/bike.png';
import train from './../../images/train.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useGeoPosition from '../useGeoPosition/useGeoPosition';

const Destination = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let getVehicle = useParams();
    if (!getVehicle.vehicle) getVehicle = { vehicle: 'car' };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [place, setPlace] = useState({ From: 'Mirpur', Destination: 'Shahbagh', vehicle: `${getVehicle.vehicle}` });

    const images = { bike: bike, car: car, bus: bus, train: train };
    const passengers = { bike: 1, car: 3, bus: 15, train: 55 };
    const fare = { bike: 25, car: 67, bus: 285, train: 5500 };
    const apiKey = 'AIzaSyCdKueo2NqYpKSDYMoiIuz_avU23KuTR-c';
    const geoApi=  'AIzaSyCdKueo2NqYpKSDYMoiIuz_avU23KuTR-c';
    const center = { lat: 23.8, lng: 90.4 };
    const shahbagh = {lat: 23.74, lng: 90.39};
    const mirpur1 = {lat: 23.79, lng: 90.35};
    const containerStyle = {
        width: '600px',
        height: '600px'
    };


    const placeHandler = e => {
        const newPlace = { ...place };
        const { name, value } = e.target;
        newPlace[name] = value;
        setPlace(newPlace);
    }

    const onSubmit = data => console.log(data);

    const { displayName } = loggedInUser;
    const { From, Destination, vehicle } = place;

    // const [position, geoloading, geoerror] = useGeoPosition(apiKey,'Boyd St,Long Beach');


    return (
        <div className='row'>
            <div className='formInfo col-md-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='goForm'>

                    <p>Name</p>
                    <input defaultValue={displayName} {...register("Name", { required: true })} />
                    {errors.exampleRequired && <span>Name is required</span>}

                    <p>Pickup location</p>
                    <input defaultValue={From} {...register("From", { required: true })} onBlur={placeHandler} />
                    {errors.exampleRequired && <span>Pickup location is required</span>}

                    <p>Destination</p>
                    <input defaultValue={Destination} {...register("Destination", { required: true })} onBlur={placeHandler} />
                    {errors.exampleRequired && <span>Destination is required</span>}

                    <p>Vehicle</p>
                    <input defaultValue={vehicle} {...register("vehicle", { required: true })} onBlur={placeHandler} />
                    {errors.exampleRequired && <span>Destination is required</span>}

                    <p></p>
                    <input type="submit" value='Search' />

                </form>
                <div className='border-rounded'>
                    <ul>
                        <li>{place.From}</li>
                        <li>{place.Destination}</li>
                    </ul>
                    <div className='d-flex flex-sm-row bg-light text-dark border border-rounded justify-content-between align-items-center'>
                        <div className='d-flex'>
                            <img src={images[vehicle]} alt="" width='50px' />
                            <h4>{vehicle}</h4>
                        </div>
                        <div className='d-flex align-items-baseline'>
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                            <h3>{passengers[vehicle]}</h3>
                        </div>
                        <h4>${fare[vehicle]}</h4>
                    </div>
                </div>

            </div>
            <div className="mapInfo col-md-6">
                <h1>This is map information</h1>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    <Marker position={shahbagh} />
                    {/* <Marker position={shahbagh} /> */}
                    <Marker position={mirpur1} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Destination;