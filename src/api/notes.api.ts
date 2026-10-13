import axios from "axios"
import type { Note, NoteInput } from "../types/note";

const TOKEN_PREFIX = "3b8ny__"

const api ="https://note-sigma-black.vercel.app/api/v1";



export async function getNotes(token: string):Promise<Note[]> {
 try{
     const {data} = await axios.get(`${api}/notes`,{
    headers: {
      token: `${TOKEN_PREFIX}${token}`
    }

  });

  return data.notes
 }
 catch(err){
  if(axios.isAxiosError(err)){
    return []
  }
  throw err
 }
}

export async function addNote(token: string,note:NoteInput):Promise<Note> {
  const {data} = await axios.post(`${api}/notes`,note,{
    headers: {
      token: `${TOKEN_PREFIX}${token}`
    }
});

  return data
}

export async function deleteNote(token: string,id:string) {
  const {data} = await axios.delete(`${api}/notes/${id}`,{
    headers: {
      token: `${TOKEN_PREFIX}${token}`
    }
});

  return data
}

export async function updateNote(token: string,id:string,note:NoteInput) {
  const {data} = await axios.put(`${api}/notes/${id}`,note,{
    headers: {
      token: `${TOKEN_PREFIX}${token}`
    }
});

  return data
}

