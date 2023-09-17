class Task
 {
  constructor(tasks) {
    this.tasks = tasks || [];
  }

  addTask(title, date) {
    const event = {
      date: date.toISOString().split('T')[0],
      title: title,
    };
    this.tasks.push(event);
  }

  getTasksForDate(date) {
    return this.tasks.filter((event) => event.date === date.toISOString().split('T')[0]);
  }

  getAllEvents() {
    return this.tasks;
  }

  // Puedes agregar métodos adicionales para actualizar y eliminar eventos si es necesario.
}

export default Task;
