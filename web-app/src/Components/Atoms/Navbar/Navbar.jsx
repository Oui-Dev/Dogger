import { useState, useEffect } from 'react';
import logo from '../../../images/logo.png';
import { BsList, BsX } from "react-icons/bs";
import './Navbar.scss';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [navBarBg, setNavbarBg] = useState('light');

    const switchState = () => () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    });

    const changeBackground = () => {
        const navbar = document.querySelector('header');
        const sidebar = document.getElementById('sidebar');

        let y = 1 + (window.scrollY || window.pageYOffset) / 35;
        y = y < 1 ? 1 : y; // ensure y is always >= 1 (due to Safari's elastic scroll)
        let color = `rgb(${255/y}, ${255/y}, ${255/y})`;
        navbar.style.backgroundColor = color;
        sidebar.style.backgroundColor = color;

        setNavbarBg(window.scrollY > 10 ? 'dark' : 'light');
    };

    return (
        <header className={navBarBg}>
            {/* Laptop */}
            <nav className="hidden lg:flex">
                <div className="logo-side">
                    <a href="/">
                        <img src={logo} className="w-14" alt="Logo Dogger" />
                    </a>
                </div>

                <div className="menu-side">
                    <a href="">Projects</a>
                    <a href="">Errors</a>
                    <a href="">Profile</a>
                </div>

                <div className="button-side">
                    <a href="" className="menu-button">Déconnexion</a>
                </div>
            </nav>

            {/* Tablet and mobile */}
            <nav className="flex lg:hidden">
                <div className="logo-side">
                    <a href="/">
                        <img src={logo} className="w-10 md:w-12" alt="Logo Dogger" />
                    </a>
                </div>

                <div className="button-side">
                    { isOpen ? <BsX onClick={switchState()} className="text-2xl" /> : <BsList onClick={switchState()} className="text-2xl" /> }
                </div>

                <div className="absolute top-16 -mt-px right-0 z-10 w-screen max-w-lg">
                    <div className={`overflow-hidden shadow-lg rounded-b-lg border-t border-lockanda-gray ${isOpen ? "" : "reduced"}`} id="sidebar">
                        <div className="relative grid gap-6 px-5 py-5 text-sm md:text-base">
                            <a href="">Projects</a>
                            <a href="">Errors</a>
                            <a href="">Profile</a>
                        </div>
                        <div className="px-5 py-5 grid grid-cols-2 gap-5">
                            <a href="" className="menu-button orange">Déconnexion</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
