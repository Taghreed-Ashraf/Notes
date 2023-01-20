import { Component, OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage:string = "";
  sucessMessage:string = "";
  isLoading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    'first_name' :new FormControl(null , [Validators.required]),
    'last_name' :new FormControl(null , [Validators.required]),
    'email' :new FormControl(null , [Validators.required , Validators.email]),
    'age' :new FormControl(null , [Validators.required , Validators.min(16) , Validators.max(80)]),
    'password' :new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,10}$/)]),
  })


  constructor(private _AuthService:AuthService) { }

  
  submitForm() 
  {
    if(this.registerForm.invalid)
    {
      return;
    }
    console.log(this.registerForm)
    this.isLoading = true;

    this._AuthService.signUp(this.registerForm.value).subscribe((response) => {
      console.log(response);
      if(response.message == 'success')
      {
        console.log(response.message);
        this.registerForm.reset();
        this.isLoading = false;
        this.sucessMessage = response.message;
        this.errorMessage = ""
      }
      else 
      {
        this.isLoading = false;
        this.errorMessage = response.errors.email.message;
        this.sucessMessage = ""
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
