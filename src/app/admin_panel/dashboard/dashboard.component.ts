import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  type = "-1";
  img = "";
  url = "";
  description = "";

  constructor(private workService: WorkService, private router: Router) { }

  onSubmit() {
    if (!this.url) this.url = this.img
    this.workService.add(this.description, this.img, this.type, this.url).subscribe(() => {
      window.location.reload();
    })
  }
}
