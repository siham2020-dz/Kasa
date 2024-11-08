import "./index.scss";

const Banner = ({ image, alt, text }) => {
    return (
        <div className="banner">
            <img src={image} alt={alt} />
            <div>
                {text &&
                    <h1>{text}</h1>
                }
            </div>
        </div>
    );
};

export default Banner;