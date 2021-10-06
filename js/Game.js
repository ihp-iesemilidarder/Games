import {playersJSON,populatePlayers} from "./app.js";

export class Game{
    constructor(form,e){
        e.preventDefault();
        this.data = new FormData(form);
        this.playerJSON={
            "name":this.data.get("name"),
            "developer":this.data.get("developers"),
            "date":this.data.get("data")
        }
        this.validateForm();
    }
    validateForm(){
        let check=true;
        for(let val of Object.values(this.data.entries())){
            if (val.length==0) check=false;
        };
        if(new Date(this.data.get("data"))>new Date()) check=false;
        else if(this.data.get("pegi").match(/3|7|12|16|18/)==null) check=false;
        return check;
    }

    add(){
        if(this.validateForm()==false){
            alert("Faltan datos o los campos son invalidos");
            return false;
        };
        if (playersJSON.find(obj=>obj.name==this.playerJSON.name)==null) playersJSON.push(this.playerJSON);
        populatePlayers(playersJSON);
    }
}