import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public showLogoutButton: boolean = false;

  constructor(private router: Router,
    private userService: UserAuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = this.userService.isAuthenticated ();
      }
    })
  }

  navigateToLogin () {
    this.router.navigateByUrl('/login');
  }

  logout () {
    this.userService.logout ();
    this.navigateToLogin ();
  }
}
