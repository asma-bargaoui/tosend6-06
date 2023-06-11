import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StructureService } from '../services/structure.service';
import { ConfirmationService } from 'primeng/api';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-manage-structure',
  templateUrl: './manage-structure.component.html',
  styleUrls: ['./manage-structure.component.scss']
})
export class ManageStructureComponent implements OnInit {

  visible: boolean = false;
  update: boolean = false;
  ministereList: any[] = [];
  structureList: any[] = [];
  structureForm!: FormGroup;
  structureUpdateForm!: FormGroup;
  selectedMinistere!: number | null;
  
  displayedColumns: string[] = ['code', 'libelle', 'ministere','action'];
  
  structureId!: number;
  delete!: boolean;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource: any;
 

  constructor(private fb: FormBuilder, private structureService: StructureService, confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initForm();
    this.initUpdateForm();
    this.getAllWithoutMinistere();
    this.getAllStructure();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchData();
  }

  fetchData() {
    this.structureService.getStructureAll().subscribe(
      (data: any[]) => {
        console.log(data);
        this.structureList = data;
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.structureList = this.structureList.filter(item =>
    item.libelle.toLowerCase().includes(filterValue)
  );
}

  initForm() {
    this.structureForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      ministere: ["", Validators.required]
    });
  }

  initUpdateForm() {
    this.structureUpdateForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      ministere: ["", Validators.required],
      id: [0]
    });
  }

  openDialog() {
    this.visible = true;
  }

  openUpdateDialog(st: any){
    this.update = true;
    this.structureUpdateForm.patchValue({
      code: st.code,
      libelle: st.libelle,
      ministere: st.ministere,
      id: st.id
    })
    console.log(this.structureUpdateForm.value);
    
  }

  getAllWithoutMinistere() {
    this.structureService.getAllStructureWithoutMinistere().subscribe(
      (data: any[]) => {
        console.log(data);
        this.ministereList =  data;
        this.selectedMinistere = null;

      }
    );
  }

  getAllStructure() {
    this.structureService.getStructureAll().subscribe(
      (data: any[]) => {
        console.log(data);
        this.structureList = data;
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  submitStructure() {
    console.log(this.structureForm.value);
    this.structureService.createStructure(this.structureForm.value).subscribe((data: any) => {
      console.log(data);
      this.visible = false;
      this.getAllStructure();
    });
  }

  updateStructure() {
    this.structureService.updateStructure(this.structureUpdateForm.value.id, this.structureUpdateForm.value).subscribe((data: any) => {
      console.log(data);
      this.update = false;
      this.getAllStructure();
    });
  }

  openDeleteDialog(structureId: number) {
    this.structureId = structureId;
    this.delete = true;
  }

  deleteStructure(){
   
        this.structureService.deleteStructure(this.structureId).subscribe((data: any)=>{
          console.log(data);
          this.getAllStructure();
        })
      }
}
