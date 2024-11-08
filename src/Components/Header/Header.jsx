import "./index.scss";
// NavLink permet de faire des liens entre les différentes pages définies dans le App.jsx, notre router
// NavLink ajoute automatiquement une classe "active" sur le lien quand l'url courrante correspond a l'url dans le to=""
// Link, lui, ne permet que de faire des liens entre les différentes pages mais n'ajoute pas de classes
// NavLink est donc principalement utilisé dans le header, généralement il est inutile dans les autres pages
import { NavLink, Link } from 'react-router-dom';
const Header = () => {
    return (
        <header className="header">
            {/* Le NavLink et le Link sont comme des a href="" mais s'appellent Link to="", sinon le fonctionnement est le même */}
            {/* Le code généré sera d'ailleurs des a href="" mais React comprendra que ce sont pas des liens classiques */}
            <Link to="/">
                <img src="/logo.svg" alt="Logo kasa" />
            </Link>

            <nav>
                <NavLink to="/">Accueil</NavLink>
                <NavLink to="/a-propos">A propos</NavLink>
            </nav>
        </header>
    );
};

export default Header;