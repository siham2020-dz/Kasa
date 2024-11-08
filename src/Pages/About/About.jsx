import Banner from "../../Components/Banner/Banner";
import "./index.scss";
import Accordion from "../../Components/Accordion/Accordion";

const About = () => {
    return (
        <div className="about">
            <Banner image="/montagne.webp" alt="montagne" />

            <div className="about__content">
                <Accordion title="Fiabilité" content="lorem ipsum" />
                <Accordion title="Respect" content="lorem ips" />
                <Accordion title="Service" content="lorem ips" />
                <Accordion title="Sécurité" content="lorem ipsum " />
            </div>
        </div>
    );
};

export default About;