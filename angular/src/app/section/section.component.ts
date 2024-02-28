import { Component } from '@angular/core';
import { FooterComponent } from '../page-components/footer/footer.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

}
