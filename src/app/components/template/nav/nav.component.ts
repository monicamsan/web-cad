import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAdmin : boolean = false;
  constructor(private authService: AuthService,
               private router: Router) { }

ngOnInit(): void {
  this.authService.isAdmin$.subscribe(isAdmin => {
  this.isAdmin = isAdmin;
 });
}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
