import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminlvlComponent } from './adminlvl.component';
import { AdminlvlService } from './adminlvl.service';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdminlvlComponent,
    data: {
      title: 'Adminlvl'
    }
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ AdminlvlComponent ],

  providers: [ AdminlvlService ]

})
export class AdminlvlModule { }
