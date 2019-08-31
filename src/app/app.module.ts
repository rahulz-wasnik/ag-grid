import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { FormState } from './store/order-form.state';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ 
      disabled: environment.production 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
