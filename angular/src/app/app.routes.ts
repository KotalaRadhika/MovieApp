import { Routes } from '@angular/router';
import {LoginComponent} from './page-components/login/login.component';
import { RegisterComponent } from './page-components/register/register.component';
import { HomeComponent } from './page-components/home/home.component';
import { WishlistComponent } from './page-components/wishlist/wishlist.component';
import { MovieListComponent } from './page-components/movie-list/movie-list.component';
import { DashboardComponent } from './page-components/dashboard/dashboard.component';
import { TopmoviesComponent } from './page-components/topmovies/topmovies.component';
import { authGuard } from './auth.guard';
import { AboutUsComponent } from './page-components/about-us/about-us.component';

export const routes: Routes = [    
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component : HomeComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'movies',
        component:MovieListComponent,
        // canActivate:[authGuard]
    },
    {
        path:'topmovies',
        component:TopmoviesComponent,
        // canActivate:[authGuard]
    },
    {
        path:'wishlist',
        component:WishlistComponent,
        canActivate:[authGuard]
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'about',
        component:AboutUsComponent
    }
];
