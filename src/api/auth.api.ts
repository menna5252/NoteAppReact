import axios from "axios";
import type { LoginSchemaType, RegisterSchemaType } from "../schema/auth.schema";

export async function registerApi(values:Omit<RegisterSchemaType,'rePassword'|'gender'>){
   
        const {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values);
        console.log(data)
return data
}
export async function loginApi(values:LoginSchemaType){
   
        const {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values);
        console.log(data)
return data
}