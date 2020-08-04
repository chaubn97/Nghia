import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {CinemaModule} from "../../manager/cinema/cinema.module";
import {ManagerGuardService} from "../../shared/services/manager-guard.service";
import {StaffGuardService} from "../../shared/services/staff-guard.service";
import {RegisterComponent} from "../../manager/register/register.component";

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {
        path: 'cinema',
        loadChildren: () => import('../../manager/cinema/cinema.module').then(m => m.CinemaModule),
        canActivate: [ManagerGuardService]
    },
    {
        path: 'room',
        loadChildren: () => import('../../manager/room/room.module').then(m => m.RoomModule),
        canActivate: [ManagerGuardService]
    },
    {
        path: 'movie',
        loadChildren: () => import('../../manager/movie/movie.module').then(m => m.MovieModule),
        canActivate: [ManagerGuardService]
    },
    {
        path: 'seat',
        loadChildren: () => import('../../manager/seat/seat.module').then(m => m.SeatModule),
        canActivate: [ManagerGuardService]
    },
    {
        path: 'schedule',
        loadChildren: () => import('../../manager/schedule/schedule.module').then(m => m.ScheduleModule),
        canActivate: [ManagerGuardService]
    },
    {
        path: 'revenue',
        loadChildren: () => import('../../staff/revenue/revenue.module').then(m => m.RevenueModule),
        canActivate: [StaffGuardService]
    },
    {
        path: 'ticket',
        loadChildren: () => import('../../staff/ticket/ticket.module').then(m => m.TicketModule),
        canActivate: [StaffGuardService]
    },
    {
        path: 'buyticket',
        loadChildren: () => import('../../staff/buy-ticket/buy-ticket.module').then(m => m.BuyTicketModule),
        canActivate: [StaffGuardService]
    },
    {
        path: 'cancelticket',
        loadChildren: () => import('../../staff/cancel-ticket/cancel-ticket.module').then(m => m.CancelTicketModule),
        canActivate: [StaffGuardService]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [ManagerGuardService]
    },
    // { path: 'cinema',      component: TicketModule },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
