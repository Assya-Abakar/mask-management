import { Injectable } from '@angular/core';
import { Categories, Task } from '../models/categories';
import { Form, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _categories : BehaviorSubject<Categories[]> = new BehaviorSubject<Categories[]>([]);
  public categories$ = this._categories.asObservable();
  
  categories : Categories [] = [];
  CATEGORY_STORAGE_KEY = 'categories';
  TASK_STORAGE_KEY = 'task';

  constructor() { }

  public getSavedCategories() : Categories[] {
    const savedCategories = localStorage.getItem(this.CATEGORY_STORAGE_KEY);
    if(savedCategories){
      this.categories = JSON.parse(savedCategories);
    }
    return this.categories;
  }
  public getCategorieTask(): Task[] {
    const savedTasks = localStorage.getItem(this.TASK_STORAGE_KEY);
    if(savedTasks){
      return JSON.parse(savedTasks);
    }
    return [];
  }

  public setCategories(categories : Categories[]) : void {
    this.categories = categories;
    localStorage.setItem(this.CATEGORY_STORAGE_KEY, JSON.stringify(categories));
  } 

  public addCategory(categories : Categories[], categoryForm : FormGroup) : void {
    const category : Categories =
    { id :Date.now(),
    name : categoryForm.value.categoryName,
    task :[],
  }
  categories.push(category);
  this.setCategories(categories);
  }

public addTask(arg: number, categories : Categories[], taskForm : FormGroup) : void {
const task  : Task = {
id : Date.now(),
name : taskForm.value.name,
completed : taskForm.value.completed,
}
const category = categories.find(c => c.id === arg);
category?.task.push(task);
localStorage.setItem(this.TASK_STORAGE_KEY, JSON.stringify(category?.task));
this.setCategories(categories);
}

public deleteTask(arg0: number, arg1: number, categories : Categories[]) {
  const category = categories.find(c => c.id === arg0);
  const task = category?.task.find(t => t.id === arg1);
  category?.task.splice(category.task.indexOf(task!), 1);
  this.setCategories(categories);
}

public getCategoryById(id : number) : Categories | null {
  const categories = this.getSavedCategories();
  if(categories){
    const categoriesArray : Categories[] = Array.isArray(categories) ? categories : [];
    const category = categoriesArray.find(c => c.id === id);
    return category ?? null;
  }
  return null;
}
}
