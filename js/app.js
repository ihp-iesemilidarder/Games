export let playersJSON=JSON.parse(localStorage.getItem("playersJSON")) || [];
import {Game} from "./Game.js"
const table = document.querySelector("table tbody");
const sendForm = document.querySelector("form input[type='submit']");
const form = document.querySelector("form");

const getPlayers=async()=>{
    let res = await fetch("data/players.json");
    let data=await res.json();
    playersJSON=data;
}

export const populatePlayers=(json)=>{
    table.innerHTML="";
    json.forEach((player,index) => {
        table.innerHTML+=`
        <tr>
            <td>${index++}</td>
            <td>${player.name}</td>
            <td>${player.developer}</td>
            <td>${player.date}</td>
        </tr>
        `;        
    });
    localStorage.setItem("playersJSON",JSON.stringify(playersJSON));
}

const init=async()=>{
    if(playersJSON.length==0) await getPlayers();
    populatePlayers(playersJSON);
    sendForm.addEventListener("click",(e)=>new Game(form,e).add());
}
document.addEventListener("DOMContentLoaded",init);