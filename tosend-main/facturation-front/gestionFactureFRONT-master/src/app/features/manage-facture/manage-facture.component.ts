import { Component, OnInit } from '@angular/core';
import { FactureService } from '../services/facture.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessagePopupComponent } from 'src/app/shared/message-popup/message-popup.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-manage-facture',
  templateUrl: './manage-facture.component.html',
  styleUrls: ['./manage-facture.component.scss']
})
export class ManageFactureComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  sortType: string = 'asc'; 
  visible!: boolean;
  allFacture: any[] = [];
  helper = new JwtHelperService();
  isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";
  public items: any[] = [];
  columns: any[] = [];
  searchText: string = '';
  rowLimit: number = 10;
  value: number = 10;

  offset: number = 0;
  totalItems: number = 0;
  notVisibleToAdmin: any;
  paginator: any;

  navigateToFacture() { if (!this.notVisibleToAdmin) {
    this.router.navigate(["home/manageFacture"]);
  }
  
  }
  constructor(private factureService: FactureService, private messageService: MessageService, private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
    

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchData();
  }
 
  showDialog() {
    this.visible = true;
  }
  
  getAllFacture(config: { limit: number; offset: number }): void {
    this.factureService.getAllFacture(config).subscribe((data: any[]) => {
      console.log(data);
      this.allFacture = data;
      this.items = data;
      this.totalItems = data.length;
    });
    this.columns = [
      { name: 'Structure', prop: 'structureLibelle' },
      { name: 'Status', prop: 'status' },
      { name: 'Structure', prop: 'structure' },
      { name: "Date d'echeance fct", prop: 'dueDatefct' },
      { name: 'Montant', prop: 'amount' },
      {  name: 'Periode', prop: 'period'  }
    ];
  }
  calculateTotalItems(data: any[]): number {
   
    return data.length; 
  }
  onPageChange(event: any): void {
    this.offset = (event.page - 1) * this.rowLimit;
    this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
  }

  onRowLimitChange(): void {
    this.offset = 0;
    this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
  }
  fetchData() {
    this.factureService.getAllFacture({limit: this.rowLimit, offset: this.offset }).subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        console.log(data);
        this.allFacture = data
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
  home() {
    this.router.navigate(['/home']);
  }

 
  paid(id: number): void {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      this.dialogService.open(MessagePopupComponent, {
        width: '20rem',
        height: "20rem",
        header: "ACCESS DENIED"
      });
      return;
    } else if (localStorage.getItem("role") === "ROLE_USER") {
      this.factureService.updateFacture(id).subscribe((data: any) => {
        console.log(data);
        this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
      });
    }
  }

}