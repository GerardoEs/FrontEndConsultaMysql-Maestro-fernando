import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
miFormulario: FormGroup =this.fb.group({
  email:['hola@hotmail.com',[Validators.required, Validators.email]],
  paswoord:['87654333',[Validators.required, Validators.minLength(6)]],
})

constructor(private fb:FormBuilder,
            private router:Router,
            private authservice:AuthService){

}


login(){
 
  //console.log("Valores del Formulario->",this.miFormulario.value);
  //console.log("Todos Valores del Formulario->",this.miFormulario);
 //console.log("Solo el email del Formulario->",this.miFormulario.controls);
  
  //console.log("Valores del Formulario->",this.miFormulario.valid);
  const {email,paswoord} = this.miFormulario.value;
  this.authservice.login(email,paswoord)
  .subscribe(resp=>{
    //console.log("respuesta",resp)
    if(resp===true){
  
      this.router.navigateByUrl('/dashboard');
   }else{
        //mostrar mensaje de error de la clase de mensajess sweetalert2
        Swal.fire('Error', resp, "error")
        
    }
  })
  
}


}
