import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TwoFirstLettersPipe } from './pipes/two-first-letters.pipe';
import { PasswordModule } from 'primeng/password';
import { ApplicationPopupComponent } from './application-popup/application-popup.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';



@NgModule({
  declarations: [
    SidenavComponent,
    NavbarComponent, TwoFirstLettersPipe, ApplicationPopupComponent, MessagePopupComponent, ConfirmComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    ScrollingModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule,
    DropdownModule,
    MatIconModule,
    InputTextModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollPanelModule,
    CheckboxModule,
    PasswordModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    CalendarModule,
    MessagesModule,
    ToastModule,
    MatDialogModule
  ], 
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    ScrollingModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule,
    DropdownModule,
    MatIconModule,
    InputTextModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollPanelModule,
    CheckboxModule,
    TwoFirstLettersPipe,
    SidenavComponent,
    NavbarComponent,
    PasswordModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    CalendarModule,
    MessagesModule,
    ToastModule,
    MatDialogModule
  ], 
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
