import React, { useState } from "react";
import '../Styles/CreoStoryMakerStyles.css'

var is_loaded = false
var current_choice_id = 121421


function CreoStoryMaker() {
    const [required_info_submited, set_required_info_submited] = useState(false)
    const [current_action_type, set_current_action_type] = useState("dialog")
    const [required_gamedata, set_required_gamedata] = useState(undefined)
    const [story_data, set_story_data] = useState({"act_one": [{"scene_one": []  }, {"scene_two": []  }], "act_two": [{"ending": []  }] })
    const [current_act, set_current_act] = useState("act_one")
    const [current_scene, set_current_scene] = useState("scene_one")
    const [choices, update_choices] = useState({"121421": [{"choice_text_id": "21321312", "choice_scene_id": "213213123", "choice_text": "", "choice_scene": ""}, {"choice_text_id": "21312", "choice_scene_id": "2123", "choice_text": "", "choice_scene": ""}] })


    if (is_loaded === false) {
        setTimeout(load_story_data_locally, 1000)
        is_loaded = true
    }

    function load_story_data_locally() {
        
    }

    function save_data_locally() {

    }
    

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


    function return_all_scenes_list() {
        let all_scenes = []
        for (let a in story_data) {
            for (let i in story_data[a]) {
                for (let j in story_data[a][i]) {
                    all_scenes.push(j)
                }
            }
        }  
       return all_scenes
    }

    const [force_update, start_force_update] = useState(1)


    function remove_action_from_scene(action_id) {
        let data_to_update = story_data
        //console.log(action_id)

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
                                //console.log(story_data[current_act][index][current_scene])

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

        if (action_type === "background_action_background") {
            let background = document.getElementById("background_action_background").value
            add_action_data_to_scene({"background": background, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "background_action_background"})        
            start_force_update(force_update+1)
        }

        if (action_type === "audio_action_play_audio") {
            let audio = document.getElementById("audio_action_play_audio").value
            add_action_data_to_scene({"play_audio": audio, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "audio_action_play_audio"})
            start_force_update(force_update+1)
        }

        if (action_type === "audio_action_stop_audio") {
            let audio = document.getElementById("audio_action_stop_audio").value
            add_action_data_to_scene({"stop_audio": audio, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "audio_action_play_audio"})
            start_force_update(force_update+1)
        }

        if (action_type === "character_action_show_character") {
            let sprite = document.getElementById("character_action_show_character_sprite").value
            let position = document.getElementById("character_action_show_character_position").value
            let expression = document.getElementById("character_action_show_character_expression").value
            add_action_data_to_scene({"character": sprite, "position": position, "expression": expression, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "character_action_show_character"}) 
            start_force_update(force_update+1)
        }

        if (action_type === "character_action_hide_character_sprite") {
            let character = document.getElementById("character_action_hide_character_sprite").value
            add_action_data_to_scene({"hide_character": character, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "character_action_hide_character_sprite"})
            start_force_update(force_update+1)
        }

        if (action_type === "influence_action_add_or_remove_influence") {
            let character = document.getElementById("influence_action_add_or_remove_influence_character").value
            let amount = document.getElementById("influence_action_add_or_remove_influence_amount").value
            add_action_data_to_scene({"influence_amount": amount, "character": character, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "influence_action_add_or_remove_influence"}) 
            start_force_update(force_update+1)
        }

        if (action_type === "influence_action_influence_check") {
            let character = document.getElementById("influence_action_influence_check_character").value
            let amount = document.getElementById("influence_action_influence_check_amount").value
            let pass_scene = document.getElementById("influence_action_influence_check_pass_scene").value
            let fail_scene = document.getElementById("influence_action_influence_check_fail_scene").value
            add_action_data_to_scene({"influence_event_check": amount, "character": character, "pass": pass_scene, "fail": fail_scene, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "influence_action_influence_check"}) 
            start_force_update(force_update+1)
        }

    }


    function copy_all_story_data_to_clipboard() {
        let data_to_copy_to_clipboard = ""
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
                }
            }
        }  
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

        //console.log(data_to_return)
        return data_to_return      
    }


    
    function CreateEditableActionFromType(action_data) {

        var obj = JSON.parse(required_gamedata.replace(/'/g, '"'));   
        //var obj = JSON.parse(localStorage.getItem('required_gamedata'))
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
        if (action_data.data['type'] === "background_action_background") {
            return (
                <div style={{minHeight: "160px"}} className="small_actions_background_container">
                <h2> Change Background  </h2>

                <div>
                    <h2> Backgrounds </h2>
                    <select onChange={(event) => action_data.data["background"] = event.target.value} defaultValue={action_data.data["background"]}>
                        {obj["backgrounds"].map(Element =>
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

        if (action_data.data["type"] === "audio_action_play_audio") {
            return (
                <div style={{minHeight: "160px"}} className="small_actions_background_container">
                <h2> Play Audio  </h2>

                <div>
                    <h2> Audio </h2>
                    <select onChange={(event) => action_data.data["play_audio"] = event.target.value} defaultValue={action_data.data["play_audio"]}>
                        {obj["sounds"].map(Element =>
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


        if (action_data.data["type"] === "audio_action_stop_audio") {
            return (
                <div style={{minHeight: "160px"}} className="small_actions_background_container">
                <h2> Stop Audio </h2>

                <div>
                    <h2> Audio </h2>
                    <select onChange={(event) => action_data.data["stop_audio"] = event.target.value} defaultValue={action_data.data["stop_audio"]}>
                        {obj["sounds"].map(Element =>
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

        if (action_data.data["type"] === "character_action_show_character") {
            return (
                <div className="small_actions_background_container">
                    <h2> Show Character </h2>

                    <div>
                        <h2> sprite </h2>
                        <select onChange={(event) => action_data.data["character"] = event.target.value} defaultValue={action_data.data["character"]}>
                            {obj["names"].map(Element =>
                                <option key={Element} value={Element}> {Element} </option>
                            )}
                        </select>
                    </div>


                    <div>
                        <h2> position </h2>
                        <select onChange={(event) => action_data.data["position"] = event.target.value} defaultValue={action_data.data["position"]}>
                            <option value="one">one</option>
                            <option value="two">two</option>
                            <option value="three">three</option>
                            <option value="four">four</option>
                        </select>
                    </div>

                    <div>
                        <h2> expression </h2>
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

            if (action_data.data["type"] === "choice_action_choice") {

                console.log(action_data.data)
                
                return(
                    <div style={{minHeight: "350px"}} className="small_actions_background_container">
                            <h2> Choice </h2>

                            <div id="parent_container" className="ChoiceTestParentContainer">
                                {choices[action_data.data["choice_id"]].map((element, index) => 

                                    <div>
                                        <div style={{"display": "flex", flexDirection: "column"}}>
                                            
                                            <div style={{width: "300px", "minHeight": "100px", "marginBottom": "10px", display: "flex", flexDirection: "column", marginTop: "50px", justifyContent: 'center'}}>
                                                
                                                <div>
                                                    <h4>choice text </h4> 
                                                    <input onChange={(event) => {action_data.data["choices"][index]["choice_text"] = event.target.value; update_choice_option_data(action_data.data["choice_id"], action_data.data["choices"])}} defaultValue={choices[action_data.data["choice_id"]][index]["choice_text"]} id={element["choice_text_id"]} type={"text"}/>
                                                </div>

                                                <div> 
                                                    <h4> choice scene </h4>
                                                    <select onChange={(event) => {action_data.data["choices"][index]["choice_scene"] = event.target.value; ; update_choice_option_data(action_data.data["choice_id"], action_data.data["choices"])}} defaultValue={choices[action_data.data["choice_id"]][index]["choice_scene"]} id={element["choice_scene_id"]}>

                                                        {return_all_scenes_list().map(element =>
                                                            <option value={element}> {element} </option>    
                                                        )}
                                                    </select>
                                                </div>

                                        </div>

                                    </div>

                                        <button onClick={() => remove_choice(element["choice_text_id"], action_data.data["choice_id"] )}> remove choice </button>
                                    </div>
                                    
                                )}

                            </div>
                            

                            <button style={{"marginTop": "20px"}} onClick={() => add_choice(action_data.data["choice_id"])}> add choice  </button>
                            
                            <div className="edit_action_buttons_container">
                                <button onClick={() => update_action_in_scene(action_data.data)}> update </button>
                                <button onClick={() => remove_action_from_scene(action_data.data["action_id"])}> remove </button>
                                <button onClick={() => move_action_up_in_scene(action_data.data)}> move up </button>
                                <button onClick={() => move_action_down_in_scene(action_data.data)}> move down</button>
                            </div>  
                       
                        </div>
                )
        }

        if (action_data.data["type"] === "character_action_hide_character_sprite") {

            return( 
                <div style={{minHeight: "160px"}} className="small_actions_background_container">
                <h2> Hide Character </h2>

                <div>
                    <h2> Audio </h2>
                    <select onChange={(event) => action_data.data["hide_character"] = event.target.value} defaultValue={action_data.data["hide_character"]}>
                        {obj["names"].map(Element =>
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

        if (action_data.data["type"] === "influence_action_add_or_remove_influence") {
            return (
                <div style={{minHeight: "200px"}} className="small_actions_background_container">
                    <h2> influence </h2>

                    <div>
                        <h2> Character </h2>
                        <select onChange={(event) => action_data.data["character"] = event.target.value} defaultValue={action_data.data["character"]}>
                            {obj["names"].map(Element =>
                                <option key={Element} value={Element}> {Element} </option>
                            )}
                        </select>

                    </div>

                    <div>
                    <h2> Amount </h2> 
                        <input onChange={(event) => action_data.data["influence_amount"] = event.target.value} defaultValue={action_data.data["influence_amount"]} type={"number"} />
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

        if (action_data.data["type"] === "influence_action_influence_check") {
            return (
                <div style={{minHeight: "300px"}} className="small_actions_background_container">
                            <h2> Influence Check </h2>

                            <div>
                                <h2> Character </h2> 
                                <select onChange={(event) => action_data.data["characer"] = event.target.value} defaultValue={action_data.data["character"]}>
                                    {obj["names"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <h2> Influence Needed </h2>
                                <input onChange={(event) => action_data.data["influence_event_check"] = event.target.value} defaultValue={action_data.data["influence_event_check"]} style={{minWidth: "50px"}} type={"number"} />
                            </div>

                            <div>
                                <h2> Influence Pass Scene </h2>
                                <select onChange={(event) => action_data.data["pass"] = event.target.value} defaultValue={action_data.data["pass"]} style={{minWidth: "50px"}} type={"number"}>
                                    {return_all_scenes_list().map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <h2> Influence Fail Scene  </h2>
                                <select onChange={(event) => action_data.data["fail"] = event.target.value} defaultValue={action_data.data["fail"]} style={{minWidth: "50px"}} type={"number"}>
                                    {return_all_scenes_list().map(Element =>
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
            //var obj = JSON.parse(localStorage.getItem('required_gamedata'))

            if (current_action_type === "dialog") {
                return(
                    <div className="actions_sorter_and_container">
                        
                        
                        <div className="small_actions_background_container">
                            <h2> Dialog </h2>

                            <div>
                                <h2> Name </h2> 
                                <input id="dialog_action_name" type={"text"} />
                                <h2> Sprite </h2>

                                <select id="dialog_action_sprite">
                                    {obj["names"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>

                            </div>

                            <div>
                                <h2> Dialog </h2> 
                                <input id="dialog_action_dialog_text" style={{width: "75%"}} type={"text"} />
                            </div>

                            <div>
                                <h2> Expression </h2>
                                <select id="dialog_action_expression">
                                    {obj["expressions"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("dialog")}> add action </button>

                        </div>

                    </div>
                )
                
            }

            if (current_action_type === "background") {
                return(
                    <div className="actions_sorter_and_container">
                         <div style={{minHeight: "15%"}} className="small_actions_background_container">
                            <h2> Change Background  </h2>

                            <div>
                                <h2> Backgrounds </h2>
                                <select id="background_action_background">
                                    {obj["backgrounds"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>

                            </div>

                                <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("background_action_background")}> add action </button>
                            
                            </div>
                    </div>
                )
            }

            if (current_action_type === "sound") {
                return(
                    <div className="actions_sorter_and_container">
                        
                        <div style={{minHeight: "15%"}} className="small_actions_background_container">
                            <h2> Play Audio  </h2>

                            <div>
                                <h2> Audio </h2>
                                <select id="audio_action_play_audio">
                                    {obj["sounds"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>

                            </div>

                                <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("audio_action_play_audio")}> add action </button>
                            
                            </div>


                            <div style={{minHeight: "15%"}} className="small_actions_background_container">
                                <h2> Stop Audio  </h2>

                                <div>
                                    <h2> Audio </h2>
                                    <select id="audio_action_stop_audio">
                                        {obj["sounds"].map(Element =>
                                            <option key={Element} value={Element}> {Element} </option>
                                        )}
                                    </select>

                                </div>

                                    <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("audio_action_stop_audio")}> add action </button>
                                
                            </div>
                        

                    </div>
                )
            }

            if (current_action_type === "influence") {
                return(
                    <div className="actions_sorter_and_container">

                        <div className="small_actions_background_container">
                            <h2> Influence Check </h2>

                            <div>
                                <h2> Character </h2> 
                                <select id="influence_action_influence_check_character">
                                    {obj["names"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <h2> Influence Needed </h2>
                                <input style={{minWidth: "50px"}} id="influence_action_influence_check_amount" type={"number"} />
                            </div>

                            <div>
                                <h2> Influence Pass Scene </h2>
                                <select id="influence_action_influence_check_pass_scene">
                                    {return_all_scenes_list().map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <h2> Influence Fail Scene  </h2>
                                <select id="influence_action_influence_check_fail_scene">
                                    {return_all_scenes_list().map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("influence_action_influence_check")}> add action </button>

                        </div>



                        <div style={{minHeight: "15%"}} className="small_actions_background_container">
                            <h2> influence </h2>

                            <div>
                                <h2> Character </h2>
                                <select id="influence_action_add_or_remove_influence_character">
                                    {obj["names"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>

                            </div>

                            <div>
                            <h2> Amount </h2> 
                                <input id="influence_action_add_or_remove_influence_amount" type={"number"} />
                            </div>

                                <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("influence_action_add_or_remove_influence")}> add action </button>
                            
                        </div>


                    </div>
                )
            }

            if (current_action_type === "choice") {
                return(
                    <div className="actions_sorter_and_container">

                        <div className="small_actions_background_container">
                            <h2> Choice </h2>

                            <div id="parent_container" className="ChoiceTestParentContainer">
                                {choices[current_choice_id].map(element => 

                                    <div>
                                        <div style={{"display": "flex", flexDirection: "column"}}>
                                            
                                            <div style={{width: "300px", "minHeight": "100px", "marginBottom": "10px", display: "flex", flexDirection: "column", marginTop: "50px", justifyContent: 'center'}}>
                                                
                                                <div>
                                                    <h4>choice text </h4> 
                                                    <input id={element["choice_text_id"]} type={"text"}/>
                                                </div>

                                                <div> 
                                                    <h4> choice scene </h4>
                                                    <select id={element["choice_scene_id"]}>

                                                        {return_all_scenes_list().map(element =>
                                                            <option value={element}> {element} </option>    
                                                        )}
                                                    </select>
                                                </div>

                                        </div>

                                    </div>

                                        <button onClick={() => remove_choice(element["choice_text_id"], current_choice_id )}> remove choice </button>
                                    </div>
                                    
                                )}

                            </div>

                            <button style={{"marginTop": "20px"}} onClick={() => add_choice( current_choice_id )}> add choice  </button>
                            <button onClick={() => add_choice_action()}> add action </button>   
                       
                        </div>

                    </div>

                )
            }

            if (current_action_type === "character") {
                return(
                    <div className="actions_sorter_and_container">
                                         
                        <div className="small_actions_background_container">
                            <h2> Show Character </h2>

                            <div>
                                <h2> sprite </h2>
                                <select id="character_action_show_character_sprite">
                                    {obj["names"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>


                            <div>
                                <h2> position </h2>
                                <select id="character_action_show_character_position">
                                    <option value="one">one</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                    <option value="four">four</option>
                                </select>
                            </div>

                            <div>
                                <h2> expression </h2>
                                <select id="character_action_show_character_expression">
                                    {obj["expressions"].map(Element =>
                                        <option key={Element} value={Element}> {Element} </option>
                                    )}
                                </select>
                            </div>

                            <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("character_action_show_character")}> add action </button>

                        </div>

                        
                        <div style={{minHeight: "15%"}} className="small_actions_background_container">
                                <h2> Hide Character  </h2>

                                <div>
                                    <h2> Character </h2>
                                    <select id="character_action_hide_character_sprite">
                                        {obj["names"].map(Element =>
                                            <option key={Element} value={Element}> {Element} </option>
                                        )}
                                    </select>

                                </div>

                                    <button onClick={() => get_action_data_and_send_it_to_be_added_to_scene("character_action_hide_character_sprite")}> add action </button>
                                
                            </div>
                        

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


    function return_random_id() {
        return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    }
    

    function add_choice_action() {
        let new_choice_id = current_choice_id

        let choice_data = {"choices": [], "choice_id": new_choice_id, "action_id": Math.random().toString(20).substring(2, 10) + Math.random().toString(20).substring(2, 10), "type": "choice_action_choice"}
        
        if (choices[current_choice_id].length > 1) {
            let choices_list = choices[current_choice_id]
                for (let i in choices_list) {
                    choice_data["choices"].push({"choice_text": document.getElementById(choices_list[i]["choice_text_id"]).value, "choice_scene": document.getElementById(choices_list[i]["choice_scene_id"]).value})
                }
        }

        add_action_data_to_scene(choice_data) 

        let new_choice_action_id = return_random_id()
        let choice_id_to_add = choices
        update_choice_option_data(current_choice_id, choice_data["choices"])
        
        choice_id_to_add[new_choice_action_id] = [{"choice_text_id": return_random_id(), "choice_scene_id": return_random_id(), "choice_text": "", "choice_scene": ""}, {"choice_text_id": return_random_id(), "choice_scene_id": return_random_id(), "choice_text": "", "choice_scene": ""}]
        current_choice_id = new_choice_action_id

        start_force_update(force_update+1)
    }


    function remove_choice(choice_text_id, choice_id) {
        let data_to_return = choices
        for (let i in data_to_return[choice_id]) {
            if (data_to_return[choice_id][i]["choice_text_id"] === choice_text_id) {
                data_to_return[choice_id].splice(i, 1);
            }
        }
        update_choices(data_to_return)
        start_force_update(force_update+1)
    }
    
    function add_choice(sent_choice_id) {
        let add_choice_to_scene_id = choices
        add_choice_to_scene_id[sent_choice_id].push({"choice_text_id": return_random_id(), "choice_scene_id": return_random_id(), "choice_text": "", "choice_scene": ""})
        update_choices(add_choice_to_scene_id)
        start_force_update(force_update+1)
    }

    function update_choice_option_data(choice_id, choice_list) {
        let updated_data = choices
        updated_data[choice_id] = choice_list
        update_choices(updated_data)
    }





    return (
        <div className="Creo_Story_Maker_Container">

            <GetRequiredInfoSubmited />

            <div className="navbar_container">
                <button onClick={() => set_required_info_submited(false)}> resubmit game data </button>
                <button onClick={() => save_data_locally()}> Load Data </button>
                <button onClick={() => navigator.clipboard.writeText("[b][/b]")}> Bold Text </button>
                <button onClick={() => navigator.clipboard.writeText("[wave amp=50 freq=2][/wave]")}> Wavy Text </button>
                <button onClick={() => navigator.clipboard.writeText("[tornado radius=5 freq=2][/tornado]")}> Tornado Text </button>
                <button onClick={() => navigator.clipboard.writeText("[shake rate=5 level=10][/shake]")}> Shaking Text </button>
                <button onClick={() => navigator.clipboard.writeText("[fade start=4 length=14][/fade]")}> Fading Text </button>
                <button onClick={() => navigator.clipboard.writeText("[rainbow freq=0.2 sat=10 val=20][/rainbow]")}> Rainbow Text </button>
                <button style={{"border": "2px solid blue", "color": "blue"}} onClick={() => navigator.clipboard.writeText("[color=blue][/color]")}> Blue Text </button>
                <button style={{"border": "2px solid green", "color": "green"}} onClick={() => navigator.clipboard.writeText("[color=green][/color]")}> Green Text </button>
                <button style={{"border": "2px solid red", "color": "red"}} onClick={() => navigator.clipboard.writeText("[color=red][/color]")}> Red Text </button>
                <button style={{"border": "2px solid purple", "color": "purple"}} onClick={() => navigator.clipboard.writeText("[color=purple][/color]")}> Purple Text </button>
                <button style={{"border": "2px solid #fa6149", "color": "#fa6149"}} onClick={() => navigator.clipboard.writeText("[color=#fa6149][/color]")}> Orange Text </button>
                
            </div>


            <div className="action_parent_container"> 
                <h1> Actions </h1>

                <div className="action_type_button_container">
                    <button onClick={() => set_current_action_type("background")}> Background </button>
                    <button onClick={() => set_current_action_type("dialog")}> Dialog </button>
                    <button onClick={() => set_current_action_type("sound")}> Audio </button>
                    <button onClick={() => set_current_action_type("influence")}> Influence </button>
                    <button onClick={() => set_current_action_type("choice")}> Choice </button>
                    <button onClick={() => set_current_action_type("character")}> Character </button>
                </div> 


                    <ShowCurrentActions />

            </div>



            <div className="acts_and_scenes_container">
                <h1> Acts </h1>

                <div className="acts_container">

                    <div className="add_act_button_container">
                        <input id="act_name_id" type={"text"}/>
                        <button onClick={() => add_act_to_story_data(document.getElementById("act_name_id").value)}> add </button>
                    </div>

                    {put_all_acts_onto_list().map(Element =>
                        <div className="act_and_scene_item_container"> 
                            <h1> {Element} </h1>
                            <button id={Element} onClick={() => set_current_act(Element)}> select </button>
                            <button onClick={() => remove_act_from_story_data(Element)}> delete </button>
                        </div>
                    )}

                    
                </div>

                <h1> Scenes </h1>

                <div className="scenes_container">

                    <div className="add_act_button_container">
                        <input id="scene_name_id" type={"text"}/>
                        <button onClick={() => add_scene_to_current_act(document.getElementById("scene_name_id").value)}> add </button>
                    </div>
                    
                    {put_current_act_scenes_into_list().map(Element =>

                        <div className="act_and_scene_item_container"> 
                            <h1> {Element} </h1>
                            <button id={Element} onClick={() => set_current_scene(Element)}> select </button>
                            <button onClick={() => remove_scene_from_act(Element)}> delete </button>
                        </div>

                    )}

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



            <h1 style={{marginTop: "4000px", position: "absolute"}}> nothing to see down here </h1>
        </div>
    )
}


export default CreoStoryMaker