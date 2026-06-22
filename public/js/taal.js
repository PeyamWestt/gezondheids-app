// Taalswitch NL/EN (F11)

var huidige_taal = localStorage.getItem('taal') || 'nl';
var vertalingen = {};

function taalLaden(taal) {
  fetch('/locales/' + taal + '.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      vertalingen = data;
      huidige_taal = taal;
      localStorage.setItem('taal', taal);
      taalToepassen();
    });
}

function taalToepassen() {
  var elementen = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < elementen.length; i++) {
    var sleutel = elementen[i].getAttribute('data-i18n');
    var waarde = vertaling(sleutel);
    if (waarde) {
      elementen[i].textContent = waarde;
    }
  }
}

function vertaling(sleutel) {
  var delen = sleutel.split('.');
  var resultaat = vertalingen;
  for (var i = 0; i < delen.length; i++) {
    if (resultaat[delen[i]]) {
      resultaat = resultaat[delen[i]];
    } else {
      return null;
    }
  }
  return resultaat;
}

function taalWisselen() {
  if (huidige_taal === 'nl') {
    taalLaden('en');
  } else {
    taalLaden('nl');
  }
}

// Laad taal bij opstarten
taalLaden(huidige_taal);
