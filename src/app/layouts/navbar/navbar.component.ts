import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './../../core/auth/services/auth.service';
import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject (AuthService);

  private readonly pLATFORM_ID = inject (PLATFORM_ID);

  private readonly cartService = inject (CartService);

  logged = computed(()=> this.authService.isLogged());


  count = computed(()=> this.cartService.cartCount());

   constructor(private FlowbiteService: FlowbiteService) {}

  ngOnInit(): void {

   if(isPlatformBrowser(this.pLATFORM_ID)){
        this.getCartCount();
     if(localStorage.getItem('freshToken')){
      this.authService.isLogged.set(true);
    }
   }
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite ();
    });
  }

  logOut():void{
    this.authService.signOut();
  }

  getCartCount():void {
    this.cartService.getLoggedUserCard().subscribe({
      next:(res)=> {
        this.cartService.cartCount.set(res.numOfCartItems);
      }
    })
  }
}
