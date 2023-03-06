import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  get usuario(){
    return this.servicio.usuario;
  }
  constructor(private router:Router,
              private servicio:AuthService){}

  logout(){
    this.router.navigateByUrl('/auth/login');
    this.servicio.logout();

  }
}
