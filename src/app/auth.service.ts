import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { RegisterRequest } from './register-request';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null) 

  constructor(private Http: HttpClient , private _Router:Router) 
  { 
    if(localStorage.getItem('userToken'))
    {
      this.saveUserData();
    }
  }

  saveUserData()
  {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let deCodedToken:any = jwtDecode(encodedToken);
    this.userData.next(deCodedToken);
    // console.log('Data' , this.userData);
  }

  signUp (registerData:RegisterRequest):Observable<any>
  {
    return this.Http.post(`https://sticky-note-fe.vercel.app/signup`,registerData)
  }

  signIn (loginData:RegisterRequest):Observable<any>
  {
    return this.Http.post(`https://sticky-note-fe.vercel.app/signin`,loginData)
  }

  signOut()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    this.userData.next(null);
    this._Router.navigateByUrl('/signin')
  }

  isLogin()
  {
    return !!localStorage.getItem('userToken')
  }
}
