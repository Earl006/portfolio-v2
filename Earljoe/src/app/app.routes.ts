import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero/hero.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: HeroComponent}
];
