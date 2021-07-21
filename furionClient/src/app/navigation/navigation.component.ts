import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public showLogoutButton: boolean = false;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = this.authService.isAuthenticated ();
      }
    })
  }

  navigateToLogin () {
    this.router.navigateByUrl('/login');
  }

  logout () {
    this.authService.logout ();
    this.navigateToLogin ();
  }
}
