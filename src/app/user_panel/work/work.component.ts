import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  allWork: any[] = [];
  typeSelected = 'design';
  constructor(private route: ActivatedRoute, private workService: WorkService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allWork = data['allWork'];
    })
    console.log(this.allWork);
  }


  setType(type: string) {
    this.typeSelected = type;
  }
}
