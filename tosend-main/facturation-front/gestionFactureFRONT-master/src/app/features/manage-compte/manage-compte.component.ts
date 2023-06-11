import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-compte',
  templateUrl: './manage-compte.component.html',
  styleUrls: ['./manage-compte.component.scss']
})
export class ManageCompteComponent {
  username: string = "JohnDoe";
  password: string = "*********";
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
