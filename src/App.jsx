import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import "./global.scss";
import About from './Pages/About/About';
import Error from './Pages/Error/Error';
import Home from './Pages/Home/Home';
import Rental from './Pages/Rental/Rental';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/location/:logementId" element={<Rental />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
