import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router){}
  home() {
    this.router.navigate(['/home']);
  }
  helper = new JwtHelperService()
  usernameLoggedIn: string = ""
  ngOnInit(): void {
    const jwt = localStorage.getItem("jwt")!;
    const decodedJwt = this.helper.decodeToken(jwt);
    this.usernameLoggedIn = decodedJwt.sub
    console.log(decodedJwt);
    
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(["auth/login"])
  }

}
