import { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
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
                    <Link to="/">
                        <img src={logo} className="w-14" alt="Logo Dogger" />
                    </Link>
                </div>

                <div className="menu-side">
                    <NavLink to="/projects" className={({ isActive }) => (isActive ? 'text-dogger-orange-500' : '')}>Projects</NavLink>
                    <NavLink to="/errors" className={({ isActive }) => (isActive ? 'text-dogger-orange-500' : '')}>Errors</NavLink>
                    <NavLink to="/profile" className={({ isActive }) => (isActive ? 'text-dogger-orange-500' : '')}>Profile</NavLink>
                </div>

                <div className="button-side">
                    <Link to="" className="menu-button">Déconnexion</Link>
                </div>
            </nav>

            {/* Tablet and mobile */}
            <nav className="flex lg:hidden">
                <div className="logo-side">
                    <Link to="/">
                        <img src={logo} className="w-10 md:w-12" alt="Logo Dogger" />
                    </Link>
                </div>

                <div className="button-side">
                    { isOpen ? <BsX onClick={switchState()} /> : <BsList onClick={switchState()} /> }
                </div>

                <div className="absolute top-16 -mt-px right-0 z-10 w-screen max-w-lg">
                    <div className={`overflow-hidden shadow-lg rounded-b-lg border-t border-lockanda-gray ${isOpen ? "" : "reduced"}`} id="sidebar">
                        <div className="relative grid gap-6 px-5 py-5 text-sm md:text-base">
                            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'text-dogger-orange-500' : '')}>Projects</NavLink>
                            <NavLink to="/errors" className={({ isActive }) => (isActive ? 'text-dogger-orange-500' : '')}>Errors</NavLink>
                            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'text-dogger-orange-500' : '')}>Profile</NavLink>
                        </div>
                        <div className="px-5 py-5 grid grid-cols-2 gap-5">
                            <Link to="" className="menu-button orange">Déconnexion</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
