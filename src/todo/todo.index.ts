import * as Vue from "vue";
import Component from "vue-class-component";

class Task {
    constructor(public taskName: string, public selected: boolean) {
    }
}

// The @Component decorator indicates the class is a Vue component
@Component({
    // All component options are allowed in here
    template: `
<div>
  <section class="panel">
    <input type="checkbox" v-model="areAllSelected">
    <input type="text" autofocus class="text-input" placeholder="Input your task" v-model="newTask.taskName" v-on:keyup.enter="addTask">
    <button v-on:click="clearTasks">Clear tasks</button>
  </section>

  <ul class="list">
    <li v-for="(task, index) in tasks" v-bind:class="{ done: task.selected }">
      <label>
        <input type="checkbox" v-model="task.selected"> {{ task.taskName }}
      </label>
      <button class="delete" v-on:click="removeTask(index)">delete</button>
    </li>
  </ul>

  <pre>{{ $data }}</pre>

</div>
`
})
export default class Todo extends Vue {
    tasks: Task[] = [];
    newTask: Task = new Task('', false);

    get areAllSelected(): boolean {
        return this.tasks.length > 0 && this.tasks.every(task => task.selected)
    }

    set areAllSelected(selected: boolean) {
        for (let task of this.tasks) {
            task.selected = selected
        }
    }

    addTask() {
        if (!this.newTask.taskName) {
            return;
        }
        this.tasks.push(this.newTask);
        this.newTask = new Task('', false)
    }

    removeTask(taskIndex: number) {
        if (taskIndex >= this.tasks.length) {
            return;
        }

        this.tasks.splice(taskIndex, 1)
    }

    clearTasks() {
        this.tasks = [];
        this.newTask = new Task('', false)
    }

    selectAll() {
        for (let task of this.tasks) {
            task.selected = true
        }
    }

}