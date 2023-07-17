import { Component} from '@angular/core';
import { AuthService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  isAdmin: boolean = false;
  constructor(private authService : AuthService) {}


  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }
  

}
