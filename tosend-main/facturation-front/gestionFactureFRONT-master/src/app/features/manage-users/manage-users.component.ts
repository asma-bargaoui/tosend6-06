import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit, AfterViewInit {
  

  displayedColumns: string[] = ['username', 'email', 'role', 'action', 'Bloquer/Débloquer'];
  dataSource = new MatTableDataSource<any>();

  userRoleCount!: number;
  adminRoleCount!: number;
  userForm!: FormGroup;
  userUpdateForm!: FormGroup;
  chart: any;
  visible!: boolean;
  update!: boolean;
  roles: any[] = [];
  allUsers: any[] = []
  delete!: boolean
  username!: string
  search!: string;
  filter: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  id!: string;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.userRoleCount = 0;
    this.adminRoleCount = 0;
    this.initForm()
    this.initUpdateForm()
    this.getAllRoles()
    this.getAllUsers()
    this.dataSource.data = this.allUsers;
   
  };
  home() {
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchData();
  }

  fetchData() {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        console.log(data);
        this.allUsers = data
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: any[]) => {
        this.allUsers = users;
        this.calculateRoleCounts();
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }

    sortUsers(column: string, order: string) {
     
      if (column === 'username') {
        if (order === 'asc') {
          this.allUsers.sort((a, b) => a.username.localeCompare(b.username));
        } else if (order === 'desc') {
          this.allUsers.sort((a, b) => b.username.localeCompare(a.username));
        }
      }
      // Add additional logic for sorting based on other columns if needed
    }


  openDialog(){
    this.visible = true;
  }
  initForm() {
    this.userForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      role: [[], Validators.required] // Set initial value as an empty array
    });
  }

  initUpdateForm(){
    this.userUpdateForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      roles: [[], Validators.required]
    })
  }

  getAllRoles(){
    this.roleService.getAllRoles().subscribe((rolesData: any[])=>{
      this.roles = rolesData;
      console.log(rolesData);
    
    })
  }


  calculateRoleCounts() {
    this.userRoleCount = 0;
    this.adminRoleCount = 0;
    for (const user of this.allUsers) {
      for (const role of user.roles) {
        if (role.name === 'ROLE_USER') {
          this.userRoleCount++;
          break; // Exit the inner loop once the ROLE_USER is found
        }
        if (role.name === 'ROLE_ADMIN') {
          this.adminRoleCount++;
          break; // Exit the inner loop once the ROLE_ADMIN is found
        }
      }
    }
  
  }
/**   private createChartDoughnutCategorie(): void {
    const canvas = document.getElementById('analyseCategorie') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Users', 'Admins'],
        datasets: [{
          label: 'User and Admin Counts',
          data: [this.userRoleCount, this.adminRoleCount],
          backgroundColor: ['blue', 'red']
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1
      }
    });
  }
  */
  
  submitUser() {
    const userFormValue = this.userForm.value;
    userFormValue.role = [userFormValue.role.name]; // Wrap the role name in an array
  
    console.log(userFormValue);
  
    this.userService.saveNewUser(userFormValue).subscribe(
      (res: any) => {
        console.log(res);
        this.visible = false;
        this.getAllUsers();
        const successMsg = 'User saved successfully.';
        console.log(successMsg);
      },
      (error: any) => {
        console.log(error);
        const errorMsg = error?.error?.message || 'An error occurred while saving the user.';
        console.log(errorMsg);
      }
    );
  }
  

  openUpdateDialog(user: any){
    this.update = true;
    this.userUpdateForm.patchValue({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.roles[0],
    })
  }

  updateUser(){
    this.userService.updateUser(this.userUpdateForm.value).subscribe((data: any)=>{
      console.log(data);
      this.getAllUsers();
      this.update = false;
    })
  }

  openDeleteDialog(id: string){
    this.delete= true;
    this.id = id;
    
    
  }

  deleteUser(){
    this.userService.deleteUser(this.id).subscribe((data: any)=>{
      this.getAllUsers();
      console.log(data);
      this.delete= false;
    })
  }


/**searchUser(){this.userService.deleteUser(this.id).subscribe((data: any)=>{this.getAllUsers();
console.log(data);
})

}*/

toggleBlock(user: any): void {
  const blockUrl = `http://localhost:8060/api/test/${user.blocked ? 'unblock' : 'block'}/${user.id}`;

  this.http.put(blockUrl, {}).subscribe(
    (response: any) => {
      // Handle the response if needed
      console.log(response);

      // Update the user's blocked status locally
      user.blocked = !user.blocked;
    },
    (error: any) => {
      // Handle errors if any
      console.error(error);
    }
  );
}


}