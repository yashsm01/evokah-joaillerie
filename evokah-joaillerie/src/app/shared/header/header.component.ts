import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  cart = inject(CartService);
  searchOpen = false;
  scrolled = false;

  toggleSearch() { this.searchOpen = !this.searchOpen; }
  closeSearch()  { this.searchOpen = false; }
}
