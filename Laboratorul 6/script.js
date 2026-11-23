const CHEIE_STORAGE = "elevi";
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

let elevi = [];
let idEditare = null;

const formElev = document.getElementById("form-elev");
const titluFormular = document.getElementById("titlu-formular");
const inputNume = document.getElementById("nume");
const inputVarsta = document.getElementById("varsta");
const inputGrupa = document.getElementById("grupa");
const inputEmail = document.getElementById("email");
const mesajEroare = document.getElementById("mesaj-eroare");
const btnSubmit = document.getElementById("btn-submit");
const btnAnuleazaEditare = document.getElementById("btn-anuleaza-editare");

const inputCautare = document.getElementById("cautare");
const btnStergeTot = document.getElementById("btn-sterge-tot");
const totalEleviEl = document.getElementById("total-elevi");
const listaEleviEl = document.getElementById("lista-elevi");

function salveazaElevi() {
  localStorage.setItem(CHEIE_STORAGE, JSON.stringify(elevi));
}

function incarcaElevi() {
  const dateSalvate = localStorage.getItem(CHEIE_STORAGE);
  elevi = dateSalvate ? JSON.parse(dateSalvate) : [];
}

function afiseazaEroare(mesaj) {
  mesajEroare.textContent = mesaj;
  mesajEroare.classList.remove("d-none");
}

function ascundeEroare() {
  mesajEroare.textContent = "";
  mesajEroare.classList.add("d-none");
}

function valideazaFormular() {
  ascundeEroare();

  const nume = inputNume.value.trim();
  const varsta = Number(inputVarsta.value);
  const grupa = inputGrupa.value.trim();
  const email = inputEmail.value.trim();

  if (nume === "" || grupa === "" || email === "" || inputVarsta.value.trim() === "") {
    afiseazaEroare("Toate câmpurile sunt obligatorii.");
    return null;
  }

  if (varsta <= 0 || varsta > 120) {
    afiseazaEroare("Vârsta trebuie să fie un număr pozitiv (1–120).");
    return null;
  }

  if (!REGEX_EMAIL.test(email)) {
    afiseazaEroare("Introduceți o adresă de e-mail validă.");
    return null;
  }

  return { nume, varsta, grupa, email };
}

function afiseazaElevi() {
  totalEleviEl.textContent = elevi.length;
  btnStergeTot.disabled = elevi.length === 0;
  listaEleviEl.innerHTML = "";

  const termen = inputCautare.value.toLowerCase().trim();
  const eleviFiltrati = elevi.filter((elev) =>
    elev.nume.toLowerCase().includes(termen)
  );

  if (elevi.length === 0) {
    listaEleviEl.innerHTML = `
      <div class="col-12">
        <div class="empty-state text-center p-4">
          <p class="mb-0 text-secondary">Nu există elevi înregistrați.</p>
        </div>
      </div>`;
    return;
  }

  if (eleviFiltrati.length === 0) {
    listaEleviEl.innerHTML = `
      <div class="col-12">
        <div class="empty-state text-center p-4">
          <p class="mb-0 text-secondary">Nu au fost găsiți elevi.</p>
        </div>
      </div>`;
    return;
  }

  eleviFiltrati.forEach((elev) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6";

    col.innerHTML = `
      <div class="card student-card h-100">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-3">
            <h3 class="h6 fw-bold mb-0">${elev.nume}</h3>
            <span class="badge badge-grupa">${elev.grupa}</span>
          </div>
          <p class="small mb-1"><strong>Vârstă:</strong> ${elev.varsta} ani</p>
          <p class="small mb-1"><strong>Grupă / Clasă:</strong> ${elev.grupa}</p>
          <p class="small mb-3 text-break"><strong>E-mail:</strong> ${elev.email}</p>
          <div class="d-flex gap-2 mt-auto pt-2 border-top">
            <button type="button" class="btn btn-outline-dark btn-sm flex-fill btn-editeaza">Editează</button>
            <button type="button" class="btn btn-outline-dark btn-sm flex-fill btn-sterge">Șterge</button>
          </div>
        </div>
      </div>`;

    col.querySelector(".btn-editeaza").addEventListener("click", () => incepeEditarea(elev.id));
    col.querySelector(".btn-sterge").addEventListener("click", () => stergeElev(elev.id));

    listaEleviEl.appendChild(col);
  });
}
function incepeEditarea(id) {
  const elev = elevi.find((e) => e.id === id);
  if (!elev) return;

  idEditare = id;
  inputNume.value = elev.nume;
  inputVarsta.value = elev.varsta;
  inputGrupa.value = elev.grupa;
  inputEmail.value = elev.email;

  titluFormular.textContent = "Editează elev";
  btnSubmit.textContent = "Salvează modificările";
  btnAnuleazaEditare.classList.remove("d-none");
}

function anuleazaEditarea() {
  idEditare = null;
  formElev.reset();
  ascundeEroare();

  titluFormular.textContent = "Adaugă elev";
  btnSubmit.textContent = "Adaugă elev";
  btnAnuleazaEditare.classList.add("d-none");
}

function stergeElev(id) {
  elevi = elevi.filter((elev) => elev.id !== id);
  if (idEditare === id) anuleazaEditarea();
  salveazaElevi();
  afiseazaElevi();
}

function stergeTotiElevii() {
  if (confirm("Sigur doriți să ștergeți toți elevii înregistrați?")) {
    elevi = [];
    anuleazaEditarea();
    inputCautare.value = "";
    salveazaElevi();
    afiseazaElevi();
  }
}

function gestioneazaTrimitere(event) {
  event.preventDefault();
  const date = valideazaFormular();
  if (!date) return;

  if (idEditare !== null) {
    const index = elevi.findIndex((elev) => elev.id === idEditare);
    elevi[index] = { id: idEditare, ...date };
    anuleazaEditarea();
  } else {
    elevi.push({ id: Date.now(), ...date });
    formElev.reset();
  }

  salveazaElevi();
  afiseazaElevi();
}

document.addEventListener("DOMContentLoaded", () => {
  incarcaElevi();
  afiseazaElevi();

  formElev.addEventListener("submit", gestioneazaTrimitere);
  btnAnuleazaEditare.addEventListener("click", anuleazaEditarea);
  inputCautare.addEventListener("input", afiseazaElevi);
  btnStergeTot.addEventListener("click", stergeTotiElevii);
});