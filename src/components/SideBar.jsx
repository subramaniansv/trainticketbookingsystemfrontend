import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { PanelRight } from 'lucide-react';
import "./styles/sidebar.css"
const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="toggle-button" onClick={toggleSidebar}>
                         <PanelRight />
                </button>
                <nav className="sidebar-nav">
                    <ul>
                        <NavLink to="/" className="nav-link" activeClassName="active-link" onClick={toggleSidebar}>
                            Home
                        </NavLink>
                        <NavLink to="/history" className="nav-link" activeClassName="active-link" onClick={toggleSidebar}>
                            History
                        </NavLink>
                        <NavLink to="/admin" className="nav-link" activeClassName="active-link" onClick={toggleSidebar}>
                            Admin
                        </NavLink>
                    </ul>
                </nav>
            </div>
        
        
        </>



    );



}
export default SideBar;