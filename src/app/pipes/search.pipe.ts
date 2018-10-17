import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(units: any[], searchText: string): any[] {
    if(!units) return [];
    if(!searchText) return units;
    
    searchText = searchText.toLowerCase();
    return units.filter( unit => {
      return unit.title.toLowerCase().includes(searchText);
    });
   } 

}