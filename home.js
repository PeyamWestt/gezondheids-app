// Dashboard logica

// Toon de datum van vandaag
var vandaag = new Date();
document.getElementById('datum').textContent = vandaag.toLocaleDateString('nl-NL', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});

// Toon totalen van vandaag
function toonTotalen() {
  var items = getItems();
  var vandaagStr = vandaag.toISOString().split('T')[0];

  var totalen = { voeding: 0, beweging: 0, slaap: 0, water: 0 };

  for (var i = 0; i < items.length; i++) {
    if (items[i].datum === vandaagStr) {
      totalen[items[i].categorie] += parseFloat(items[i].waarde);
    }
  }

  document.getElementById('totaal-voeding').textContent  = totalen.voeding + ' kcal';
  document.getElementById('totaal-beweging').textContent = totalen.beweging + ' min';
  document.getElementById('totaal-slaap').textContent    = (totalen.slaap / 60).toFixed(1) + ' uur';
  document.getElementById('totaal-water').textContent    = totalen.water + ' ml';
}

// Toon de laatste 5 items
function toonRecent() {
  var items = getItems();
  var vandaagStr = vandaag.toISOString().split('T')[0];
  var lijst = document.getElementById('recenteLijst');

  var vandaagItems = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].datum === vandaagStr) {
      vandaagItems.push(items[i]);
    }
  }

  if (vandaagItems.length === 0) {
    lijst.innerHTML = '<li>Nog niets toegevoegd vandaag.</li>';
    return;
  }

  lijst.innerHTML = '';
  var tonen = vandaagItems.slice(-5).reverse();
  for (var i = 0; i < tonen.length; i++) {
    var li = document.createElement('li');
    li.textContent = tonen[i].omschrijving + ' – ' + tonen[i].waarde + ' (' + tonen[i].categorie + ')';
    lijst.appendChild(li);
  }
}

toonTotalen();
toonRecent();
