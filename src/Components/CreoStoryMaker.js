import { isElementType } from "@testing-library/user-event/dist/utils";
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


    function remove_action_from_scene(action_id) {
        let data_to_update = story_data
        console.log(action_id)

        for (let index in story_data[current_act]) {
            for (let act_index in story_data[current_act][index]) {
                if (act_index === current_scene) {
                    //console.log(story_data[current_act][index][current_scene])
                    for (let scene_index in story_data[current_act][index][current_scene]) {
                        if (story_data[current_act][index][current_scene][scene_index]["action_id"] === action_id) {
                            data_to_update[current_act][index][current_scene].splice(scene_index, 1);
                            set_story_data(data_to_update)
                            start_force_update(force_update+1)
                        }
                    }
                }
            }
        }
    }


    function update_action_in_scene(updated_action) {
        let data_to_update = story_data

        for (let index in story_data[current_act]) {
            for (let act_index in story_data[current_act][index]) {
                if (act_index === current_scene) {
                    //console.log(story_data[current_act][index][current_scene])
                    for (let scene_index in story_data[current_act][index][current_scene]) {
                        if (story_data[current_act][index][current_scene][scene_index]["action_id"] === updated_action["action_id"]) {
                            
                            data_to_update[current_act][index][current_scene][scene_index] = updated_action
                            set_story_data(data_to_update)
                            //console.log(data_to_update[current_act][index][current_scene][index])
                            start_force_update(force_update+1)
                        }
                    }
                }
            }
        }

    }

    function array_move(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    };
    

    function move_action_down_in_scene(updated_action) {

        let data_to_update = story_data
    
            for (let index in story_data[current_act]) {
                for (let act_index in story_data[current_act][index]) {
                    if (act_index === current_scene) {
                        for (let scene_index in story_data[current_act][index][current_scene]) {
                            if (story_data[current_act][index][current_scene][scene_index]["action_id"] === updated_action["action_id"]) {
                                console.log(story_data[current_act][index][current_scene])

                                let current_scene_index = parseInt(scene_index ,10)
                                let new_scene_index = parseInt(scene_index ,10) + 1

                                
                                if (data_to_update[current_act][index][current_scene].length > new_scene_index && data_to_update[current_act][index][current_scene].length > current_scene_index) {
                                    data_to_update[current_act][index][current_scene] = (array_move(story_data[current_act][index][current_scene], current_scene_index, new_scene_index))
                                }

                                set_story_data(data_to_update)
                                start_force_update(force_update+1)
                                break
                            }
                        }
                    }
                }
            }
    
    }


