import { Hobby } from "./hobby";
import { Region } from "./region";

export class User {
    firstName: string ='';
    surname: string =''
    username: string='';
    email: string='';
    gender: string='';
    description: string='';
    hobbies: Hobby[] = [];
    regions: Region[] = [];
}