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
    let options = {
      headers:new HttpHeaders({
        Token : data.Token,
        userID :data.userID
      }),
    }
    return this.Http.get(`https://route-egypt-api.herokuapp.com/getUserNotes`,options)
  }

  addNote (data:any):Observable<any>
  {
    return this.Http.post(`https://route-egypt-api.herokuapp.com/addNote`,data)
  }
  

  editNote (data:any):Observable<any>
  {
    return this.Http.put(`https://route-egypt-api.herokuapp.com/updateNote`,data)
  }


  deleteNote (data:any):Observable<any>
  {
    let options = {
      headers:new HttpHeaders({}),
      body : {
        NoteID : data.NoteID,
        token : data.token
      }
    }
    return this.Http.delete(`https://route-egypt-api.herokuapp.com/deleteNote`,options)
    //https://route-egypt-api.herokuapp.com/
  }

}