function move_action_up_in_scene(updated_action) {

    let data_to_update = story_data

        for (let index in story_data[current_act]) {
            for (let act_index in story_data[current_act][index]) {
                if (act_index === current_scene) {
                    for (let scene_index in story_data[current_act][index][current_scene]) {
                        if (story_data[current_act][index][current_scene][scene_index]["action_id"] === updated_action["action_id"]) {
                            
                            //console.log(data_to_update[current_act][index][current_scene])
                            let x = scene_index
                            let m = scene_index
                            let current_scene_index = parseInt(x,10)
                            let new_scene_index = parseInt(m,10) - 1

                            if (new_scene_index === -1) {
                                new_scene_index = 0
                            }
                            //console.log(data_to_update[current_act][index][current_scene].length, new_scene_index, current_scene_index, " move up")

                            if (data_to_update[current_act][index][current_scene].length > new_scene_index && data_to_update[current_act][index][current_scene].length > current_scene_index) {
                                data_to_update[current_act][index][current_scene] = (array_move(story_data[current_act][index][current_scene], current_scene_index, new_scene_index))
                            
                            }
                            //console.log("one loop \n")
                            set_story_data(data_to_update)
                            start_force_update(force_update+1)
                        }
                    }
                }
            }
        }

}
    




    function check_if_act_is_selected(){
            let act_list = put_all_acts_onto_list()

            act_list.forEach(Element =>
                document.getElementById(Element).innerHTML = "select"
            )
            
            document.getElementById(current_act).innerHTML = "selected"
            document.getElementById(current_act).className = "selected_class_button"
    }

    function check_if_scene_is_selected() {
            let scene_list = put_current_act_scenes_into_list()

            scene_list.forEach(Element =>
                document.getElementById(Element).innerHTML = "select"
            )
            document.getElementById(current_scene).innerHTML = "selected"
    }


    function add_act_to_story_data(act_name){

        let data_to_update = story_data
        act_name = act_name.replace(/\s/g, '_')
        data_to_update[act_name] = []
        document.getElementById("act_name_id").value = ""
        start_force_update(force_update+1)

        set_story_data(data_to_update)
    }


    function remove_act_from_story_data(act_name) {
        let data_to_update = story_data
        delete data_to_update[act_name]
        set_story_data(data_to_update)
        start_force_update(force_update+1)
    }


    function remove_scene_from_act(scene_name) {
        let data_to_update = story_data

        for (let i in story_data[current_act]) {
            for (let j in story_data[current_act][i]) {
              if (j === scene_name){
                  data_to_update[current_act].splice(i, 1);
              }
            }
          }
        set_story_data(data_to_update)
        start_force_update(force_update+1)
    }


    function add_scene_to_current_act(scene_name) {

        let data_to_update = story_data
        scene_name = scene_name.replace(/\s/g, '_')

        data_to_update[current_act].push({[scene_name]: []})

        document.getElementById("scene_name_id").value = ""
        start_force_update(force_update+1)
    }


    function add_action_data_to_scene(action_data){
        let data_to_update = story_data

        for (let i in story_data[current_act]) {
            for (let j in story_data[current_act][i]) {
              if (j === current_scene){
                  story_data[current_act][i][current_scene].push(action_data)
              }
            }
          }
        set_story_data(data_to_update)
    }


    function get_action_data_and_send_it_to_be_added_to_scene(action_type){
        if (action_type === "dialog"){
            let name = document.getElementById("dialog_action_name").value
            let dialog_text = document.getElementById("dialog_action_dialog_text").value
            let sprite = document.getElementById("dialog_action_sprite").value
            let expression = document.getElementById("dialog_action_expression").value
            add_action_data_to_scene({"dialog": dialog_text, "character_sprite": sprite, "name": name, "expression": expression, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "dialog"})
        
            document.getElementById("dialog_action_name").value = ""
            document.getElementById("dialog_action_dialog_text").value = ""
            start_force_update(force_update+1)
        }
    }


    function copy_all_story_data_to_clipboard() {
        let data_to_copy_to_clipboard = ""
        let all_scenes = {}
        for (let a in story_data) {
            for (let i in story_data[a]) {
                for (let j in story_data[a][i]) {
                    let count = 0
                    data_to_copy_to_clipboard += "var " + j + " = "+ JSON.stringify(story_data[a][i][j]) + "\n"
                    //console.log(story_data[a][i][j])
                    for (let c in story_data[a][i][j]) {
                        story_data[a][i][j][c]["order_id"] = count
                        count += 1
                    }
                    all_scenes[j] = j
                }
            }
        }  

        data_to_copy_to_clipboard += "\n" + "\n" + "var " + "all_Scenes = " + JSON.stringify(all_scenes)
        //console.log(data_to_copy_to_clipboard)
        navigator.clipboard.writeText(data_to_copy_to_clipboard)

    }


    function List_of_current_scene_events() {
        let data_to_return = []
        
        for (let index in story_data[current_act]) {
            for (let act_index in story_data[current_act][index]) {
                if (act_index === current_scene) {
                    return story_data[current_act][index][current_scene]
                }
            }
        }
        
        console.log(data_to_return)
        return data_to_return      
    }



    function CreateEditableActionFromType(action_data) {
        var obj = JSON.parse(required_gamedata.replace(/'/g, '"'));   
        //console.log(action_data)

        if (action_data.data["type"] === "dialog") {
            return(         
                <div className="small_actions_background_container">
                    <h2> dialog </h2>

                    <div>
                        <h2> name </h2> 
                        <input onChange={(event) => action_data.data["name"] = event.target.value}  defaultValue={action_data.data["name"]} type={"text"} />
                        <h2> sprite </h2>

                        <select onChange={(event) => action_data.data["character_sprite"] = event.target.value}  defaultValue={action_data.data["character_sprite"]}>
                            {obj["names"].map(Element =>
                                <option key={Element} value={Element}> {Element} </option>
                            )}
                        </select>

                    </div>

                    <div>
                        <h2> dialog </h2> 
                        <input onChange={(event) => action_data.data["dialog"] = event.target.value} defaultValue={action_data.data["dialog"]} style={{width: "75%"}} type={"text"} />
                    </div>

                    <div>
                        <h2> expressions </h2>
                        <select onChange={(event) => action_data.data["expression"] = event.target.value} defaultValue={action_data.data["expression"]}>
                            {obj["expressions"].map(Element =>
                                <option key={Element} value={Element}> {Element} </option>
                            )}
                        </select>
                    </div>
                    
                    <div className="edit_action_buttons_container">
                        <button onClick={() => update_action_in_scene(action_data.data)}> update </button>
                        <button onClick={() => remove_action_from_scene(action_data.data["action_id"])}> remove </button>
                        <button onClick={() => move_action_up_in_scene(action_data.data)}> move up </button>
                        <button onClick={() => move_action_down_in_scene(action_data.data)}> move down</button>
                    </div>

                </div>
            )
        }






    }

    // shows every action of the current type
    function ShowCurrentActions() {

        if (required_gamedata !== undefined) {

            var obj = JSON.parse(required_gamedata.replace(/'/g, '"'));      

            if (current_action_type === "dialog") {
                return(
                    <div className="actions_sorter_and_container">
                        
                        
                        <div className="small_actions_background_container">
                            <h2> dialog </h2>

                            <div>
                                <h2> name </h2> 
                                <input id="dialog_action_name" type={"text"} />
                                <h2> sprite </h2>

                                <select id="dialog_action_sprite">
                                    {obj["names"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>

                            </div>

                            <div>
                                <h2> dialog </h2> 
                                <input id="dialog_action_dialog_text" style={{width: "75%"}} type={"text"} />
                            </div>

                            <div>
                                <h2> expressions </h2>
                                <select id="dialog_action_expression">
                                    {obj["expressions"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("dialog")}> add </button>

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
            setTimeout(check_if_act_is_selected, 100)
            setTimeout(check_if_scene_is_selected, 100)
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
                <h1> Acts </h1>

                <div className="acts_container">


                    {put_all_acts_onto_list().map(Element =>
                        <div className="act_and_scene_item_container"> 
                            <h1> {Element} </h1>
                            <button id={Element} onClick={() => set_current_act(Element)}> select </button>
                            <button onClick={() => remove_act_from_story_data(Element)}> delete </button>
                        </div>
                    )}


                    <div className="add_act_button_container">
                        <input id="act_name_id" type={"text"}/>
                        <button onClick={() => add_act_to_story_data(document.getElementById("act_name_id").value)}> add </button>
                    </div>
                    
                </div>

                <h1> Scenes </h1>

                <div className="scenes_container">
                    
                    {put_current_act_scenes_into_list().map(Element =>

                        <div className="act_and_scene_item_container"> 
                            <h1> {Element} </h1>
                            <button id={Element} onClick={() => set_current_scene(Element)}> select </button>
                            <button onClick={() => remove_scene_from_act(Element)}> delete </button>
                        </div>

                    )}


                    <div className="add_act_button_container">
                        <input id="scene_name_id" type={"text"}/>
                        <button onClick={() => add_scene_to_current_act(document.getElementById("scene_name_id").value)}> add </button>
                    </div>

                </div>

                <button onClick={() => copy_all_story_data_to_clipboard()}>copy story </button>

            </div>

            <div className="current_scene_parent_container">
                <h1> {current_scene} </h1>
                <div id="editible_action_container" className="editible_action_container">
                    {List_of_current_scene_events().map(Element =>
                    
                        <CreateEditableActionFromType data={Element} />
                    )}
                </div>

            </div>



            <h1 style={{marginTop: "4000px", position: "absolute"}}> hello </h1>
        </div>
    )
}


export default CreoStoryMaker