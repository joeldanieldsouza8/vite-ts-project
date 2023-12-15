import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./template/ListTemplate";

function initApp(): void {
  const fullList = new FullList([]);
  const listTemplate = new ListTemplate();

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (e): void => {
    e.preventDefault(); // Prevent form submission
    const itemInput = document.getElementById("newItem") as HTMLInputElement; // Get item input element

    // guard clause
    if (!itemInput) return; // If item input element does not exist, return

    const item = itemInput.value.trim(); // Get item input value
    if (!item) return; // If item input value is empty, return
    const listItem = new ListItem(fullList.list.length.toString(), item, false); // Create list item object
    fullList.addItem(listItem); // Add list item to list
    itemInput.value = ""; // Clear item input element value
    listTemplate.render(fullList); // Render list
  });

  const clearListButton = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearListButton.addEventListener("click", (): void => {
    fullList.clearList(); // Clear list
    listTemplate.clear(); // Clear list on the DOM
    listTemplate.render(fullList); // Render list
  });

  fullList.load(); // Load list from local storage
  listTemplate.render(fullList); // Render list
}

document.addEventListener("DOMContentLoaded", initApp); // Initialize app
