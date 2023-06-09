import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConventionService } from '../services/convention.service';
import { StructureService } from '../services/structure.service';
import { ApplicationService } from '../services/application.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-convention',
  templateUrl: './manage-convention.component.html',
  styleUrls: ['./manage-convention.component.scss']
})
export class ManageConventionComponent implements OnInit {

  displayedColumns: string[] =['application','structure','nbr_reel','nbr_Min','nbr_Max','total_amount','dateSignature','conventionDuration', 'dueDate','action'];
  conventionForm!: FormGroup;
  visible: boolean = false;
  structureList: any[] = [];
  applicationList: any[] = [];
  dataSource: MatTableDataSource<any>;
  ConventionsByUser: any[] = [];
  delete: boolean = false;
  id!: string;
  ConventionUpdateForm!: FormGroup;
  update: boolean = false;
selectedConvention: any;
errorMessage: string | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private conventionService: ConventionService,
    private structureService: StructureService,
    private applicationService: ApplicationService
  ) { this.dataSource = new MatTableDataSource<any>(); }

  ngOnInit(): void {
    this.initForm();
    this.getApplication();
    this.getStructures();
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.conventionService.getConventionsByUser().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        console.log(data);
        this.ConventionsByUser = data;
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

  openDialog() {
    this.visible = true;
  }

  initForm() {
    this.conventionForm = this.fb.group({
      application: ['', Validators.required],
      structure: ['', Validators.required],
      nbr_reel: [0, Validators.required],
      nbr_Min: [0, Validators.required],
      nbr_Max: [0, Validators.required],
      dateSignature: ['', Validators.required],
      conventionDuration: [0, Validators.required],
    });
  }
  initUpdateForm() {
    this.ConventionUpdateForm = this.fb.group({
      application: ['', Validators.required],
      structure: ['', Validators.required],
      nbr_reel: [0, Validators.required],
      nbr_Min: [0, Validators.required],
      nbr_Max: [0, Validators.required],
      dateSignature: ['', Validators.required],
      conventionDuration: [0, Validators.required],
    });
  }

  validateForm(): void {
    const nbrReel = this.conventionForm.get('nbr_reel')?.value;
    const nbrMin = this.conventionForm.get('nbr_Min')?.value;
    const nbrMax = this.conventionForm.get('nbr_Max')?.value;

    if (nbrReel && nbrMin && nbrMax) {
      if (nbrReel < nbrMin || nbrReel > nbrMax) {
        this.conventionForm.setErrors({ nbrRange: true });
      } else {
        this.conventionForm.setErrors(null);
      }

      if (nbrMin > nbrMax) {
        alert('Nbr_Min cannot be greater than Nbr_Max');
        return;
      } else {
        this.conventionForm.setErrors(null);
      }
    }
  }

  submitConvention() {
    if (this.conventionForm.invalid) {
      return;
    }

    const selectedApplication = this.conventionForm.value.application;
    const selectedStructure = this.conventionForm.value.structure;

    const convention = {
      application: selectedApplication,
      structure: selectedStructure,
      nbr_reel: this.conventionForm.value.nbr_reel,
      nbr_Min: this.conventionForm.value.nbr_Min,
      nbr_Max: this.conventionForm.value.nbr_Max,
      dateSignature: this.formatDate(this.conventionForm.value.dateSignature),
      conventionDuration: this.conventionForm.value.conventionDuration
    };

    this.conventionService.createConvention(convention).subscribe(
      (data: any) => {
        this.conventionForm.reset();
        this.visible = false;
        // Handle success case
        console.log(data);
      },
      (error: any) => {
        const errorMessage =
          'An error occurred while creating the convention. Please verify your inputs.' +
          '\n\nError Details:\n' +
          JSON.stringify(convention);
        alert(errorMessage);
        console.error(error);
        // Handle error case
      }
    );
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  getApplication() {
    this.applicationService.getAllApplications().subscribe(
      (data: any[]) => {
        console.log(data);
        this.applicationList = data;
      },
      (error: any) => {
        console.log('An error occurred while fetching Apps:', error);
      }
    );
  }

  getStructures() {
    this.structureService.getStructureAll().subscribe(
      (data: any[]) => {
        console.log(data);
        this.structureList = data;
      },
      (error: any) => {
        console.log('An error occurred while fetching structures:', error);
      }
    );
  }
  generateErrorMessage(convention: any, error: any): string {
    let errorMessage = 'An error occurred while creating the convention. Please verify your inputs.\n\n';

    if (error && error.error && error.error.message) {
      errorMessage += 'Error Message:\n' + error.error.message;
    } else {
      errorMessage += 'Error Details:\n' + JSON.stringify(convention);
    }

    return errorMessage;
  }
  openUpdateDialog(convention: any) {
    this.selectedConvention = convention;
    this.initUpdateForm();
    this.update = true;
  }

  updateConvention() {
    if (this.ConventionUpdateForm.valid) {
      const updatedConvention = {
        ...this.selectedConvention,
        ...this.ConventionUpdateForm.value
      };
  
      this.conventionService.updateConvention(Number(this.id),updatedConvention).subscribe(
        (data: any) => {
          // Update the convention in the table
          const index = this.ConventionsByUser.findIndex(c => c.id === data.id);
          if (index !== -1) {
            this.ConventionsByUser[index] = data;
            this.dataSource.data = this.ConventionsByUser;
          }
          this.update = false;
        },
        (error: any) => {
          console.log(error);
          // Handle error
        }
      );
    }
  }

openDeleteDialog(id: string) {
    this.delete = true;
    this.id = id;
  }

  deleteConvention() {
    this.conventionService.deleteConvention(Number(this.id)).subscribe(
      (response: any) => {
        console.log(response);
        // Handle success case
        this.fetchData();
        this.delete = false;
      },
      (error: any) => {
        console.error(error);
        // Handle error case
      }
      );
    }
}
