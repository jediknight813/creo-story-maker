import React from "react";
import { useState } from "react/cjs/react.development";
import '../Styles/CreoStoryMakerStyles.css'


function ChoiceTest() {
    const [choices, update_choices] = useState({"121421": [{"choice_text_id": "21321312", "choice_scene_id": "213213123"}, {"choice_text_id": "21312", "choice_scene_id": "2123"}] })
    //console.log(choices["121421"])
    const [update, force_update] = useState(1)


    return (
        <div id="parent_container" className="ChoiceTestParentContainer">
            {choices["121421"].map(element => 

                <div>
                    <input id={element["choice_text_id"]} type={"text"}/>
                    <select id={element["choice_scene_id"]}>
                        <option > scene_one </option>
                        <option > scene_two </option>
                    </select>
                    <button onClick={() => remove_choice(element["choice_text_id"], "121421" )}> remove choice </button>
                </div>
                
            )}
            <button onClick={() => add_choice("121421")}> add choice  </button>

            <button onClick={() => add_choice_action("121421")}> add action </button>

        </div>
    )


    function return_random_id() {
        return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    }
    
    
    function add_choice_action(choice_id) {
        let choice_data = {"choices": [], "choice_id": ""}
        let choices_list = choices[choice_id]
        for (let i in choices_list) {
            choice_data["choices"].push({"choice_text": document.getElementById(choices_list[i]["choice_text_id"]).value, "choice_scene": document.getElementById(choices_list[i]["choice_scene_id"]).value})
        }
        choice_data["choice_id"] = choice_id
        console.log(choice_data)
    }


    function remove_choice(choice_text_id, choice_id) {
        let data_to_return = choices
        for (let i in data_to_return[choice_id]) {
            if (data_to_return[choice_id][i]["choice_text_id"] === choice_text_id) {
                data_to_return[choice_id].splice(i, 1);
            }
        }
        update_choices(data_to_return)
        force_update(update+1)
    }
    
    function add_choice(choice_id) {
        let data_to_return = choices
        data_to_return[choice_id].push({"choice_text_id": return_random_id(), "choice_scene_id": return_random_id()})
        update_choices(data_to_return)
        force_update(update+1)
    }
}




export default ChoiceTest