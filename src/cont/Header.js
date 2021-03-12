import React, {useState, useContext} from "react";
import {MyContext} from '../context'
import {NavLink} from 'react-router-dom'

export default () => {
    const [toggAdaptMenu, setToggAdaptMenu] = useState(false);
    const [toggPoisk, setToggPoisk] = useState(false);   
    function lopa() { toggPoisk ? setToggPoisk(false) : setToggPoisk(true); }
    
    const {useSetText, text} = useContext(MyContext);
    function update(event) { useSetText(event.target.value); }
    function ent(e) {
        if (e.keyCode === 13) {
            lopa();
        }
    }
    function krestik() {
        lopa();
        useSetText('');
    }

    return (
        <header className="header">
            <h2>РАСПИСАНИЕ МАТЧЕЙ</h2>
            <button type="button" className="burger" onClick={() => setToggAdaptMenu(true)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav id={toggAdaptMenu ? "header-nav--on" : "header-nav--off"}>
                <div className="adapt_men_head">
                    <h2>Меню</h2>
                    <i className="fas fa-times fa-lg" onClick={() => setToggAdaptMenu(false)}></i>
                </div>
                <ul>
                    <li><NavLink to="/today" id="current">Все</NavLink></li>
                    <li><NavLink to="/today">Live</NavLink></li>
                    <li><NavLink to="/today">Результаты</NavLink></li>
                    <li><NavLink to="/today">Расписание</NavLink></li>
                    <li><NavLink to="/today">Прогнозы</NavLink></li>
                </ul>
            </nav>
            <div>
                <div>
                    <div id={toggPoisk ? "poisk--on" : "poisk--off"}>
                        <i className="fas fa-times fa-lg" style={toggPoisk ? {display: 'block'} : {display: 'none'}} onClick={krestik} ></i>
                        <input 
                            type="text" 
                            placeholder="Search.." 
                            value={text} 
                            onChange={update} 
                            onKeyDown={ent} 
                            style={toggPoisk ? {display: 'block'} : {display: 'none'}}
                        ></input>
                        <i 
                            className="fas fa-arrow-alt-circle-right" 
                            id={(text !== '') && (toggPoisk) ? "knopochkavmestoenteron" : "knopochkavmestoenteroff"}
                            onClick={lopa}
                        ></i>
                    </div>
                    <i className="fas fa-search fa-lg" onClick={lopa}></i>
                </div>
                <button>Войти</button>
            </div>
        </header>
    )
}
