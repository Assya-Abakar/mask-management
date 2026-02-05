export interface Categories {
    id : number,
    name : string,
    task : Task[]
}

export interface Task {
  id : number,
  name : string,
  completed : boolean,
}
