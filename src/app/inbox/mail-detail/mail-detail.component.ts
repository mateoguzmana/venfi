import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InboxService } from '../inbox.service';

@Component({
  selector: '[mail-detail]',
  templateUrl: './mail-detail.template.html',
  styleUrls: ['./mail-detail.style.scss']
})
export class MailDetail {
  @Input() mail: any;
  @Output() backToMailList = new EventEmitter();
  @Output() replyMessage = new EventEmitter();
  math = Math;

  UsersEmail: any;

  constructor(private inboxService: InboxService) {}

  ngOnInit(){
    this.inboxService.getUsersEmail(this.mail.emails).subscribe((result) => {
      this.UsersEmail = result;
    });
  }

  onToBack(): void {
    this.backToMailList.emit('');
  }

  goToReply(mail): void {
    this.replyMessage.emit(mail);
  }

  Math(): number {
    return Math.random();
  }
}

