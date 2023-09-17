import Button from './button.js'; // Importar el módulo de botones
import Calendar from './calendar.js'; // Importar el módulo de calendario
import Task from './task.js'

document.addEventListener('DOMContentLoaded', () => {
  const calendarBody = document.getElementById('calendar-body');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const currentButton = document.getElementById('current-button');
  const monthDisplay = document.getElementById('month-display');

  // Inicializar el objeto sharedState con currentYear y currentMonth
  const sharedState = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
  };

  const initialTasks = [];

  // Crear instancias de Calendar y Button pasando el objeto sharedState
  const tasks = new Task(initialTasks);
  const calendar = new Calendar(calendarBody, monthDisplay, tasks, sharedState);
  const buttons = new Button(prevButton, nextButton, currentButton, calendar, sharedState);


  calendar.init();
});
