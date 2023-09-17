export function incrementMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentYear++;
    currentMonth = 0;
  }
  return { currentMonth, currentYear };

}

export function decrementMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentYear--;
    currentMonth = 11;
  }
  return { currentMonth, currentYear };
}

export function getCurrentState() {
  return { currentMonth, currentYear };
}