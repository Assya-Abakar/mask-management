import { Categories , Task} from './../../models/categories';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatCardModule, MatCheckboxModule,MatButtonModule, MatInputModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent implements OnInit {

fb : FormBuilder = new FormBuilder();
categories : Categories[]= [];
categoryForm = this.fb.group({
  categoryName : ['', Validators.required],
})
taskForm = this.fb.group({
  name : ['', Validators.required],
  completed : [false],
})

activeCategoryId : number = 0;

constructor( private readonly taskService: TaskService, 
              private readonly router : Router
) { }

ngOnInit(): void {
  this.categories = this.taskService.getSavedCategories()
}

public onSubmit() : void {
if(this.categoryForm.valid && this.categoryForm.value.categoryName != undefined){
  this.taskService.addCategory(this.categories, this.categoryForm);
}
else {
  alert('Please fill in all the fields');
}
this.categoryForm.reset();
}

public categoryDetails(arg: number) : void {
  this.router.navigate(['/category'],
  { queryParams: { categoryId : arg } }
  );
}

public addTask(arg: number) {

  this.activeCategoryId = 0;
if(this.taskForm.valid && this.taskForm.value.name != undefined && this.taskForm.value.completed != undefined){
  this.taskService.addTask(arg, this.categories, this.taskForm);
  console.log(this.categories, arg, this.taskForm.value);
}
else {
  alert('Please fill in all the fields');
}
this.taskForm.reset();
}

public addNewTask(id : number) : void {
  console.log(this.categories, id);
  this.activeCategoryId = this.activeCategoryId === id ? 0 : id;
if(this.categories[id].id === id){
this.taskService.addTask(id, this.categories, this.taskForm);
}
}

public deleteTask(arg0: number, arg1: number) {
  this.taskService.deleteTask(arg0, arg1, this.categories);
  console.log(this.categories, arg0, arg1);
}
public trackById(arg:number, item: Categories): number {
  return item.id;
}
public trackTaskId(arg0: number, item: Task): number {
  return item.id;
}
}
