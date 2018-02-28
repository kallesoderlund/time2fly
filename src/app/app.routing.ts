import { Routes, RouterModule} from '@angular/router';
import { NgModule} from '@angular/core';
import { MainPageComponent } from './mainPage/mainPage.component';
import { ResultPageComponent } from './resultPage/resultPage.component';

const appRoutes: Routes = [
    {
        path : '',
        pathMatch: 'full',
        redirectTo: '/main',
    }, {
    path : 'main',
    component: MainPageComponent,

}, {
    path: 'result',
    component: ResultPageComponent
}, {
    path : '**',
    redirectTo: '/main',
}, ];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes
      )
    ],
    exports: [
      RouterModule
    ],
    providers: [ ]
   })
   export class AppRoutingModule { }
