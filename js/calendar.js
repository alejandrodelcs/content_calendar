class Calendar {
  constructor(calendarBody, monthDisplay, task, sharedState) {
    this.calendarBody = calendarBody;
    this.monthDisplay = monthDisplay;
    this.sharedState = sharedState;
    this.task = task;
    this.selectedDate = null; // Para almacenar la fecha seleccionada por el usuario
  }

  updateCalendar() {
    const firstDay = new Date(
      this.sharedState.currentYear,
      this.sharedState.currentMonth,
      1
    );
    const lastDay = new Date(
      this.sharedState.currentYear,
      this.sharedState.currentMonth + 1,
      0
    );

    // Limpiar el contenido actual del calendario
    this.calendarBody.innerHTML = "";

    let currentDate = new Date(
      this.sharedState.currentYear,
      this.sharedState.currentMonth,
      1
    );
    while (currentDate <= lastDay) {
      const row = document.createElement("tr");
      for (let i = 0; i < 7; i++) {
        const cell = document.createElement("td");
        //const cellDate = new Date(currentDate); // Crear una copia de la fecha actual
        cell.innerText = currentDate.getDate();

        // Obtener eventos para esta fecha
        const events = this.task.getTasksForDate(
          currentDate
        );

        // Si hay eventos, agregarlos como elementos en la celda
        if (events.length > 0) {
          const eventList = document.createElement("ul");
          events.forEach((event) => {
            const eventItem = document.createElement("li");
            eventItem.innerText = event.title;
            eventList.appendChild(eventItem);
          });
          cell.appendChild(eventList);
        }

        // Agregar evento de clic a la celda
        cell.addEventListener(
          "click",
          this.handleCellClick.bind(this, currentDate)
        );
        row.appendChild(cell);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.calendarBody.appendChild(row);
    }

    // Actualizar el mes mostrado en la pantalla
    const monthOptions = { year: "numeric", month: "long" };
    this.monthDisplay.textContent = new Date(
      this.sharedState.currentYear,
      this.sharedState.currentMonth
    ).toLocaleDateString("es-ES", monthOptions);
  }

  // Controlador de eventos de clic en una celda
  handleCellClick(date) {
    // Almacenar la fecha seleccionada en this.selectedDate
    this.selectedDate = date;

    // Muestra el formulario de evento
    this.showEventForm();
  }

  // Obtener la celda del calendario correspondiente a una fecha dada
  getCellByDate(date) {
    const day = date.toISOString().split("T")[0];
    const cells = this.calendarBody.querySelectorAll("td");
    for (const cell of cells) {
      if (cell.innerText == day.split("-")[2]) {
        return cell;
      }
    }
    return null;
  }

  showEventForm() {
    const eventForm = document.createElement("div");
    eventForm.classList.add("event-form");

    const closeButton = document.createElement("button");
    closeButton.innerText = "Cerrar";
    closeButton.addEventListener("click", () => {
      // Cierra el formulario emergente
      document.body.removeChild(eventForm);
    });

    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Título del evento:";
    const titleInput = document.createElement("input");
    titleInput.type = "text";

    const saveButton = document.createElement("button");
    saveButton.innerText = "Guardar evento";
    saveButton.addEventListener("click", () => {
      const eventTitle = titleInput.value;
      if (eventTitle.trim() !== "") {
        // Agrega el evento al calendario
        //const task = new Task(this.task.getAllEvents() );
        this.task.addTask(eventTitle, this.selectedDate);
        //this.addEvent(eventTitle, this.selectedDate);
        // Cierra el formulario emergente
        document.body.removeChild(eventForm);
        this.updateCalendar();
      } else {
        // Muestra un mensaje de error si el título está en blanco
        alert("El título del evento no puede estar en blanco");
      }
    });

    eventForm.appendChild(closeButton);
    eventForm.appendChild(titleLabel);
    eventForm.appendChild(titleInput);
    eventForm.appendChild(saveButton);

    document.body.appendChild(eventForm);
  }

  decrementMonth() {
    this.sharedState.currentMonth--;
    if (this.sharedState.currentMonth < 0) {
      this.sharedState.currentYear--;
      this.sharedState.currentMonth = 11;
    }
    this.updateCalendar();
  }

  incrementMonth() {
    this.sharedState.currentMonth++;
    if (this.sharedState.currentMonth > 11) {
      this.sharedState.currentYear++;
      this.sharedState.currentMonth = 0;
    }
    this.updateCalendar();
  }

  init() {
    const today = new Date();
    this.sharedState.currentYear = today.getFullYear();
    this.sharedState.currentMonth = today.getMonth();
    this.updateCalendar();
  }
}
export default Calendar;
