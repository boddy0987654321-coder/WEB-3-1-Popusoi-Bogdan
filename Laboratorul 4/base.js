let elevi = [
  { nume: "Popescu Ana", varsta: 17, nota: 9 },
  { nume: "Rusu Mihai", varsta: 18, nota: 8 },
  { nume: "Ciobanu Maria", varsta: 17, nota: 10 }
];

function afiseazaElevi() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";
  document.getElementById("numar").textContent = "Număr de elevi: " + elevi.length;

  elevi.forEach(function (elev, i) {
    const div = document.createElement("div");
    div.className = "elev";
    const titlu = document.createElement("p");
    const bold = document.createElement("strong");
    bold.textContent = (i + 1) + ". " + elev.nume;
    titlu.appendChild(bold);
    const v = document.createElement("p");
    v.textContent = "Vârsta: " + elev.varsta;
    const n = document.createElement("p");
    n.textContent = "Nota: " + elev.nota;
    div.append(titlu, v, n);
    catalog.appendChild(div);
  });
}

function adaugaElev() {
  const nume = document.getElementById("nume").value.trim();
  const varsta = Number(document.getElementById("varsta").value);
  const nota = Number(document.getElementById("nota").value);

  if (!nume || !varsta || !nota) {
    alert("Completează toate câmpurile!");
    return;
  }

  let elevNou = { nume: nume, varsta: varsta, nota: nota };
  elevi.push(elevNou);

  document.getElementById("nume").value = "";
  document.getElementById("varsta").value = "";
  document.getElementById("nota").value = "";
  afiseazaElevi();
}

function gasesteIndex(nume) {
  const gasit = elevi.find(function (e) {
    return e.nume.toLowerCase() === nume.toLowerCase();
  });
  return gasit ? elevi.indexOf(gasit) : -1;
}

function stergeElev() {
  const nume = document.getElementById("numeSterge").value.trim();
  const index = gasesteIndex(nume);

  if (index === -1) {
    alert("Elevul nu a fost găsit!");
    return;
  }
  elevi.splice(index, 1);
  document.getElementById("numeSterge").value = "";
  afiseazaElevi();
}

function cautaElev() {
  const nume = document.getElementById("numeCauta").value.trim().toLowerCase();
  const rez = document.getElementById("rezultat");
  const elev = elevi.find(function (e) {
    return e.nume.toLowerCase() === nume;
  });

  if (elev) {
    rez.innerHTML = "Elev găsit!<br>Nume: " + elev.nume +
      "<br>Vârsta: " + elev.varsta + "<br>Nota: " + elev.nota;
  } else {
    rez.textContent = "Elevul nu a fost găsit!";
  }
}

afiseazaElevi();