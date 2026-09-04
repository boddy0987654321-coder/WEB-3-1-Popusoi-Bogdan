const button = document.getElementById('btn');

const culori = ['#f4f4f9', '#ffe6e6', '#e6ffe6', '#e6f2ff', '#fff0f5'];

button.addEventListener('click', () => {
    const culoareAleatorie = culori[Math.floor(Math.random() * culori.length)];
    document.body.style.backgroundColor = culoareAleatorie;
});