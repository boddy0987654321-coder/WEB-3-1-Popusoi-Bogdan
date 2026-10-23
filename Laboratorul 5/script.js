let studenti = [
  { id: 1, nume: "Ana Popescu", grupa: "SI-231", varsta: 19, specialitate: "Securitate informațională", avatar: "👩‍💻" },
  { id: 2, nume: "Mihai Rusu", grupa: "SI-231", varsta: 20, specialitate: "Securitate informațională", avatar: "👨‍💻" },
  { id: 3, nume: "Irina Ciobanu", grupa: "PR-232", varsta: 18, specialitate: "Programare", avatar: "👩‍🎓" },
  { id: 4, nume: "Andrei Munteanu", grupa: "PR-232", varsta: 21, specialitate: "Programare", avatar: "🧑‍🎓" },
  { id: 5, nume: "Elena Rotaru", grupa: "RC-233", varsta: 22, specialitate: "Rețele de calculatoare", avatar: "🧑‍🔬" }
];

let urmatorulId = 6;
const lista = document.getElementById("lista");

function afiseazaStudenti() {
  document.getElementById("nr").textContent = studenti.length;

  if (studenti.length === 0) {
    lista.innerHTML = "<p class='empty'><strong>Nu mai există studenți în listă.</strong></p>";
    return;
  }

  let html = "";
  for (const s of studenti) {
    html += `
      <article class="card">
        <div class="who">
          <div class="avatar">${s.avatar}</div>
          <div>
            <h3>${s.nume}</h3>
            <p>Grupa: ${s.grupa}</p>
          </div>
        </div>
        <dl>
          <div><dt>Vârsta</dt><dd>${s.varsta} ani</dd></div>
          <div><dt>Specialitatea</dt><dd>${s.specialitate}</dd></div>
          <div><dt>Statut</dt><dd><span class="badge">Înmatriculat</span></dd></div>
        </dl>
        <button class="del" onclick="stergeStudent(${s.id})">Șterge</button>
      </article>`;
  }
  lista.innerHTML = html;
}

function adaugaStudent(event) {
  event.preventDefault();

  const nume = document.getElementById("f-nume").value.trim();
  const grupa = document.getElementById("f-grupa").value.trim();
  const varsta = Number(document.getElementById("f-varsta").value);
  const specialitate = document.getElementById("f-spec").value;
  const avatar = document.getElementById("f-avatar").value;
  const msg = document.getElementById("msg");

  if (nume === "" || grupa === "" || varsta === 0) {
    msg.textContent = "Completați toate câmpurile.";
    return;
  }
  if (!Number.isInteger(varsta) || varsta < 14 || varsta > 100) {
    msg.textContent = "Vârsta trebuie să fie un număr întreg între 14 și 100.";
    return;
  }

  studenti.push({
    id: urmatorulId,
    nume: nume,
    grupa: grupa,
    varsta: varsta,
    specialitate: specialitate,
    avatar: avatar
  });
  urmatorulId++;

  document.getElementById("form").reset();
  msg.textContent = "";
  afiseazaStudenti();
}

function stergeStudent(id) {
  const index = studenti.findIndex(function (s) {
    return s.id === id;
  });

  if (index !== -1) {
    studenti.splice(index, 1);
  }
  afiseazaStudenti();
}


function schimbaJustify(valoare) {
  lista.style.justifyContent = valoare;
}

function schimbaAlign(valoare) {
  lista.style.alignItems = valoare;
}

function schimbaWrap(valoare) {
  lista.style.flexWrap = valoare;
}

function schimbaGap(valoare) {
  lista.style.gap = valoare + "px";
  document.getElementById("gap-out").textContent = valoare + "px";
}

afiseazaStudenti();