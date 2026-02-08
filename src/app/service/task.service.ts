import { Injectable } from '@angular/core';
import { Categories, Task } from '../models/categories';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  categories : Categories [] = [];

  constructor() { }

  public addCategory(categories : Categories[], categoryForm : FormGroup) : void {
    const category : Categories =
  { id :categories.length + 1,
    name : categoryForm.value.categoryName,
    task :[],
  }
  categories.push(category);
  localStorage.setItem('categories', JSON.stringify(categories));
  }

public addTask(arg: number, categories : Categories[], taskForm : FormGroup) : void {
const task  : Task = {
id : categories[arg-1].task.length + 1,
name : taskForm.value.name,
completed : taskForm.value.completed,
}
categories[arg-1].task.push(task);
localStorage.setItem('task', JSON.stringify(categories[arg-1].task));
localStorage.setItem('categories', JSON.stringify(categories));
}

public deleteTask(arg0: number, arg1: number, categories : Categories[]) {
  categories[arg0-1].task.splice(arg1-1, 1);
  localStorage.setItem('categories', JSON.stringify(categories)); 
}

public getCategoryById(id : number) : Categories | null {
  const categories = localStorage.getItem('categories')
  if(categories){
    const categoriesArray : Categories[] = JSON.parse(categories);
    const category = categoriesArray.find(c => c.id === id);
    return category ?? null;
  }
  return null;
}
}
