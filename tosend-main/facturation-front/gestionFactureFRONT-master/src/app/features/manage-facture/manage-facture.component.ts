import { Component, OnInit, ViewChild, } from '@angular/core';
import { FactureService } from '../services/facture.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessagePopupComponent } from 'src/app/shared/message-popup/message-popup.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-facture',
  templateUrl: './manage-facture.component.html',
  styleUrls: ['./manage-facture.component.scss']
})
export class ManageFactureComponent implements OnInit {
  displayedColumns: string[] = ['structureLibelle', 'dueDatefct', 'amount', 'period', 'status','action'];

  dataSource = new MatTableDataSource<any>();
  visible = false;
  allFacture: any[] = [];
  rowLimit = 10;
  offset = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private factureService: FactureService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.factureService.getAllFacture({ limit: this.rowLimit, offset: this.offset }).subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        console.log(data);
        this.allFacture = data;
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

  paid(id: number): void {
    if (localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.dialogService.open(MessagePopupComponent, {
        width: '20rem',
        height: '20rem',
        header: 'ACCESS DENIED'
      });
      return;
    } else if (localStorage.getItem('role') === 'ROLE_USER') {
      this.factureService.updateFacture(id).subscribe((data: any) => {
        console.log(data);
        this.fetchData();
      });
    }
  }
}
