const container = document.getElementById("cardsContainer");
const filterSelect = document.getElementById("filterSelect");

// Modal elements
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalCategory = document.getElementById("modalCategory");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const modalName = document.getElementById("modalName");

let recs = [];

// -------------------------------------------------
// Décodage des virgules
// -------------------------------------------------
function decodeCommas(text) {
    return text?.replace(/&#44;/g, ",") || "";
}

// -------------------------------------------------
// Chargement des données depuis Google Sheet (CSV -> JSON)
// -------------------------------------------------
async function loadSheetDataAsJSON() {
    try {
        const res = await fetch(
            "https://script.google.com/macros/s/AKfycbyJxz6fuY8Sh2eJvfJc7Dt2WSWqcCVEc71V_jqHqrk-w_7_wjidj2SHLCOD02Jn0ocP/exec"
        );
        const text = await res.text();

        const lines = text.trim().split("\n");
        const headers = lines[0].split(",");
        const rows = lines.slice(1);

        recs = rows.map((line) => {
            const cols = line.split(",");
            let obj = {};
            headers.forEach((h, i) => {
                obj[h] = cols[i];
            });
            return obj;
        });

        displayCards(recs);
    } catch (err) {
        console.error("Impossible de charger les recommandations →", err);
        alert("Impossible de charger les recommandations.");
    }
}

// -------------------------------------------------
// Affichage des cartes
// -------------------------------------------------
function displayCards(list) {
    container.innerHTML = "";

    list.forEach((rec) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${decodeCommas(rec.title)}</h3>
            <p>${decodeCommas(rec.author)}</p>
            <p class="posted">by ${decodeCommas(rec.name)}</p>
        `;

        card.addEventListener("click", () => openModal(rec));
        container.appendChild(card);
    });
}

// -------------------------------------------------
// Modal
// -------------------------------------------------
function openModal(rec) {
    modalTitle.textContent = decodeCommas(rec.title);
    modalAuthor.textContent = decodeCommas(rec.author);
    modalCategory.textContent = decodeCommas(rec.category);
    modalDesc.textContent = decodeCommas(rec.description);
    modalLink.textContent = decodeCommas(rec.link);
    modalName.textContent = decodeCommas(rec.name);

    modal.classList.add("rotate-scale-down");
    modal.style.display = "flex";

    modal.addEventListener("animationend", function handler() {
        modal.classList.remove("rotate-scale-down");
        modal.removeEventListener("animationend", handler);
    });
}

// -------------------------------------------------
// Fermeture modal
// -------------------------------------------------
closeModal.onclick = () => (modal.style.display = "none");
modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// -------------------------------------------------
// Filtrage
// -------------------------------------------------
filterSelect.addEventListener("change", () => {
    const val = filterSelect.value;
    if (val === "all") displayCards(recs);
    else displayCards(recs.filter(r => r.category === val));
});

// -------------------------------------------------
// Lancement au chargement de la page
// -------------------------------------------------
loadSheetDataAsJSON();
