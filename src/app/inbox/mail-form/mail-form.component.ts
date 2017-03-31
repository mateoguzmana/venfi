import { Component, OnInit } from '@angular/core';
import { Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { InboxService } from '../inbox.service';

@Component({
  selector: '[mail-form]',
  templateUrl: './mail-form.template.html',
})

export class MailForm implements OnInit{
  @Output() backToMailList = new EventEmitter();
  @Input() message: any;

  allEmails: any;

  sender: string = '';
  subject: string = '';
  body: string = '';

  constructor(private inboxService: InboxService) {}

  onToBack(): void {
    console.log('qwerty');
    this.backToMailList.emit('');
  }

  ngOnInit() {
    if (this.message) {
      this.sender = this.message.sender;
      this.subject = 'Re: ' + this.message.subject;

      let span = document.createElement('span');
      span.innerHTML = this.message.message;
      this.body = span.innerText;
    }

    this.inboxService.getAllEmails().subscribe((result) => {
      this.allEmails = result;
    
      $(".js-example-placeholder-multiple").select2({
        data: this.allEmails,
        placeholder: "Seleccione un correo",
        multiple: true
      });  
    });
    
  }
  
  // Function when message is send directly
  sendMessage(){
    var idsender = localStorage.getItem("check_point");
    var to       = $("#to").val();
    var subject  = $("#input-subject").val();
    var message  = $("#wysiwyg").val();

    var content = {
      idsender: idsender,
      emails  : to,
      subject : subject,
      message : message
    }
    
    // Call function to send
    this.inboxService.sendMail(content).subscribe((result) => {
      if(result==1){
        this.onToBack();
      }
    });
  }

  saveDraft(){
    var idsender = localStorage.getItem("check_point");
    var to       = $("#to").val();
    var subject  = $("#input-subject").val();
    var message  = $("#wysiwyg").val();

    var content = {
      idsender: idsender,
      emails  : to,
      subject : subject,
      message : message
    }
    
    // Call function to draft
    this.inboxService.draftMail(content).subscribe((result) => {
      if(result==1){
        this.onToBack();
      }
    });
  }
}

