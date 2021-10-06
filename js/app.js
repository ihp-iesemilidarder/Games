export let playersJSON=JSON.parse(localStorage.getItem("playersJSON")) || [];
import {Game} from "./Game.js"
const table = document.querySelector("table tbody");
const sendForm = document.querySelector("form input[type='submit']");
const form = document.querySelector("form");

export const populatePlayers=(json)=>{
    table.innerHTML="";
    json.forEach((player,index) => {
        table.innerHTML+=`
        <tr>
            <td>${index+1}</td>
            <td>${player.name}</td>
            <td>${player.developer}</td>
            <td>${player.date}</td>
            <td class="buttons">
                <i class="fa fa-trash" data-id="${index}"></i>
            </td>
        </tr>
        `;        
    });
    localStorage.setItem("playersJSON",JSON.stringify(playersJSON));
}

const init=async()=>{
    populatePlayers(playersJSON);
    sendForm.addEventListener("click",(e)=>new Game(form,e).add());
    table.addEventListener("click",(e)=>new Game(form,e).delete(e));
}
document.addEventListener("DOMContentLoaded",init);