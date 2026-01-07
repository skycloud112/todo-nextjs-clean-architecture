export class Todo {
  constructor(
    public readonly id: string,
    public title: string,
    public completed: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
