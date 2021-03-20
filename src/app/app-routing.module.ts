import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "employee",
    loadChildren: () => import('./pages/employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: "signup",
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
