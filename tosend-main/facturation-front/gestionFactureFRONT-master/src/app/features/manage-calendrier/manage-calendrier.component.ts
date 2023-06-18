import { Component, OnInit } from '@angular/core';
import { FactureService } from '../services/facture.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';


@Component({
  selector: 'app-manage-calendrier',
  templateUrl: './manage-calendrier.component.html',
  styleUrls: ['./manage-calendrier.component.scss']
})
export class ManageCalendrierComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: []
  };

  constructor(private factureService: FactureService) {}

  ngOnInit() {
    this.factureService.getAllFacture({ limit: 100, offset: 0 }).subscribe(
      (factures) => {
        const events = factures.map((facture) => ({
          title: 'Due',
          date: facture.dueDatefct
        }));

        this.calendarOptions.events = events;
      },
      (error) => {
        console.log('Error retrieving factures:', error);
      }
    );
  }
}
