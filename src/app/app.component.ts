import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private loggingService: LoggingService) {

  }

  ngOnInit(): void {
      this.authService.autoLogin();
      this.loggingService.printLog('Hello from AppComponent   ngOnInit');
  }
}
