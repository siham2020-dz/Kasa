import "./index.scss";
import { useState } from 'react';

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="accordion">
            <div className="accordion__top" onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <img className={isOpen ? 'active' : ''} src="/top.svg" alt="Fleche" />
            </div>
            <div className={"accordion__bottom " + (isOpen ? "active" : "")}>
                {Array.isArray(content) ? content.map((element, index) => (
                    <p key={index}>{element}</p>
                )) : <p>{content}</p>}
            </div>
        </div>
    );
};

export default Accordion;