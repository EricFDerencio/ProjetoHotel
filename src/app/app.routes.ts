import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GuestsComponent } from './pages/guests/guests.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "",
                component: HomeComponent
            },
            {
                path:"guests",
                component: GuestsComponent
            },
            {
                path: "reservations",
                component: ReservationsComponent
            }
        ]
    }
];
