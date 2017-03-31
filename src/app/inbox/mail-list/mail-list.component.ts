import { Component, OnChanges, OnInit } from '@angular/core';
import { Output, Input } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';
import { InboxService } from '../inbox.service';
declare var jQuery: any;

@Component({
  selector: '[mail-list]',
  templateUrl: './mail-list.template.html',
  styles: [require('./mail-list.style.scss')]
})

export class MailList  {
  @Output() replyMail = new EventEmitter();
  @Input() folderName: any;
  mails: Array<any> = [];
  $el: any;
  $toggleAll: any;
 
  constructor(el: ElementRef, private inboxService: InboxService) {
    this.$el = jQuery(el.nativeElement);
  }

  openMail(mail: any): void {
    this.replyMail.emit(mail);
  }

  selectMail(mail: any): void {
    mail.selected = mail.selected ? false : true;
    this.checkToggleAll();
  }

  selectAll(): void {
    let checked = this.$toggleAll.prop('checked');

    this.toggleAll(checked);
  }

  checkToggleAll(): void {
    let checked = true;

    // TODO select read (all)
    this.$el.find('.toggle-one').each(function(i, el): void {
      if (!jQuery(el).prop('checked') && checked) {
        checked = false;
      }
    });

    this.$toggleAll.prop('checked', checked);
  }

  toggleAll(checked: boolean): void {
    for (let mail of this.mails) {
      mail.selected = checked;
    }

    this.$toggleAll.prop('checked', checked);
  }

  deleteEmails(): void {
    let mails = [];
    let mailsDelete = [];
    this.mails.forEach((mail) => {
      if (!mail.selected) {
        mails.push(mail);
      }else{
        mailsDelete.push(mail.id);
      }
    });
    this.mails = mails;

    if(mailsDelete.length>0){

      this.inboxService.deleteMessages(mailsDelete).subscribe((result) => {
        if(result==1){
            this.inboxService.getAllMessages().subscribe((result) => {
              this.mails = result;
            });
        } 
      });

    }
  
  }

  ngOnInit(): void {
    this.$toggleAll = this.$el.find('#toggle-all');
    
    this.inboxService.getAllMessages().subscribe((result) => {
      this.mails = result;
    });
  }

  ngOnChanges(event): void {
    if ('folderName' in event) {
      if (!(event.folderName.previousValue instanceof Object)) {
        this.toggleAll(false);
      }
    }
  }

  changeStarStatus(mail): void {
    mail.starred = !mail.starred;
  }
}
