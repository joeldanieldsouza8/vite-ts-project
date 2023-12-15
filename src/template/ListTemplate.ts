import FullList from "../model/FullList";
import ListItem from "../model/ListItem";

interface DOMList {
  ul: HTMLUListElement; // The unordered list element that will contain the list items
  clear(): void; // Method to clear the list
  render(fullList: FullList): void; // Method to render the list
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement; // The unordered list element that will contain the list items

  constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement; // Get unordered list element
  }

  clear(): void {
    this.ul.innerHTML = ""; // Clear list items on the DOM
  }

  render(fullList: FullList): void {
    this.clear(); // Clear list items on the DOM
    const fragment = document.createDocumentFragment(); // Create document fragment

    // Loop through list items
    fullList.list.forEach((item) => {
      const li = this.createListItem(item, fullList); // Create list item element
      fragment.appendChild(li); // Append list item element to document fragment
    });

    this.ul.appendChild(fragment); // Append document fragment to unordered list element
  }

  private createListItem(item: ListItem, fullList: FullList): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "item";

    const checkbox = this.createCheckbox(item, fullList);
    li.appendChild(checkbox);

    const label = this.createLabel(item);
    li.appendChild(label);

    const deleteButton = this.createDeleteButton(item, fullList);
    li.appendChild(deleteButton);

    return li;
  }

  private createCheckbox(item: ListItem, fullList: FullList): HTMLInputElement {
    const checkbox = document.createElement("input"); // Create checkbox element
    checkbox.type = "checkbox"; // Set checkbox type
    checkbox.checked = item.checked; // Set checkbox checked property
    checkbox.id = item.id; // Set checkbox id

    // Add event listener to checkbox element
    checkbox.addEventListener("change", () => {
      item.checked = !item.checked; // Toggle checked property
      fullList.save(); // Save list to local storage
    });

    return checkbox; // Return checkbox element
  }

  private createLabel(item: ListItem): HTMLLabelElement {
    const label = document.createElement("label"); // Create label element
    label.htmlFor = item.id; // Set label for attribute
    label.textContent = item.item; // Set label text content

    return label; // Return label element
  }

  private createDeleteButton(
    item: ListItem,
    fullList: FullList
  ): HTMLButtonElement {
    const deleteButton = document.createElement("button"); // Create delete button element
    deleteButton.className = "delete"; // Add class to delete button element
    deleteButton.textContent = "X"; // Set delete button text content

    // Add event listener to delete button element
    deleteButton.addEventListener("click", () => {
      fullList.removeItem(item.id); // Remove item from list
      fullList.save(); // Save list to local storage
      this.render(fullList); // Render list items on the DOM
    });

    return deleteButton; // Return delete button element
  }
}
