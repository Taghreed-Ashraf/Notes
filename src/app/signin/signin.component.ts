import { Component, OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errorMessageOne:string = "";
  errorMessageTwo:string = "";
  isLoading:boolean = false;
  userInfo:any = {};
  userId:string =""

  loginForm:FormGroup = new FormGroup({
    'email' :new FormControl(null , [Validators.required , Validators.email]),
    'password' :new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,10}$/)]),
  })

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  submitForm() 
  {
    if(this.loginForm.invalid)
    {
      return;
    }
    // console.log(this.loginForm)
    this.isLoading = true;

    this._AuthService.signIn(this.loginForm.value).subscribe((response) => {

      // console.log(response);

      if(response.message == 'success')
      {
        this.isLoading = false;
        localStorage.setItem('userToken' , response.token)
        this._AuthService.saveUserData()

        this.userInfo = this._AuthService.userData;
        this.userId = this.userInfo.getValue()._id;
        localStorage.setItem('userID' , this.userId)

        this._Router.navigateByUrl('/profile')
      }
      else 
      {
        this.isLoading = false;

        if( response.message == "email doesn't exist")
        {
          this.errorMessageOne = response.message;
        }
        else if (response.message == 'incorrect password')
        {
          this.errorMessageTwo = response.message;
        }
        // console.log(response.message)
      }
    })

  }



  ngOnInit(): void {
  }








  // Start particles.js
  id = "tsparticles";
  particlesOptions = {
    background: {
      color: {
        value: "transparent"
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push
        },
        onHover: {
          enable: false,
          mode: HoverMode.repulse
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 100,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: false,
        speed: 1,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: {min: 1, max: 5 },
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: any): void {
    console.log(container);
  }

  async particlesInit(engine: any): Promise<void> {
    console.log(engine);
    await loadFull(engine);
  }


}
