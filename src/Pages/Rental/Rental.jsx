import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.scss";
import Accordion from "../../Components/Accordion/Accordion";

const Rental = () => {
    const { logementId } = useParams();
    const [rental, setRental] = useState();
    const [sliderIndex, setSliderIndex] = useState(0);
    const [stars, setStars] = useState([
        "gray",
        "gray",
        "gray",
        "gray",
        "gray",
    ])

    useEffect(() => {
        getRental()
    }, [])

    const getRental = async () => {
        try {
            const response = await fetch(`https://titi.startwin.fr/logements/${logementId}`);
            const data = await response.json();

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
            // La fonction fill permet de remplacer les elements d'un tableau par la valeur que l'on souhaite
            // en partant de la position du tableau que l'on souhaite et pour le nombre d'element que l'on souhaite
            // Donc ici, je remplace les valeurs "gray" par "orange" en partant du début du tableau
            // et pour les x prochains elements, x etant data.rating, donc la note de la location
            // Donc si j'ai 3 en note, j'aurai 3 oranges et 2 gris dans mon tableau
            // Le fill() ne fonctionne que si il y a deja des valeurs à remplacer
            // Sans valeurs, ne fill ne fonctionne pas
            setStars(stars.fill("orange", 0, data.rating));

            // Autre façon de faire, faire une boucle de 1 à 5 (ou 0 a 4)
            // Ajouter les classes orange si i est inferieur à la note de la location
            // Sinon ajouter la classe gray
            // Cela permet de partir d'un tableau vide par contre
            // for (let i = 0; i < 5; i++) {
            //     if (i < data.rating) {
            //         setStars(current => [...current, 'orange'])
            //     } else {
            //         setStars(current => [...current, 'gray'])
            //     }
            // }
            setRental(data);
        } catch (error) {
            console.error(error);
        }
    }

    const prev = () => {
        // Si mon sliderIndex est 0 ou moins
        if (sliderIndex <= 0) {
            // Alors je repart de la fin de mon tableau 
            // Que je récupère en prenant le nombre d'element de mon tableau (.length)
            // et en retirant 1, car on commence à compter de 0 et pas 1
            // Sinon il va mettre en index 5 par exemple, car il y a 5 elements dans mon tableau
            // Mais les elements sont 0=> 1=> 2=> 3=> 4=> (ce qui fait 5 elements)

            setSliderIndex(rental.pictures.length - 1);
        } else {
            // Sinon, je retire simplement 1 a mon index pour afficher l'image précédente
            setSliderIndex(sliderIndex - 1)
        }
    }

    const next = () => {
        // Si mon sliderIndex est superieur ou egale a la longueur du tableau
        // Alors nous avons dépassé le dernier element du tableau
        // Donc on reviens a 0
        if (sliderIndex >= rental.pictures.length - 1) {
            setSliderIndex(0);
        } else {
            // Sinon on passe a la slide suivante
            setSliderIndex(sliderIndex + 1)
        }
    }

    if (!rental) {
        return <p>Chargement...</p>
    }

    return (
        <div className="rental">
            {/* Pour afficher un diaporama : */}
            {/* Mettre une div, avec une balise image a l'interieur*/}
            {/* deux balises pour les fleches suivant et precedent */}
            {/* Avoir un state index qui va nous permettre de parcourir notre tableau */}
            {/* Le state index sera par defaut à 0 pour afficher la premiere image du tableau*/}
            {/* L'image a afficher sera toujours rental.pictures[index] */}
            {/* Appuyer sur la fleche suivant va incrementer l'index, et inversement pour la fleche precedent */}
            {/* Si l'index dépasse le nombre d'element du tableau, alors elle reviens a 0 */}
            {/* Si l'index est inferieur a 0, alors l'index repart de la fin du tableau */}
            {/* Vous devez utiliser .length */}
            <div className="rental__slider">
                <img className="arrow left" onClick={prev} src="/left.svg" alt="Fleche gauche" />
                <img className="rental__slider-image" src={rental.pictures[sliderIndex]} alt={rental.title} />
                <img className="arrow right" onClick={next} src="/right.svg" alt="Fleche droite" />
            </div>
            <div className="rental__infos">
                <div className="rental__infos-left">
                    <h1>{rental.title}</h1>
                    <h2>{rental.location}</h2>
                    <div className="rental__infos-left--tags">
                        {rental.tags.map(tag => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="rental__infos-right">
                    <div className="rental__infos-right-host">
                        <h2>
                            {rental.host.name.split(' ').map(name => (
                                <span key={name}>{name} </span>
                            ))}
                        </h2>
                        <img src={rental.host.picture} alt={rental.host.name} />
                    </div>
                    <div className="rental__infos-right-rating">
                        {stars.map((star, index) => (
                            // Ici, chaque element est soit gray, sois orange, ce qui me servira de class à ajouter sur mon SVG pour changer la couleur de remplissage
                            <svg key={index} className={star} xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                        ))}
                    </div>
                </div>

            </div>
            <div className="rental__accordions">
                <Accordion title="Description" content={rental.description} />
                <Accordion title="Équipements" content={rental.equipments} />
            </div>
        </div>
    );
};

export default Rental;