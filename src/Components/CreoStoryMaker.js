import React, { useState } from "react";
import '../Styles/CreoStoryMakerStyles.css'


function CreoStoryMaker() {
    const [required_info_submited, set_required_info_submited] = useState(false)
    const [current_action_type, set_current_action_type] = useState("dialog")
    const [required_gamedata, set_required_gamedata] = useState(undefined)

    const [story_data, set_story_data] = useState({"act_one": [{"scene_one": []  }, {"scene_two": []  }], "act_two": [{"ending": []  }] })
    const [current_act, set_current_act] = useState("act_one")
    const [current_scene, set_current_scene] = useState("scene_one")


    function put_all_acts_onto_list() {
        let to_return = []
        for (let i in story_data) {
            to_return.push(i)
        }
        return to_return
    }

    function put_current_act_scenes_into_list() {
        let data_to_return = []
        for (let i in story_data[current_act]) {
            for (let j in story_data[current_act][i]) {
              data_to_return.push(j)
            }
          }
        return data_to_return
    }


    const [force_update, start_force_update] = useState(1)


    function add_act_to_story_data(act_name){

        let data_to_update = story_data

        data_to_update[act_name] = []
        document.getElementById("act_name_id").value = ""
        start_force_update(force_update+1)

        set_story_data(data_to_update)
    }


    function add_scene_to_current_act(scene_name) {
        console.log(document.getElementById("scene_name_id").value)

        console.log(story_data)

        let data_to_update = story_data

        data_to_update[current_act].push({[scene_name]: []})

        console.log(data_to_update)

        document.getElementById("scene_name_id").value = ""
        start_force_update(force_update+1)
    }


    function ShowCurrentActions() {

        if (required_gamedata !== undefined) {

            var obj = JSON.parse(required_gamedata.replace(/'/g, '"'));
            //console.log(obj["names"])
            

            if (current_action_type === "dialog") {
                return(
                    <div className="actions_sorter_and_container">
                        
                        
                        <div className="small_actions_background_container">
                            <h2> dialog </h2>

                            <div>
                                <h2> name </h2> 
                                <input type={"text"} />
                                <h2> sprite </h2>

                                <select>
                                    {obj["names"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>

                            </div>

                            <div>
                                <h2> dialog </h2> 
                                <input style={{width: "75%"}} type={"text"} />
                            </div>

                            <div>
                                <h2> expressions </h2>
                                <select>
                                    {obj["expressions"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <button> add </button>

                        </div>

                    </div>
                )
            }

            if (current_action_type === "background") {
                return(
                    <div className="actions_sorter_and_container">
                        
                    </div>
                )
            }

            if (current_action_type === "sound") {
                return(
                    <div className="actions_sorter_and_container">

                    </div>
                )
            }

            if (current_action_type === "influence") {
                return(
                    <div className="actions_sorter_and_container">

                    </div>
                )
            }

            if (current_action_type === "choice") {
                return(
                    <div className="actions_sorter_and_container">

                    </div>
                )
            }

        }
        else {
            return (
                <div>

                </div>
            )
        }

    }


    function GetRequiredInfoSubmited(){
       
        if (required_info_submited === false) {
            return(
                <div className="required_info_for_crea_container">
                    <div className="required_info_for_crea_column_container">

                        <h1> Setup </h1>
                        <h4> paste game data here </h4>

                        <div>
                            <input onChange={event => {set_required_gamedata(event.target.value); set_required_info_submited(true)}} id="required_gamedata" type={"text"}/>
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
                <button> documentation </button>
            </div>


            <div className="action_parent_container"> 
                <h1> Actions </h1>

                <div className="action_type_button_container">
                    <button onClick={() => set_current_action_type("background")}> background </button>
                    <button onClick={() => set_current_action_type("dialog")}> dialog </button>
                    <button onClick={() => set_current_action_type("sound")}> sound </button>
                    <button onClick={() => set_current_action_type("influence")}> influence </button>
                    <button onClick={() => set_current_action_type("choice")}> choice </button>
                </div> 


                <ShowCurrentActions />

            </div>



            <div className="acts_and_scenes_container">
                <h1> acts </h1>

                <div className="acts_container">


                    {put_all_acts_onto_list().map(Element =>
                        <div className="act_and_scene_item_container"> 
                            <h1> {Element} </h1>
                            <button onClick={() => set_current_act(Element)}> select </button>
                            <button> delete </button>
                        </div>
                    )}


                    <div className="add_act_button_container">
                        <input id="act_name_id" type={"text"}/>
                        <button onClick={() => add_act_to_story_data(document.getElementById("act_name_id").value)}> add </button>
                    </div>
                    
                </div>

                <h1> scenes </h1>

                <div className="scenes_container">
                    
                    {put_current_act_scenes_into_list().map(Element =>

                        <div className="act_and_scene_item_container"> 
                            <h1> {Element} </h1>
                            <button onClick={() => set_current_scene(Element)}> select </button>
                            <button> delete </button>
                        </div>

                    )}


                    <div className="add_act_button_container">
                        <input id="scene_name_id" type={"text"}/>
                        <button onClick={() => add_scene_to_current_act(document.getElementById("scene_name_id").value)}> add </button>
                    </div>

                </div>

                <button>copy story </button>

            </div>



            <h1 style={{marginTop: "4000px", position: "absolute"}}> hello </h1>
        </div>
    )
}


export default CreoStoryMaker