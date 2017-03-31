webpackJsonp([13],{1020:function(e,n){e.exports=".nav-email-folders > li > .nav-link {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-radius: 0.25rem;\n  color: #777;\n  font-weight: 400; }\n  .nav-email-folders > li > .nav-link:hover {\n    background-color: #e5e5e5;\n    color: #55595c; }\n  .nav-email-folders > li > .nav-link > .fa-circle {\n    margin-top: 3px; }\n\n.nav-email-folders > li > .nav-link > .label {\n  padding-top: 5px;\n  padding-bottom: 5px; }\n\n.nav-email-folders > li.active > .nav-link, .nav-email-folders > li.active > .nav-link:hover, .nav-email-folders > li.active > .nav-link:focus {\n  background-color: #ddd;\n  color: #55595c;\n  font-weight: 600; }\n  .nav-email-folders > li.active > .nav-link > .label, .nav-email-folders > li.active > .nav-link:hover > .label, .nav-email-folders > li.active > .nav-link:focus > .label {\n    color: #55595c;\n    background-color: #fff; }\n\n.nav-email-folders .tag-white {\n  color: #555; }\n"},1021:function(e,n){e.exports='.email-view hr {\n  margin: 5px 0; }\n\n.email-view .email-body {\n  margin-top: 1rem; }\n\n.email-details img {\n  width: 30px;\n  height: 30px;\n  float: left; }\n\n.email-details-content::after {\n  content: "";\n  display: table;\n  clear: both; }\n\n.email-details-content .email {\n  color: #999999;\n  font-size: 13px; }\n\n.email-details-content .receiver {\n  display: block;\n  color: #999999;\n  margin-top: -6px; }\n\n.email-details-content .email-date {\n  margin-right: 10px;\n  line-height: 28px;\n  vertical-align: middle; }\n\n.email-attachments .attachment img {\n  display: block; }\n\n.email-attachments .attachment .title {\n  margin: 0;\n  font-weight: bold; }\n'},1022:function(e,n){e.exports=".widget-email-count {\n  display: inline-block;\n  margin: 0;\n  font-size: 13px;\n  color: #818a91;\n  line-height: 29px; }\n  .widget-email-count + .widget-email-pagination {\n    margin-left: 10px;\n    border-left: 1px solid #ddd;\n    padding-left: 15px;\n    border-radius: 0;\n    vertical-align: -9px; }\n\n.widget-email header .form-control {\n  font-size: 0.8571rem;\n  border: 1px solid #ccc; }\n  .widget-email header .form-control:focus {\n    border-color: #66afe9;\n    outline: none; }\n\n.widget-email-pagination {\n  margin: 0; }\n  .widget-email-pagination .page-link {\n    color: #888; }\n\n.table-emails {\n  margin-bottom: 0; }\n  .table-emails tbody > tr > td:first-child {\n    width: 45px; }\n  .table-emails td,\n  .table-emails th {\n    padding: 7px 5px 7px 5px; }\n  .table-emails td > .abc-checkbox,\n  .table-emails th > .abc-checkbox {\n    left: -18px; }\n    .table-emails td > .abc-checkbox > label:before,\n    .table-emails td > .abc-checkbox > label:after,\n    .table-emails th > .abc-checkbox > label:before,\n    .table-emails th > .abc-checkbox > label:after {\n      margin-left: 0px; }\n  .table-emails .name,\n  .table-emails .subject,\n  .table-emails .date {\n    cursor: pointer; }\n  .table-emails .date {\n    text-align: right;\n    min-width: 65px; }\n  .table-emails .unread {\n    font-weight: 600;\n    color: #55595c; }\n  .table-emails .starred {\n    color: #818a91;\n    cursor: pointer; }\n    .table-emails .starred:hover {\n      color: #55595c; }\n    .table-emails .starred .fa-star {\n      color: #f0ad4e; }\n"},1036:function(e,n){e.exports='<ol class="breadcrumb">\r\n  <li class="breadcrumb-item">Inicio</li>\r\n  <li class="breadcrumb-item active">Email</li>\r\n</ol>\r\n<h1 class="page-title">Bandeja de entrada</h1>\r\n<div class="row">\r\n  <div class="col-lg-3 col-xl-2 col-xs-12">\r\n    <a class="btn btn-primary btn-block" href="#" id="compose-btn" (click)="handleComposeBtn()">Redactar</a>\r\n    <ul class="nav nav-pills nav-stacked nav-email-folders mt" id="folders-list">\r\n      <!--<li class="nav-item active">\r\n        <a class="nav-link" (click)="setFolderName(\'Inbox\')">\r\n          <span class="tag tag-pill tag-white pull-xs-right">2</span>\r\n          Inbox\r\n        </a>\r\n      </li>-->\r\n      <!--<li class="nav-item"><a class="nav-link" (click)="setFolderName(\'Starred\')">Starred</a></li>-->\r\n      <li class="nav-item"><a class="nav-link" (click)="setFolderName(\'Sent Mail\')">Enviados</a></li>\r\n      <li class="nav-item"><a class="nav-link" (click)="setFolderName(\'Draft\')">Borradores</a></li>\r\n      <li class="nav-item"><a class="nav-link" (click)="setFolderName(\'Trash\')">Papelera</a></li>\r\n    </ul>\r\n  </div>\r\n  <div *ngIf="mailListShow" mail-list [folderName]="currentFolderName" (replyMail)="onReplyMail($event)" class="col-lg-9 col-xl-10 col-xs-12"></div>\r\n  <div *ngIf="mailFormShow" mail-form (backToMailList)="changeEmailComponents(\'mailList\')" [message]="repliedMessage" class="col-lg-9 col-xl-10 col-xs-12"></div>\r\n  <div *ngIf="mailDetailShow" mail-detail [mail]="currentMail" (replyMessage)="handleComposeBtn($event)" (backToMailList)="changeEmailComponents(\'mailList\')" class="col-lg-9 col-xl-10 col-xs-12"></div>\r\n</div>\r\n'},1037:function(e,n){e.exports='<div class="clearfix mb-xs">\r\n  <a class="btn btn-default btn-sm width-50 pull-xs-left" id="back-btn" (click)="onToBack()">\r\n    <i class="fa fa-angle-left fa-lg"></i>\r\n  </a>\r\n</div>\r\n<section class="widget widget-email">\r\n  <header>\r\n    <h4>{{mail.subject}}</h4>\r\n    <div class="widget-controls">\r\n      <a href="#"><i class="fa fa-print"></i></a>\r\n    </div>\r\n  </header>\r\n  <div class="widget-body">\r\n    <div id="email-view" class="email-view">\r\n      <div class="email-details clearfix">\r\n        <div class="email-details-content">\r\n          <span class="thumb thumb-sm pull-xs-left">\r\n            <img class="img-circle" src="http://seeklogo.com/images/M/mail-envelope-symbol-logo-4AB011B4E0-seeklogo.com.gif" alt="Philip Horbacheuski">\r\n          </span>\r\n          <div class="pull-xs-left">\r\n            <strong>{{mail.sender}}</strong>\r\n            <span *ngIf="mail.senderMail" class="email">&lt;{{mail.senderMail}}&gt;</span>\r\n            <span class="receiver">Para: <span *ngFor="let to of UsersEmail"> {{to.namereceiver}}, </span></span>\r\n          </div>\r\n          <div class="email-actions pull-xs-right">\r\n            <div class="btn-group">\r\n              <button id="email-opened-reply" class="btn btn-sm btn-gray" (click)="goToReply(mail)">\r\n                <i class="fa fa-reply"></i> Responder\r\n              </button>\r\n            </div>\r\n          </div>\r\n          <time class="email-date pull-xs-right">\r\n            {{mail.date}}\r\n          </time>\r\n        </div>\r\n      </div>\r\n      <div class="email-body">\r\n        <div class="email-body" [innerHTML]="mail.message"></div>\r\n      </div>\r\n      <div *ngIf="!mail.message" class="email-body">\r\n        {{mail.subject}}\r\n      </div>\r\n      <!--\r\n      <div class="email-attachments">\r\n        <div class="row">\r\n          <div class="col-sm-6">\r\n            <hr *ngIf="mail.attachments">\r\n            <p  *ngIf="mail.attachments" class="details"><strong>{{mail.attachments.length}} attachments</strong> &nbsp;-&nbsp; <a href="#">Download all attachments</a>\r\n              &nbsp;&nbsp;&nbsp;<a href="#">View all Images</a></p>\r\n            <section *ngFor="let attachment of mail.attachments; let i = index" class="attachment">\r\n              <img class="img-fluid" src="{{attachment}}" alt="">\r\n              <h5 class="title">some-cool-image{{i + 1}}.jpg</h5>\r\n              <p class="details">\r\n                568K  &nbsp;&nbsp;\r\n                <a href="#">View</a> &nbsp;&nbsp;\r\n                <a href="#">Download</a>\r\n              </p>\r\n            </section>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      -->\r\n    </div>\r\n  </div>\r\n</section>\r\n'},1038:function(e,n){e.exports='<div class="clearfix mb-xs">\r\n  <a class="btn btn-secondary btn-sm width-50 pull-xs-left" id="back-btn" (click)="onToBack()">\r\n    <i class="fa fa-angle-left fa-lg"></i>\r\n  </a>\r\n</div>\r\n<section class="widget widget-email">\r\n  <header id="widget-email-header">\r\n    <h4>Redactar <span class="fw-semi-bold">nuevo</span></h4>\r\n  </header>\r\n  <div class="widget-body" id="mailbox-content" (submit)="sendMessage()">\r\n    <div class="compose-view" id="compose-view">\r\n      <form id="email-compose" class="form-email-compose">\r\n        <div class="form-group">\r\n          <select class="form-control js-example-placeholder-multiple" id="to" width="100%" required></select>\r\n        </div>\r\n        <div class="form-group">\r\n          <input type="text" id="input-subject" placeholder="Asunto" [(ngModel)]="subject"  name="subject" class="input-transparent form-control subject" required>\r\n        </div>\r\n        <div class="form-group">\r\n          <textarea rows="10" class="form-control message" id="wysiwyg" placeholder="Mensaje" required>{{ body }}</textarea>\r\n        </div>\r\n        <div class="clearfix">\r\n          <div class="btn-toolbar pull-right">\r\n            <button type="reset" id="compose-discard-button" class="btn btn-gray">Descartar</button>\r\n            <button type="button" id="compose-save-button" class="btn btn-inverse" (click)="saveDraft()">Guardar</button>\r\n            <button type="submit" id="compose-send-button" class="btn btn-primary">Enviar</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</section>\r\n'},1039:function(e,n){e.exports='<div class="clearfix mb-xs">\r\n  <a class="btn btn-secondary btn-sm width-50 pull-left hide" id="back-btn" href="inbox.html">\r\n    <i class="fa fa-angle-left fa-lg"></i>\r\n  </a>\r\n  <!--<div class="pull-xs-right" id="folder-stats">\r\n    <p class="widget-email-count">Mostrando 1 - 10 de 96 mensajes</p>\r\n    <ul class="pagination pagination-sm widget-email-pagination">\r\n      <li class="prev disabled page-item"><a class="page-link" href="#"><i class="fa fa-chevron-left"></i></a></li>\r\n      <li class="active page-item"><a class="page-link" href="#">1</a></li>\r\n      <li class="page-item"><a class="page-link" href="#">2</a></li>\r\n      <li class="next page-item"><a class="page-link" href="#"><i class="fa fa-chevron-right"></i></a></li>\r\n    </ul>\r\n  </div>-->\r\n</div>\r\n<section class="widget widget-email">\r\n  <header id="widget-email-header">\r\n    <div class="row">\r\n      <div class="col-sm-6">\r\n        <div class="btn-group">\r\n          <a class="btn btn-secondary btn-sm dropdown-toggle" href="#" data-toggle="dropdown">\r\n            Seleccionar\r\n            <i class="fa fa-angle-down "></i>\r\n          </a>\r\n          <ul class="dropdown-menu">\r\n            <li><a class="dropdown-item" (click)="toggleAll(true)">Todos</a></li>\r\n            <li><a class="dropdown-item" (click)="toggleAll(false)">Ninguno</a></li>\r\n          </ul>\r\n        </div>\r\n        <div class="btn-group">\r\n          <a class="btn btn-sm btn-secondary dropdown-toggle" href="#" data-toggle="dropdown">\r\n            Acciones\r\n            <i class="fa fa-angle-down "></i>\r\n          </a>\r\n          <ul class="dropdown-menu">\r\n            <li><a class="dropdown-item" (click)="deleteEmails()">Eliminar</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6">\r\n        <input class="form-control form-control-sm width-200 pull-xs-right" id="mailbox-search" [(ngModel)]="searchText" type="text" placeholder="Buscar mensajes">\r\n      </div>\r\n    </div>\r\n  </header>\r\n  <div class="widget-body" id="mailbox-content">\r\n    <table class="table table-striped table-emails table-hover" id="folder-view" >\r\n      <thead>\r\n      <tr>\r\n        <th colspan="3" id="folder-actions">\r\n          <div class="checkbox abc-checkbox">\r\n            <input id="toggle-all" type="checkbox" (click)="selectAll()">\r\n            <label for="toggle-all"></label>\r\n          </div>\r\n        </th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr *ngFor="let mail of mails | FoldersPipe : folderName | SearchPipe : searchText" [ngClass]="{\'unread\': mail.unread}">\r\n        <td>\r\n          <div class="checkbox abc-checkbox">\r\n            <input class="toggle-one" type="checkbox" id="checkbox{{mail.id}}" [checked]="mail.selected"  (click)="selectMail(mail)">\r\n            <label attr.for="checkbox{{mail.id}}"></label>\r\n          </div>\r\n        </td>\r\n        <td class="name hidden-xs-down" (click)="openMail(mail)">{{mail.sender}}</td>\r\n        <td class="subject" (click)="openMail(mail)">{{mail.subject}}</td>\r\n        <td class="date">{{mail.date}}</td>\r\n      </tr>\r\n      <tr *ngIf="(mails).length == 0">\r\n          <td colspan="12">\r\n              Nada aquí todavía\r\n          </td>\r\n      </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</section>\r\n'},721:function(e,n,t){"use strict";var a=t(0),i=t(159),l=t(691),r=function(){function InboxService(e){this.http=e}return InboxService.prototype.getAllMessages=function(){var e=localStorage.getItem("check_point"),n=new i.Headers;return n.append("Content-Type","application/json"),n.append("Access-Control-Allow-Origin","*"),this.http.get(l.server+"/messages/All/"+e,{headers:n}).map(function(e){return e.json()}).map(function(e){return e})},InboxService.prototype.getAllEmails=function(){var e=new i.Headers;return e.append("Content-Type","application/json"),e.append("Access-Control-Allow-Origin","*"),this.http.get(l.server+"/users/getAllEmails",{headers:e}).map(function(e){return e.json()}).map(function(e){return e})},InboxService.prototype.getUsersEmail=function(e){var n=new i.Headers;return n.append("Content-Type","application/json"),n.append("Access-Control-Allow-Origin","*"),this.http.post(l.server+"/messages/getUsersEmail",{id:e},{headers:n}).map(function(e){return e.json()}).map(function(e){return e})},InboxService.prototype.sendMail=function(e){var n=new i.Headers;return n.append("Content-Type","application/json"),n.append("Access-Control-Allow-Origin","*"),this.http.post(l.server+"/messages/",e,{headers:n}).map(function(e){return e.json()}).map(function(e){return e.state})},InboxService.prototype.draftMail=function(e){var n=new i.Headers;return n.append("Content-Type","application/json"),n.append("Access-Control-Allow-Origin","*"),this.http.post(l.server+"/messages/Draft",e,{headers:n}).map(function(e){return e.json()}).map(function(e){return e.state})},InboxService.prototype.deleteMessages=function(e){var n=new i.Headers;return n.append("Content-Type","application/json"),n.append("Access-Control-Allow-Origin","*"),this.http.put(l.server+"/messages/deleteMessages",{id:e},{headers:n}).map(function(e){return e.json()}).map(function(e){return e.state})},InboxService=__decorate([a.Injectable(),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof i.Http&&i.Http)&&e||Object])],InboxService);var e}();n.InboxService=r},978:function(e,n,t){"use strict";(function(e){var a=t(0),i=function(){function Inbox(n){this.mailListShow=!0,this.mailFormShow=!1,this.mailDetailShow=!1,this.currentFolderName="Sent Mail",this.$el=e(n.nativeElement),this.initMailboxAppDemo(this.$el)}return Inbox.prototype.handleComposeBtn=function(e){this.repliedMessage=e||void 0,this.changeEmailComponents("mailForm")},Inbox.prototype.onReplyMail=function(e){this.currentMail=e,this.changeEmailComponents("mailDetail")},Inbox.prototype.changeEmailComponents=function(e){var n={mailList:function(e){e.mailFormShow=e.mailDetailShow=!1,e.mailListShow=!0},mailForm:function(e){e.mailListShow=e.mailDetailShow=!1,e.mailFormShow=!0},mailDetail:function(e){e.mailListShow=e.mailFormShow=!1,e.mailDetailShow=!0}};n[e](this)},Inbox.prototype.setFolderName=function(e){this.currentFolderName=e,this.mailListShow||this.changeEmailComponents("mailList")},Inbox.prototype.initMailboxAppDemo=function(n){var t=function(){n.find("#app-alert").removeClass("hide").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(this).removeClass("animated bounceInLeft")})};setTimeout(function(){return t()},3e3)},Inbox.prototype.changeActiveItem=function(){this.$el.find(".nav a").on("click",function(){e(".nav").find(".active").removeClass("active"),e(this).parent().addClass("active")})},Inbox.prototype.ngOnInit=function(){this.changeActiveItem()},Inbox=__decorate([a.Component({selector:"inbox",template:t(1036),styles:[t(1020)]}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof a.ElementRef&&a.ElementRef)&&n||Object])],Inbox);var n}();n.Inbox=i}).call(n,t(43))},979:function(e,n,t){"use strict";var a=t(0),i=t(74),l=t(157),r=t(107),s=t(978),o=t(982),c=t(981),d=t(980),p=t(984),m=t(983),u=t(721);n.routes=[{path:"",component:s.Inbox,pathMatch:"full"}];var f=function(){function InboxModule(){}return InboxModule.routes=n.routes,InboxModule=__decorate([a.NgModule({imports:[l.FormsModule,i.CommonModule,r.RouterModule.forChild(n.routes)],declarations:[s.Inbox,o.MailList,c.MailForm,d.MailDetail,m.FoldersPipe,p.SearchPipe],providers:[u.InboxService]}),__metadata("design:paramtypes",[])],InboxModule)}();Object.defineProperty(n,"__esModule",{value:!0}),n.default=f},980:function(e,n,t){"use strict";var a=t(0),i=t(721),l=function(){function MailDetail(e){this.inboxService=e,this.backToMailList=new a.EventEmitter,this.replyMessage=new a.EventEmitter,this.math=Math}return MailDetail.prototype.ngOnInit=function(){var e=this;this.inboxService.getUsersEmail(this.mail.emails).subscribe(function(n){e.UsersEmail=n})},MailDetail.prototype.onToBack=function(){this.backToMailList.emit("")},MailDetail.prototype.goToReply=function(e){this.replyMessage.emit(e)},MailDetail.prototype.Math=function(){return Math.random()},__decorate([a.Input(),__metadata("design:type",Object)],MailDetail.prototype,"mail",void 0),__decorate([a.Output(),__metadata("design:type",Object)],MailDetail.prototype,"backToMailList",void 0),__decorate([a.Output(),__metadata("design:type",Object)],MailDetail.prototype,"replyMessage",void 0),MailDetail=__decorate([a.Component({selector:"[mail-detail]",template:t(1037),styles:[t(1021)]}),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof i.InboxService&&i.InboxService)&&e||Object])],MailDetail);var e}();n.MailDetail=l},981:function(e,n,t){"use strict";(function(e){var a=t(0),i=t(0),l=t(0),r=t(721),s=function(){function MailForm(e){this.inboxService=e,this.backToMailList=new l.EventEmitter,this.sender="",this.subject="",this.body=""}return MailForm.prototype.onToBack=function(){console.log("qwerty"),this.backToMailList.emit("")},MailForm.prototype.ngOnInit=function(){var n=this;if(this.message){this.sender=this.message.sender,this.subject="Re: "+this.message.subject;var t=document.createElement("span");t.innerHTML=this.message.message,this.body=t.innerText}this.inboxService.getAllEmails().subscribe(function(t){n.allEmails=t,e(".js-example-placeholder-multiple").select2({data:n.allEmails,placeholder:"Seleccione un correo",multiple:!0})})},MailForm.prototype.sendMessage=function(){var n=this,t=localStorage.getItem("check_point"),a=e("#to").val(),i=e("#input-subject").val(),l=e("#wysiwyg").val(),r={idsender:t,emails:a,subject:i,message:l};this.inboxService.sendMail(r).subscribe(function(e){1==e&&n.onToBack()})},MailForm.prototype.saveDraft=function(){var n=this,t=localStorage.getItem("check_point"),a=e("#to").val(),i=e("#input-subject").val(),l=e("#wysiwyg").val(),r={idsender:t,emails:a,subject:i,message:l};this.inboxService.draftMail(r).subscribe(function(e){1==e&&n.onToBack()})},__decorate([i.Output(),__metadata("design:type",Object)],MailForm.prototype,"backToMailList",void 0),__decorate([i.Input(),__metadata("design:type",Object)],MailForm.prototype,"message",void 0),MailForm=__decorate([a.Component({selector:"[mail-form]",template:t(1038)}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof r.InboxService&&r.InboxService)&&n||Object])],MailForm);var n}();n.MailForm=s}).call(n,t(43))},982:function(e,n,t){"use strict";(function(e){var a=t(0),i=t(0),l=t(0),r=t(721),s=function(){function MailList(n,t){this.inboxService=t,this.replyMail=new l.EventEmitter,this.mails=[],this.$el=e(n.nativeElement)}return MailList.prototype.openMail=function(e){this.replyMail.emit(e)},MailList.prototype.selectMail=function(e){e.selected=!e.selected,this.checkToggleAll()},MailList.prototype.selectAll=function(){var e=this.$toggleAll.prop("checked");this.toggleAll(e)},MailList.prototype.checkToggleAll=function(){var n=!0;this.$el.find(".toggle-one").each(function(t,a){!e(a).prop("checked")&&n&&(n=!1)}),this.$toggleAll.prop("checked",n)},MailList.prototype.toggleAll=function(e){for(var n=0,t=this.mails;n<t.length;n++){var a=t[n];a.selected=e}this.$toggleAll.prop("checked",e)},MailList.prototype.deleteEmails=function(){var e=this,n=[],t=[];this.mails.forEach(function(e){e.selected?t.push(e.id):n.push(e)}),this.mails=n,t.length>0&&this.inboxService.deleteMessages(t).subscribe(function(n){1==n&&e.inboxService.getAllMessages().subscribe(function(n){e.mails=n})})},MailList.prototype.ngOnInit=function(){var e=this;this.$toggleAll=this.$el.find("#toggle-all"),this.inboxService.getAllMessages().subscribe(function(n){e.mails=n})},MailList.prototype.ngOnChanges=function(e){"folderName"in e&&(e.folderName.previousValue instanceof Object||this.toggleAll(!1))},MailList.prototype.changeStarStatus=function(e){e.starred=!e.starred},__decorate([i.Output(),__metadata("design:type",Object)],MailList.prototype,"replyMail",void 0),__decorate([i.Input(),__metadata("design:type",Object)],MailList.prototype,"folderName",void 0),MailList=__decorate([a.Component({selector:"[mail-list]",template:t(1039),styles:[t(1022)]}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof l.ElementRef&&l.ElementRef)&&n||Object,"function"==typeof(s="undefined"!=typeof r.InboxService&&r.InboxService)&&s||Object])],MailList);var n,s}();n.MailList=s}).call(n,t(43))},983:function(e,n,t){"use strict";var a=t(0),i=[{name:"Sent Mail",order:1,id:2,unread:0},{name:"Draft",order:2,id:1,unread:3},{name:"Trash",order:1,id:0,unread:0}],l=function(){function FoldersPipe(){this.folders=i}return FoldersPipe.prototype.transform=function(e,n){var t=this,a=n;if(e)return e.filter(function(e){if("Starred"==a)return e.starred;var n=t.folders.filter(function(e){return e.name==a});return n[0].id==e.folderId})},FoldersPipe=__decorate([a.Pipe({name:"FoldersPipe"}),__metadata("design:paramtypes",[])],FoldersPipe)}();n.FoldersPipe=l},984:function(e,n,t){"use strict";var a=t(0),i=function(){function SearchPipe(){}return SearchPipe.prototype.transform=function(e,n){var t=new RegExp(n,"ig");if(e)return e.filter(function(e){return e.sender.search(t)!==-1?e.sender.search(t)!==-1:e.subject.search(t)!==-1?e.subject.search(t)!==-1:void 0})},SearchPipe=__decorate([a.Pipe({name:"SearchPipe"}),__metadata("design:paramtypes",[])],SearchPipe)}();n.SearchPipe=i}});