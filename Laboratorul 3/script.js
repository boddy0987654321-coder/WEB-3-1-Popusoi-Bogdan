function calculateSum(a, b) {
    return a + b;
}

console.log("--- Exercițiul 1 ---");
console.log("Suma (5, 10):", calculateSum(5, 10));
console.log("Suma (20, 35):", calculateSum(20, 35));


const student = {
  name: "Alex",
  age: 17,
  grade: 9,
  introduce: function() {
    console.log(`Sunt ${this.name} și am ${this.age} ani.`);
  }
};

console.log("--- Exercițiul 2 ---");
student.introduce();
student.grade = 10;
console.log("Noua notă este:", student.grade);

const gameScore = {
    player: 0,
    computer: 0,
    draws: 0,
    runde: 0,

    displayScore: function() {
        document.getElementById("scor-player").textContent = this.player;
        document.getElementById("scor-calculator").textContent = this.computer;
        document.getElementById("scor-egalitati").textContent = this.draws;
    },

    resetScore: function() {
        this.player = 0;
        this.computer = 0;
        this.draws = 0;
        this.runde = 0;
        this.displayScore();
    }
};

const elAlegereUtilizator = document.getElementById("alegere-utilizator");
const elAlegereCalculator = document.getElementById("alegere-calculator");
const elMesajRunda = document.getElementById("mesaj-runda");
const elMesajConducere = document.getElementById("mesaj-conducere");
const elMesajCastigator = document.getElementById("mesaj-castigator");

function alegereCalculator() {
    const optiuni = ["piatra", "hartie", "foarfeca"];
    const index = Math.floor(Math.random() * optiuni.length);
    return optiuni[index];
}

function stabilesteCastigatorul(alegereUtilizator, alegereComputer) {
    if (alegereUtilizator === alegereComputer) {
        return "draw";
    }

    const combinatiiCastigatoare = {
        piatra: "foarfeca",
        foarfeca: "hartie",
        hartie: "piatra"
    };

    if (combinatiiCastigatoare[alegereUtilizator] === alegereComputer) {
        return "player";
    }

    return "computer";
}

function actualizeazaConducerea() {
    if (gameScore.player > gameScore.computer) {
        elMesajConducere.textContent = "Tu conduci jocul!";
    } else if (gameScore.computer > gameScore.player) {
        elMesajConducere.textContent = "Calculatorul conduce jocul!";
    } else {
        elMesajConducere.textContent = "Scor egal momentan.";
    }
}

function verificaCastigatorFinal() {
    if (gameScore.player === 5) {
        elMesajCastigator.textContent = "🎉 Felicitări! Ai câștigat jocul cu 5 victorii!";
        dezactiveazaButoane(true);
    } else if (gameScore.computer === 5) {
        elMesajCastigator.textContent = "💻 Calculatorul a câștigat jocul cu 5 victorii!";
        dezactiveazaButoane(true);
    }
}

function dezactiveazaButoane(stare) {
    document.getElementById("btn-piatra").disabled = stare;
    document.getElementById("btn-hartie").disabled = stare;
    document.getElementById("btn-foarfeca").disabled = stare;
}

function joacaRunda(alegereUtilizator) {
    if (gameScore.player === 5 || gameScore.computer === 5) return;

    const alegereComputer = alegereCalculator();
    
    const rezultat = stabilesteCastigatorul(alegereUtilizator, alege
        reComputer);

    
    gameScore.runde++;

    const simboluri = { piatra: "⛰️ Piatră", hartie: "📄 Hârtie", foarfeca: "✂️ Foarfecă" };
    elAlegereUtilizator.textContent = simboluri[alegereUtilizator];
    elAlegereCalculator.textContent = simboluri[alegereComputer];

    elMesajRunda.className = "";

    if (rezultat === "player") {
        gameScore.player++;
        elMesajRunda.textContent = "Ai câștigat runda!";
        elMesajRunda.classList.add("castig");
    } else if (rezultat === "computer") {
        gameScore.computer++;
        elMesajRunda.textContent = "Calculatorul a câștigat runda!";
        elMesajRunda.classList.add("pierdere");
    } else {
        gameScore.draws++;
        elMesajRunda.textContent = "Egalitate în această rundă!";
        elMesajRunda.classList.add("egalitate");
    }

    gameScore.displayScore();
    actualizeazaConducerea();
    verificaCastigatorFinal();
}

function reseteazaJocul() {
    gameScore.resetScore();
    elAlegereUtilizator.textContent = "—";
    elAlegereCalculator.textContent = "—";
    elMesajRunda.textContent = "";
    elMesajRunda.className = "";
    elMesajConducere.textContent = "";
    elMesajCastigator.textContent = "";
    dezactiveazaButoane(false);
}

document.getElementById("btn-piatra").addEventListener("click", () => joacaRunda("piatra"));
document.getElementById("btn-hartie").addEventListener("click", () => joacaRunda("hartie"));
document.getElementById("btn-foarfeca").addEventListener("click", () => joacaRunda("foarfeca"));
document.getElementById("btn-reset").addEventListener("click", reseteazaJocul);