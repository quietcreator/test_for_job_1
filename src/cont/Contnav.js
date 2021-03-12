import React from "react";
import {NavLink} from 'react-router-dom'

export default (props) => {
    const activeStyle = {
        color: 'black', 
        borderBottom: '2px solid #1E99C7'
    }
    let segodnia = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(segodnia);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(segodnia);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(segodnia);
    const str1 = `${da} ${mo} ${ye}`;
    
    return (
        <nav className="top-nav">
            <NavLink to="/today" activeStyle={activeStyle}>Сегодня<span>{props.se}</span></NavLink>
            { props.za !== 0 ? <NavLink to="/tomorrow" activeStyle={activeStyle}>Завтра<span>{props.za}</span></NavLink> : ''}
            <NavLink to="/all_matches" activeStyle={activeStyle}>Все матчи<span>{props.vse}</span></NavLink>
            <div>
                <i className="far fa-calendar-check fa-lg qwerty"></i>
                <span className="qwerty qwerty--r">{str1}</span>
            </div>
        </nav>
    )
}