import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap'; 
import { MomentModule } from 'angular2-moment'; 

import { ROUTES }       from './layout.routes';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';
import { ChatSidebar } from './chat-sidebar/chat-sidebar.component';
import { ChatMessage } from './chat-sidebar/chat-message/chat-message.component';
import { SearchPipe } from './pipes/search.pipe';
import { NotificationLoad } from './notifications/notifications-load.directive';
import { Notifications } from './notifications/notifications.component';
import { LoginService } from '../login/login.service';
import { LoggedInGuard } from '../login/logged-in.guard';
import { LayoutService } from './layout.service';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    ROUTES,
    FormsModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  declarations: [
    Layout,
    Sidebar,
    Navbar,
    ChatSidebar,
    SearchPipe,
    Notifications,
    NotificationLoad,
    ChatMessage
  ],
  providers: [
    LoginService,
    LoggedInGuard,
    LayoutService
  ]
})
export default class LayoutModule {
}
