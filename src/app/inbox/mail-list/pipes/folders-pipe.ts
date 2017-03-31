import { Pipe, PipeTransform } from '@angular/core';

const FOLDERS = [
  {'name': 'Sent Mail', 'order': 1, 'id': 2, 'unread': 0},
  {'name': 'Draft', 'order': 2, 'id': 1, 'unread': 3},
  {'name': 'Trash', 'order': 1, 'id': 0, 'unread': 0}
];

@Pipe({
  name: 'FoldersPipe'
})
export class FoldersPipe implements PipeTransform {

  folders = FOLDERS;

  transform(value, args?): Array<any> {
    let folderName = args;
    if (value) {
      return value.filter(conversation => {
        /* tslint:disable */
        if (folderName == 'Starred') {

          return conversation.starred;
        }else {

          let folder =  this.folders.filter(folder => folder.name == folderName);

          return folder[0].id == conversation.folderId;
          /* tslint:enable */
        }
      });
    }
  }
}

