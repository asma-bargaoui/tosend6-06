import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**login() {
    this.errorMessage = ''; // Clear previous error message
    this.loginService.logIn(this.loginForm.value).subscribe(
      (data: any) => {
        if (data.accessToken) {
          localStorage.setItem('jwt', `${data.tokenType} ${data.accessToken}`);
          localStorage.setItem('role', data.roles[0]);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password'; // Set the error message
        console.log(error);
      }
    );
  }*/
  login() {
    this.loginService.logIn(this.loginForm.value).subscribe(
      (data: any) => {
        if (data.accessToken) {
          localStorage.setItem("jwt", `${data.tokenType} ${data.accessToken}`);
          localStorage.setItem("role", data.roles[0]);
          this.router.navigate(['/home/']);
        } else {
          alert("Incorrect username or password");
        }
        console.log(data);
      },
      (error: any) => {
        console.log("Login error:", error);
        alert("Login error. Please try again.");
      }
    );
  }
}
