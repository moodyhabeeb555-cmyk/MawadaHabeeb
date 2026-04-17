import { register } from 'swiper/element/bundle';
import { formatCurrency } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css',
})
export class ForgetpassComponent {

  private readonly authService = inject (AuthService);
    private readonly router = inject (Router);
  step = signal<number>(1);

  email: FormControl = new FormControl('', [Validators.required]);

  code: FormControl = new FormControl('', [Validators.required]);

  password: FormControl = new FormControl('', [Validators.required]);

  submitEmail(e: Event): void {
    e.preventDefault();

    if (this.email.valid) {
      //generate object to BE

      const data = {
        email: this.email.value,
      };

      //send data to API

      this.authService.forgetPassword(data).subscribe({
        next: (res)=>{
          console.log(res);
          this.step.set(2);
        },
      })
    }
  }

  submitCode(e: Event): void {
    e.preventDefault();

    if (this.code.valid) {
      const data = {
        resetCode: this.code.value,
      };

      this.authService.verifyCode(data).subscribe({
        next:(res)=>{
          console.log(res);
          this.step.set(3);
        }
      })
    }
  }

  submitPassword(e: Event): void {
    e.preventDefault();

    if (this.password.valid) {
      const data = {
        email: this.email.value,
        newPassword: this.password.value,
      };

      this.authService.restPassword(data).subscribe({
next:(res)=> {
  console.log(res);

  //save token   home  or login
this.router.navigate(['/login']);
}
      })
      }
    }
  }

