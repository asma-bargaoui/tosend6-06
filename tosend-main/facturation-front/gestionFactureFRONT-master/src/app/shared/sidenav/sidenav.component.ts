import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isCollapsed: boolean;
  notVisibleToUser: boolean;
  notVisibleToAdmin: boolean;
  currentPage: string; // Add the currentPage property

  constructor(private router: Router) {
    this.isCollapsed = false;
    this.notVisibleToUser = localStorage.getItem("role") === "ROLE_ADMIN";
    this.notVisibleToAdmin = !this.notVisibleToUser;
    this.currentPage = ''; // Initialize the currentPage property
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateToUsers() {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      this.currentPage = 'users'; // Update the currentPage property
      this.router.navigate(["home/manageUsers"]);
    }
  }

  navigateToApplications() {
    this.currentPage = 'applications'; // Update the currentPage property
    this.router.navigate(["home/manageApplication"]);
  }

  navigateToStructure() {
    this.currentPage = 'structures'; // Update the currentPage property
    this.router.navigate(["home/manageStructure"]);
  }

  navigateToFacture() {
    if (this.notVisibleToAdmin) {
      this.currentPage = 'factures'; // Update the currentPage property
      this.router.navigate(["home/manageFacture"]);
    }
  }

  navigateToConventions() {
    if (this.notVisibleToAdmin) {
      this.currentPage = 'conventions'; // Update the currentPage property
      this.router.navigate(["home/manageConvention"]);
    }
  }

  navigateToCalendrier(){
    if (this.notVisibleToAdmin) {
      this.currentPage = 'Calendrier'; 
      this.router.navigate(["home/manageCalendrier"]);
    }
  }


  navigateToCompte(){
    if (this.notVisibleToAdmin) {
      this.currentPage = 'Compte'; 
      this.router.navigate(["home/manageCompte"]);
    }
  }


}
