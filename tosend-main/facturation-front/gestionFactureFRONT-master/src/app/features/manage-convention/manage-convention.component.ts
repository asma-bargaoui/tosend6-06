import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConventionService } from '../services/convention.service';
import { StructureService } from '../services/structure.service';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-manage-convention',
  templateUrl: './manage-convention.component.html',
  styleUrls: ['./manage-convention.component.scss']
})
export class ManageConventionComponent implements OnInit {

  conventionForm!: FormGroup;
  visible: boolean = false;
  structureList: any[] = [];
  applicationList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private conventionService: ConventionService,
    private structureService: StructureService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getApplication();
    this.getStructures();
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
        const errorMessage = 'An error occurred while creating the convention. Please verify your inputs.'
          + '\n\nError Details:\n' + JSON.stringify(convention);
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
}
