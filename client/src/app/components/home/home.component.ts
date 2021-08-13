import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/material/delete-modal/delete-modal.component';
import { CompanyService } from 'src/app/services/company/company.service';
import { IEvent } from 'src/app/shared/interfaces/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  events: IEvent[] | undefined;

  get isLogged(): boolean {
    return localStorage.user != null;
  }

  constructor(
    private companyService: CompanyService, 
    private router: Router,
    public dialog: MatDialog) {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = undefined;
    this.companyService.getEvents().subscribe((events) => {
      events.forEach((r) => this.setDateProperties(r));
      events.forEach((r) => this.checkOwnerPosts(r));
      this.events = events;
    });
  }

  setDateProperties(event: IEvent) {
    let newDate = new Date(event.date);
    event.dateMonth = newDate.toLocaleString('default', { month: 'short' });
    event.dateDay = newDate.getDate();
  }

  checkOwnerPosts(event: IEvent) {
    if (this.isLogged) {
      const userId = JSON.parse(localStorage.getItem('user')!).user._id;
      event.companyId.ownerId == userId
        ? (event.isOwner = true)
        : (event.isOwner = false);
    }
  }

  delete(eventId: string): void {
    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    const data = { userId };
    this.companyService.deleteEvent(eventId, data).subscribe(() => {
      var index = this.events!.map(x => {
        return x._id;
      }).indexOf(eventId);
      
      this.events!.splice(index, 1);
      console.log(this.events);
    });
  }

  openDeleteDialog(eventId: string) {
    this.dialog.open(DeleteModalComponent).afterClosed().subscribe(res => {
      if(res){  
       this.delete(eventId);
      } 
    });
  }
}
