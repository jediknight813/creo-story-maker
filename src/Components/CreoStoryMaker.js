import React, { useState } from "react";
import '../Styles/CreoStoryMakerStyles.css'


function CreoStoryMaker() {
    const [required_info_submited, set_required_info_submited] = useState(false)
    

    function GetRequiredInfoSubmited(){
        if (required_info_submited === false) {
            return(
                <div className="required_info_for_crea_container">
                    <div className="required_info_for_crea_column_container">

                        <h1> Setup </h1>
                        <h4> paste game data here </h4>

                        <div>
                            <input type={"text"}/>
                            <button onClick={() => set_required_info_submited(true)}> submit </button>
                        </div>

                </div>
            </div>
            )
        }
        else{
            return( 
                <div> </div>
            )
        }
    }

    return (
        <div className="Creo_Story_Maker_Container">

            <GetRequiredInfoSubmited />

            <div className="navbar_container">
                <button onClick={() => set_required_info_submited(false)}> resubmit game data </button>
            </div>

        </div>
    )
}


export default CreoStoryMaker