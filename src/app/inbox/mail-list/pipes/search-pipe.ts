import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})

export class SearchPipe implements PipeTransform {

  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(mail => {
        if (mail.sender.search(searchText) !== -1) {

          return mail.sender.search(searchText) !== -1;
        
        }else if(mail.subject.search(searchText) !== -1){
          
          return mail.subject.search(searchText) !== -1;
        
        }
      });
    }
  }
}
