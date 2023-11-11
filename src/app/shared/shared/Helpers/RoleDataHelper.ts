import { dropdownModel } from "../models/components/dropdownModel";


export default class RoleDataHelper {
    static get() : dropdownModel[]
    {
        return [
            {id:null, name: 'Select Role'},
            {id:1, name: 'Customer'},
            {id:2, name: 'Admin'},
          ];
    }

    // static showRoleName(id : number) : string 
    // {
    //     switch(id) {
    //         case 1 :{
    //             return "Cutomer";
    //         } 
    //         case 2 : {
    //             return "Admin"
    //         }
    //         default : {
    //             return "";
    //         }
    //     }
    // }
}