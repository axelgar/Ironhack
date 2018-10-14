import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DaysService } from './days.service';
import { CohortService } from './cohort.service';

@Injectable()
export class DragulaHandler {

  constructor(
    private dragulaService: DragulaService,
    private dayService: DaysService,
    private cohortService: CohortService,
  ) 
  {
    dragulaService.setOptions('lists', {
      moves: function (el, container, handle) {
        return handle.classList.value.includes('grid-days');
      }
    });
  }

  listenTo() {
    this.dragulaService.dropModel.subscribe((value) => {
      const element = value[1].id;
      const to = value[2].id;
      const from = value[3].id;
      this.cohortService.shiftUnit(from, to, element);
    });
  }
}

