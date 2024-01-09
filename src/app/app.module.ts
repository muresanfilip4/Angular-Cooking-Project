import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule, 
    CoreModule,
  ],
  
  // providers: [LoggingService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
