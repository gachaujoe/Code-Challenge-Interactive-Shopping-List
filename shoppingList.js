// Maintain the shopping list array
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the list
function renderList() {
  const listContainer = document.getElementById('listContainer');
  listContainer.innerHTML = '';
  shoppingList.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    if (item.purchased) {
      listItem.classList.add('purchased');
    }
    listItem.innerHTML = `
      <span contenteditable="true" onblur="editItem(${index}, this.textContent)">${item.name}</span>
      <button onclick="togglePurchased(${index})">Mark Purchased</button>
    `;
    listContainer.appendChild(listItem);
  });
}

// Function to add an item
function addItem() {
  const itemInput = document.getElementById('itemInput');
  const itemName = itemInput.value.trim();
  if (itemName) {
    shoppingList.push({ name: itemName, purchased: false });
    itemInput.value = '';
    updateLocalStorage();
    renderList();
  }
}

// Function to edit an item
function editItem(index, newName) {
  shoppingList[index].name = newName;
  updateLocalStorage();
}

// Function to toggle purchased status
function togglePurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased;
  updateLocalStorage();
  renderList();
}

// Function to clear the list
function clearList() {
  shoppingList = [];
  updateLocalStorage();
  renderList();
}

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listeners
document.getElementById('addItemButton').addEventListener('click', addItem);
document.getElementById('clearListButton').addEventListener('click', clearList);

// Initial render
renderList();
