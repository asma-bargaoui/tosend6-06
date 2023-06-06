import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ChartOptions, ChartType } from 'chart.js';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private chart: Chart | null = null;

  url: string = '';
  userCount: number = 0;
  adminCount: number = 0;
  dataSource: any[] = [];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  chartLabels: string[] = ['Users', 'Admins'];
  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'bar';
  chartData: { data: number[]; label: string; }[] | undefined;

  constructor(private router: Router, private userService: UserService) {
    router.events.subscribe((e: any) => {
      this.url = e.routerEvent?.url;
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.userCount = users.length;
      this.adminCount = users.filter(user => user.roles.some((role: { name: string; })=> role.name === 'ROLE_ADMIN')).length;
      this.chartData = [
        { data: [this.userCount, this.adminCount], label: 'User and Admin Count' }
      ];
    });
  }
  

  get notVisibleToUser(): boolean {
    return this.userCount === 0;
  }
}