import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from 'express';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink,RouterModule,FooterComponent,NavbarComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
