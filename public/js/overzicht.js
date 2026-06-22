// Overzicht logica (F2, F3)

var huidigePeriode = 'dag';

function filterPeriode(periode) {
  huidigePeriode = periode;
  toonItems(periode);
}

function toonItems(periode) {
  var items = getItems();
  var nu = new Date();
  var lijst = document.getElementById('itemsLijst');

  // Filter op periode
  var gefilterd = [];
  for (var i = 0; i < items.length; i++) {
    var itemDatum = new Date(items[i].datum);

    if (periode === 'dag') {
      if (items[i].datum === nu.toISOString().split('T')[0]) {
        gefilterd.push(items[i]);
      }
    } else if (periode === 'week') {
      var verschil = (nu - itemDatum) / (1000 * 60 * 60 * 24);
      if (verschil >= 0 && verschil < 7) {
        gefilterd.push(items[i]);
      }
    } else if (periode === 'maand') {
      if (itemDatum.getMonth() === nu.getMonth() && itemDatum.getFullYear() === nu.getFullYear()) {
        gefilterd.push(items[i]);
      }
    }
  }

  if (gefilterd.length === 0) {
    lijst.innerHTML = '<li>Geen items gevonden.</li>';
    return;
  }

  // Toon items
  lijst.innerHTML = '';
  for (var i = 0; i < gefilterd.length; i++) {
    var item = gefilterd[i];
    var li = document.createElement('li');

    var tekst = document.createElement('span');
    tekst.textContent = item.datum + ' | ' + item.categorie + ' | ' + item.omschrijving + ' | ' + item.waarde;
    li.appendChild(tekst);

    // Reset knop (F3)
    var resetKnop = document.createElement('button');
    resetKnop.textContent = '↩ Reset';
    resetKnop.className = 'reset-knop';
    resetKnop.setAttribute('data-id', item.id);
    resetKnop.onclick = function() {
      itemResetten(this.getAttribute('data-id'));
      toonItems(huidigePeriode);
    };
    li.appendChild(resetKnop);

    lijst.appendChild(li);
  }
}

// Laad dag-overzicht bij opstarten
toonItems('dag');
