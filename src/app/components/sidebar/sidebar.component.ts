import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../shared/services/token-storage.service";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/cinema', title: 'Cinema Management',  icon:'content_paste', class: ''},
    { path: '/room', title: 'Room Management',  icon:'content_paste', class: ''},
    { path: '/seat', title: 'Seat Management',  icon:'content_paste', class: ''},
    { path: '/movie', title: 'Movie Management',  icon:'content_paste', class: ''},
    { path: '/schedule', title: 'Schedule Management',  icon:'content_paste', class: ''},
    { path: '/ticket', title: 'Customer Management',  icon: 'content_paste', class: '' },
    { path: '/buyticket', title: 'Buy Ticket',  icon: 'content_paste', class: '' },
    { path: '/revenue', title: 'Revenue',  icon: 'dashboard', class: '' },
    { path: '/cancelticket', title: 'Cancel Ticket',  icon: 'dashboard', class: '' },
    { path: '/register', title: 'Create Account',  icon: 'dashboard', class: '' },

];

export const STAFFROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/ticket', title: 'Customer Management',  icon: 'content_paste', class: '' },
    { path: '/buyticket', title: 'Buy Ticket',  icon: 'content_paste', class: '' },
    { path: '/revenue', title: 'Revenue',  icon: 'dashboard', class: '' },
    { path: '/cancelticket', title: 'Cancel Ticket',  icon: 'dashboard', class: '' },
]

export const ANONYMOUSROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
]


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
      let role = this.token.getRole();
      if(role == "MANAGER"){
          this.menuItems = ROUTES.filter( menuItem => menuItem);
      } else if(role == "STAFF"){
          this.menuItems = STAFFROUTES.filter( menuItem => menuItem);
      } else this.menuItems = ANONYMOUSROUTES.filter( menuItem => menuItem);

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
