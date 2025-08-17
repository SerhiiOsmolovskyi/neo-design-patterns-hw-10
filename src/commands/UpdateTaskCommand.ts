import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

export class UpdateTaskCommand extends AbstractCommand {
  private oldTask?: Task;
  private newTask?: Task;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    const current = this.taskList.getAllTasks().find(t => t.id === this.taskId);
    if (current) {
      this.oldTask = { ...current };
      this.newTask = this.taskList.updateTask(this.taskId, this.updates);
    }
  }

  undo(): void {
    if (this.oldTask) {
      this.taskList.updateTask(this.taskId, this.oldTask);
    }
  }
}
