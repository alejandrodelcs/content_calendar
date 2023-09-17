// button.js
class Button {
  constructor(prevButton, nextButton, currentButton, calendar, sharedState) {
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.currentButton = currentButton;
    this.calendar = calendar;
    this.sharedState = sharedState;

    this.prevButton.addEventListener("click", this.handlePrevClick.bind(this));
    this.nextButton.addEventListener("click", this.handleNextClick.bind(this));
    this.currentButton.addEventListener(
      "click",
      this.handleCurrentClick.bind(this)
    );
  }

  handlePrevClick() {
    this.calendar.decrementMonth();
  }

  handleNextClick() {
    this.calendar.incrementMonth();
  }

  handleCurrentClick() {
    this.calendar.init();
  }
}

export default Button;
