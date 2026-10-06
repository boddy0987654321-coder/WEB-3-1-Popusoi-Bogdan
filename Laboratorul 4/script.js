// ===== Exercițiul 1 =====
let fructe = ["Măr", "Pară", "Banana", "Portocală", "Kiwi"];
console.log("Exercițiul 1");
console.log("Lista:", fructe);
console.log("Primul element:", fructe[0]);
console.log("Ultimul element:", fructe[fructe.length - 1]);
console.log("Număr de elemente:", fructe.length);

// ===== Exercițiul 2 =====
let orase = ["Chișinău", "Bălți", "Cahul"];
orase.push("Orhei");      // la sfârșit
orase.unshift("Soroca");  // la început
orase.pop();              // elimină ultimul
orase.shift();            // elimină primul
console.log("Exercițiul 2");
console.log("Lista finală:", orase);

// ===== Exercițiile 3 și 4 =====
let produse = ["Pâine", "Lapte", "Ouă"];

function afiseaza() {
  const zona = document.getElementById("lista");
  zona.textContent = produse.length === 0 ? "Lista este goală!" : produse.join(", ");
}

function citeste() {
  const camp = document.getElementById("produs");
  const valoare = camp.value.trim();
  camp.value = "";
  camp.focus();
  return valoare;
}

function adaugaSfarsit() {
  const p = citeste();
  if (p) produse.push(p);
  afiseaza();
}

function adaugaInceput() {
  const p = citeste();
  if (p) produse.unshift(p);
  afiseaza();
}

function stergePrimul() {
  produse.shift();
  afiseaza();
}

function stergeUltimul() {
  produse.pop();
  afiseaza();
}

afiseaza();