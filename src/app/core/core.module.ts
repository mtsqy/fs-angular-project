import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services';
import { httpInterceptProviders } from 'src/app/core/interceptors';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { AuthEffects } from 'src/app/store/effects/auth.effects';
import { reducer } from 'reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, {}),
    // EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [AuthenticationService, httpInterceptProviders]
})
export class CoreModule { }
