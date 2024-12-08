import Style from './NavBar.module.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    const handleIsOpen = () => {
        if (!isOpen) {
            setIsOpen(true)
            setTimeout(() => inputRef.current.focus(), 0)
        }
    }

    const handleBlur = () => {
        setIsOpen(false)
    }

    return (
        <nav className={Style.navBar}>
            <div className={Style.imgDiv}>
                <img src='images/reddit-logo.png' onClick={() => navigate('/')} />
                <h2 onClick={() => navigate('/')}>Reddit Mini</h2>
            </div>
            <div className={Style.middle}>
                <div className={Style.inputContainer} onClick={handleIsOpen} style={!isOpen ? {'cursor': 'pointer'} : {'cursor': 'initial', 'padding': '8px 14px'} } >
                    <img src='images/lupa.png' className={Style.searchIcon} style={!isOpen ? {'margin-right': '0px'} : {'margin-right': '8px'}} />
                    <input type='text' placeholder='Search' className={Style.teste} ref={inputRef} onBlur={handleBlur} style={!isOpen ? {'width': '0px'} : {'width': '350px'}} /> 
                </div>
            </div>
            <div className={Style.end}>

            </div>
        </nav>
    );
};

export default NavBar;