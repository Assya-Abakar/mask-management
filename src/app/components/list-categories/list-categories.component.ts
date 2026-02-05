import { Categories , Task} from './../../models/categories';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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
isAddTask : boolean = false;

ngOnInit(): void {
  const savedCategories = localStorage.getItem('categories');
  if(savedCategories){
    this.categories = JSON.parse(savedCategories);
  }
  console.log(this.categories);
  localStorage.setItem('task', JSON.stringify(this.categories));
}

public onSubmit() : void {
if(this.categoryForm.valid && this.categoryForm.value.categoryName != undefined){
  const category : Categories =
  { id :this.categories.length + 1,
    name : this.categoryForm.value.categoryName,
    task :[],
  }
  this.categories.push(category);
}
localStorage.setItem('categories', JSON.stringify(this.categories));
this.categoryForm.reset();
}

public addTask(arg: number) {
  console.log(localStorage.getItem('task'), this.taskForm.value.completed);
  if(this.taskForm.valid && this.taskForm.value.name != undefined && this.taskForm.value.completed != undefined){
const task  : Task = {
id : this.categories[arg-1].task.length + 1,
name : this.taskForm.value.name,
completed : this.taskForm.value.completed,
}
this.categories[arg-1].task.push(task);
localStorage.setItem('task', JSON.stringify(this.categories[arg-1].task));
localStorage.setItem('categories', JSON.stringify(this.categories));
console.log(this.categories[arg-1]);
}
else return;
}

public addNewTask(id : number) : void {
  console.log(this.categories[id].id, id);
  if(this.categories[id-1].id === id){
this.isAddTask = true;
}
}

deleteTask(arg0: number, arg1: number) {
  this.categories[arg0-1].task.splice(arg1-1, 1);
  localStorage.setItem('categories', JSON.stringify(this.categories));
}

}
