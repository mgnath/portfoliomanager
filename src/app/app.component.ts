import { Component } from '@angular/core';
import { AuthService } from "app/core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthService ],
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
