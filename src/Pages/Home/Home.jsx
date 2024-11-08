import Banner from "../../Components/Banner/Banner";
import { useState, useEffect } from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';

const Home = () => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        getRentals();
    }, [])

    const getRentals = async () => {
        try {
            const response = await fetch("https://titi.startwin.fr/logements");

            const data = await response.json();
            setRentals(data);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="home">
            <Banner image="/cote.webp" alt="cote" text="Chez vous, partout et ailleurs" />
            <div className="home__list">
                {rentals.map(rental => (
                    // `/location/${rental.id}`
                    // '/location/' + rental.id
                    <Link to={`/location/${rental.id}`} className="home__list-item" key={rental.id}>
                        <img src={rental.cover} alt={rental.title} />
                        <div className="home__list-item-absolute">
                            <h2>{rental.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;