import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cohort-overview',
  templateUrl: './cohort-overview.component.html',
  styleUrls: ['./cohort-overview.component.scss']
})
export class CohortOverviewComponent implements OnInit {
  @Input() cohort: any;
  @Input() currentUser: any;
  id: string;
  error = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.cohort)
    console.log(this.cohort.students)
  }

  handleDeleteClick(id) {
    this.userService.delete(id)
      .then(() => {
        this.cohort.students = this.cohort.students.filter(student => {
          return student._id !== id;
        })
      })
  }
}
