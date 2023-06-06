import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../services/application.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DialogService } from 'primeng/dynamicdialog';
import { id } from '@swimlane/ngx-datatable';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({

  selector: 'app-manage-application',
  templateUrl: './manage-application.component.html',
  styleUrls: ['./manage-application.component.scss']
})
export class ManageApplicationComponent implements OnInit {



user: any;
logs: string[] = [];
  visible!: boolean;
  update!: boolean
  delete!: boolean
  applicationForm!: FormGroup;
  applicationUpdateForm!: FormGroup
  applications: any[] = [];
  termToFind: string = ""
  helper = new JwtHelperService()
  id: any;

  displayedColumns: string[] = ['code', 'libelle', 'prix', 'action' ];
  dataSource = new MatTableDataSource<any>();


  constructor(private dialog: MatDialog,private router: Router, private fb: FormBuilder, private applicationService: ApplicationService, private dialogService: DialogService){}
 
  ngOnInit(): void {
    const jwt = localStorage.getItem("jwt")!;
    console.log(jwt);
    
    const decodedJwt = this.helper.decodeToken(jwt);
    console.log(decodedJwt);
    
    this.getAllApplications()
    this.initForm()
    this.initUpdateForm()
  }
  fetchData() {
    this.applicationService.getAllApplications().subscribe(
      (data: any[]) => {
        console.log(data);
        this.applications = data;
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.data = this.applications.filter(item =>
      item.libelle.toLowerCase().includes(filterValue)
    );
  }
  openDialog(){
    this.visible = true;
  }

  initForm(){
    this.applicationForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      prix: ["", Validators.required]
    })
  }
  home() {
    this.router.navigate(['/home']);
  }
  
  initUpdateForm(){
    this.applicationUpdateForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      prix: ["", Validators.required]
    })
  }

  submitApplication(){
    this.applicationService.addNewApplication(this.applicationForm.value).subscribe((data:any)=>{
      this.visible = false;
      this.getAllApplications();
    })
    this.applicationForm.reset();
    console.log(this.applicationForm.value);
    
  }

  getAllApplications() {
    this.applicationService.getAllApplications().subscribe((data: any) => {
      console.log(data);
      this.applications = data;
      this.dataSource.data = this.applications; // Assign data to the dataSource
    });
  }

  openUpdateDialog(app: any){
    this.id = app.id
    if(localStorage.getItem("role")==="ROLE_USER"){
      return;
    }else if(localStorage.getItem("role")==="ROLE_ADMIN"){
      this.update = true;
      this.applicationUpdateForm.patchValue({
        code: app.code,
        libelle: app.libelle,
        prix: app.prix
      })
    }
  }

  updateApp(){
    if(localStorage.getItem("role")==="ROLE_USER"){
      return;
    }else if(localStorage.getItem("role")==="ROLE_ADMIN"){
      this.applicationService.updateApplication(this.id, this.applicationUpdateForm.value).subscribe((data: any)=>{
      console.log(data);
      this.update = false
      this.getAllApplications();
    })
    }
    
  }

 
  openDeleteDialog(id: number) {
    this.id = id;
    this.delete = true;
  }


  deleteApp(){
    if(localStorage.getItem("role")==="ROLE_USER"){
      return;
    }else if(localStorage.getItem("role")==="ROLE_ADMIN"){
        this.applicationService.deleteApplication(this.id).subscribe((data: any)=>{
          console.log(data);
          this.getAllApplications()
          this.update = false
        })
      
    }
    
  }
  
  logToInterface(message: string) {
    this.logs.push(message);
  }
}