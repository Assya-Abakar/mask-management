import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListCategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-management';
}
