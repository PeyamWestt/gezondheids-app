// Alle data opslaan in localStorage (F6)

function getItems() {
  var data = localStorage.getItem('gezondheid');
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function saveItems(items) {
  localStorage.setItem('gezondheid', JSON.stringify(items));
}

function itemToevoegen(item) {
  var items = getItems();
  item.id = Date.now();
  items.push(item);
  saveItems(items);
}

function itemResetten(id) {
  // F3: reset de waarde van een specifiek item
  var items = getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      items[i].waarde = 0;
    }
  }
  saveItems(items);
}

function itemVerwijderen(id) {
  var items = getItems();
  var nieuw = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].id != id) {
      nieuw.push(items[i]);
    }
  }
  saveItems(nieuw);
}

function allesWissen() {
  if (confirm('Weet je zeker dat je alles wil wissen?')) {
    localStorage.removeItem('gezondheid');
    toonItems('dag');
  }
}
