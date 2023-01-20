import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { AllNotes } from './../all-notes';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  isLoading:boolean = false;
  allNotes:AllNotes[] = []
  showItem:string = ""

  addNoteForm:FormGroup = new FormGroup({
    'title' :new FormControl(null , [Validators.required]),
    'desc' :new FormControl(null , [Validators.required]),
    'userID' :new FormControl(localStorage.getItem('userID')),
    'token' : new FormControl (localStorage.getItem('userToken'))
  })

  editNoteForm:FormGroup = new FormGroup({
    'title' :new FormControl(null , [Validators.required]),
    'desc' :new FormControl(null , [Validators.required]),
  })

  constructor(private _NotesService:NotesService , private _Router:Router) {}

  //----------------------- Get All Note ---------------------
  getAllNotes()
  {
    let Token =   localStorage.getItem('userToken');
    let userID = localStorage.getItem('userID')

    const objectData: object = {
      token: Token,
      userID: userID,
    };
    
    this._NotesService.getAllNotes(objectData).subscribe({
      next:(response) => 
      {
        // console.log("All Notes" , response);
        if(response.message == 'no notes found')
        {
          this.showItem = response.message;
        }
        else{
          this.showItem = ""
        }
        this.allNotes = response.Notes
        console.log(this.allNotes);
      }
    })
  }

  //----------------------- Add Note ---------------------
  submitAddNoteForm()
  {
    this.isLoading = true;
    if(this.addNoteForm.invalid)
    {
      return;
    }
    
    const data: any =  {
      title:this.addNoteForm.value.title,
      desc:this.addNoteForm.value.desc,
      token:localStorage.getItem('userToken'),
      citizenID:localStorage.getItem('userID')
    }
    
    this._NotesService.addNote(data).subscribe({
      next : (response) =>
      {
        console.log(response);
        
        if(response.message == 'success')
        {
          this.isLoading = false;
          this.addNoteForm.reset()
          this.getAllNotes()
          $('#addNote').modal('hide')
        }
      }
    })
  }

//----------------------- delete Note ---------------------

note_ID:number = 0
getId(id:number)
{
  this.note_ID = id;
  // console.log(id);
}

deleteNote()
{
  this.isLoading = true;

  const data: Object = {
    body: {
      NoteID: this.note_ID,
      token: localStorage.getItem('userToken'),
    },
  };

  this._NotesService.deleteNote(data).subscribe( (response) => {
    // console.log(response);
    if(response.message == 'deleted')
    {
      this.isLoading = false;
      $('#deleteNote').modal('hide')
      this.getAllNotes()
    }
  
  })
}

//----------------------- Edit Note ---------------------

setValue()
{
  for (let i = 0; i < this.allNotes.length; i++) {
    if(this.allNotes[i]._id == this.note_ID)
    {
      console.log(this.allNotes[i]);
      this.editNoteForm.get('title')?.setValue(this.allNotes[i].title)
      this.editNoteForm.get('desc')?.setValue(this.allNotes[i].desc)
    }
  }
}

editNote()
{
  this.isLoading = true;

  let data = {
    token:localStorage.getItem('userToken'),
    title:this.editNoteForm.value.title,
    desc:this.editNoteForm.value.desc,
    NoteID:this.note_ID
  }
  this._NotesService.editNote(data).subscribe( (response) => {
    console.log(response);
    if(response.message == "updated")
    {
      this.isLoading = false;
      $('#editNote').modal('hide')
      this.getAllNotes()
    }
    
  })
}

  ngOnInit(): void {
    this.getAllNotes()
  }
}
