const showBtn = document.getElementById('showFormBtn');
const form = document.getElementById('addForm');

// Sur la page index.html, il n'y a PAS de formulaire.
// Donc on sécurise pour éviter l'erreur.
if (form && showBtn) {

    showBtn.addEventListener('click', () => {
        form.style.display = 'block';
        showBtn.style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Recommendation submitted!");
        form.reset();
        form.style.display = 'none';
        showBtn.style.display = 'inline-block';
    });
}

