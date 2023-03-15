import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../SessionService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private sessionService: SessionService, private router: Router) {}

  logout() {
    this.sessionService.clear();
    this.router.navigate(['']);
  }
}
