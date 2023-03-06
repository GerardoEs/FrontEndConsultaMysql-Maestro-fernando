import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

miFormulario:FormGroup = this.fb.group({
  name:['',[Validators.required]],
  email:['',[Validators.required, Validators.email]],
  paswoord:['',[Validators.required,Validators.minLength(6)]]
})


  constructor(private fb:FormBuilder,
              private router:Router,
              private authservice:AuthService){

  }

  registro(){
  //  console.log("Muestra",this.miFormulario.value);
  //  console.log("Valido",this.miFormulario.valid);
   const {name,email,paswoord} = this.miFormulario.value; 
    console.log("entro a registro");
    this.authservice.registro(name,email,paswoord)
    .subscribe((resp)=>{
      //console.log("respuesta",resp)
      console.log("Valorr->",resp)
      if(resp===true){
        
        this.router.navigateByUrl('/dashboard');
     }else{
          //mostrar mensaje de error de la clase de mensajess sweetalert2
          Swal.fire('Error', resp, "error")
          
      }
    })
    
  }
}
