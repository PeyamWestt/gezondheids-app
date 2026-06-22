// Formulier logica (F1, F5)

// Zet datum op vandaag
var vandaag = new Date().toISOString().split('T')[0];
document.getElementById('datum').value = vandaag;

// Pas eenheid aan op categorie
document.getElementById('categorie').addEventListener('change', function() {
  var eenheden = {
    voeding:  'kcal',
    beweging: 'min',
    slaap:    'min',
    water:    'ml'
  };
  document.getElementById('eenheid').textContent = eenheden[this.value] || '';
});

// Formulier opslaan
document.getElementById('gezondheidForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var datum        = document.getElementById('datum').value;
  var categorie    = document.getElementById('categorie').value;
  var omschrijving = document.getElementById('omschrijving').value.trim();
  var waarde       = document.getElementById('waarde').value;

  // Validatie
  if (!datum || !categorie || !omschrijving || !waarde) {
    document.getElementById('foutmelding').style.display = 'block';
    return;
  }

  document.getElementById('foutmelding').style.display = 'none';

  // Item opslaan (F6)
  itemToevoegen({
    datum:        datum,
    categorie:    categorie,
    omschrijving: omschrijving,
    waarde:       parseFloat(waarde)
  });

  alert('Opgeslagen!');
  this.reset();
  document.getElementById('datum').value = vandaag;
  document.getElementById('eenheid').textContent = 'kcal';
});
