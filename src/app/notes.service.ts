import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Note } from './note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private Http: HttpClient) { 
    
  }

  getAllNotes(data:any):Observable<any>
  {
    return this.Http.post(`https://sticky-note-fe.vercel.app/getUserNotes`,data)
  }

  addNote (data:any):Observable<any>
  {
    return this.Http.post(`https://sticky-note-fe.vercel.app/addNote`,data)
  }
  

  editNote (data:any):Observable<any>
  {
    return this.Http.put(`https://sticky-note-fe.vercel.app/updateNote`,data)
  }


  deleteNote (data:any):Observable<any>
  {
    return this.Http.delete(`https://sticky-note-fe.vercel.app/deleteNote`,data)
  }

}
