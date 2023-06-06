import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApplicationService } from 'src/app/features/services/application.service';

@Component({
  selector: 'app-application-popup',
  templateUrl: './application-popup.component.html',
  styleUrls: ['./application-popup.component.scss']
})
export class ApplicationPopupComponent implements OnInit {

  applicationForm!: FormGroup;

  constructor(private dialogService: DynamicDialogConfig,private fb: FormBuilder, private applicationService: ApplicationService){}
 
 
  ngOnInit(): void {
    this.initForm()
    // console.log(this.dialogSer vice.data);
    
  }

  submitApplication(){
    this.applicationService.addNewApplication(this.applicationForm.value).subscribe((data:any)=>{
      console.log(data);
      this.applicationForm.reset();
    })    
  }


  initForm(){
    this.applicationForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      prix: ["", Validators.required]
    })
  }

}
