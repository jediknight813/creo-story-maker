import React from "react";
import '../Styles/HeaderStyles.css'


function Header() {


    return (
        <div className="header_container">
            <h1>Creo Story Maker</h1>
            <a href="https://github.com/jediknight813">
                <i className="fa fa-github-square"></i>
            </a>
        </div>
    )
}


export default Header