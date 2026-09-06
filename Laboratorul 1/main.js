let numar = 0;
const afisaj = document.getElementById('count');
const buton = document.getElementById('btn');

buton.addEventListener('click', function() {
  numar++;
  afisaj.textContent = numar;
});