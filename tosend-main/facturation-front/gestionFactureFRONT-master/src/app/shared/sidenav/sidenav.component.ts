import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  notVisibleToUser: boolean;
  notVisibleToAdmin: boolean;

  constructor(private router: Router) {
    this.notVisibleToUser = localStorage.getItem("role") === "ROLE_ADMIN";
    this.notVisibleToAdmin = !this.notVisibleToUser;
  }

  navigateToUsers() {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      this.router.navigate(["home/manageUsers"]);
    }
  }

  navigateToApplications() {
    this.router.navigate(["home/manageApplication"]);
  }

  navigateToStructure() {
    this.router.navigate(["home/manageStructure"]);
  }

  navigateToFacture() {
    if (this.notVisibleToAdmin) {
      this.router.navigate(["home/manageFacture"]);
    }
  }

  navigateToConventions() {
    if (this.notVisibleToAdmin) {
      this.router.navigate(["home/manageConvention"]);
    }
  }
}
