import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Categories } from '../../models/categories';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  id: number = 0;
  category : Categories | null = null;

  constructor(private readonly activatedroute : ActivatedRoute,
              private readonly taskService : TaskService
  ){
   this.category = this.taskService.getCategoryById(this.id);
    console.log(this.taskService.getCategoryById(2));
  }
  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((params) => {
      this.id = Number(params['categoryId']);
      this.getCategory(this.id);
    });

  }

  public getCategory(id :number) : void {
    this.category = this.taskService.getCategoryById(id);
    console.log(this.id, this.category);
  }
}
