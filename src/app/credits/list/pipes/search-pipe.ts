import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(person => {
        if (person.nit.search(searchText) !== -1) {
          return person.nit.search(searchText) !== -1;
        }else if(person.name.search(searchText) !== -1){
          return person.name.search(searchText) !== -1
        }
      });
    }
  }
}
