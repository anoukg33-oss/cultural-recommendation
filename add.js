const SHEET_URL = "https://script.google.com/macros/s/AKfycbyJxz6fuY8Sh2eJvfJc7Dt2WSWqcCVEc71V_jqHqrk-w_7_wjidj2SHLCOD02Jn0ocP/exec";

// Écoute du formulaire
document.getElementById("recForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collecte des données (photo supprimée et remplacement des virgules)
        const data = {
        name: document.getElementById("name").value.replace(/,/g, "&#44;"),
        title: document.getElementById("title").value.replace(/,/g, "&#44;"),
        author: document.getElementById("author").value.replace(/,/g, "&#44;"),
        category: document.getElementById("category").value.replace(/,/g, "&#44;"),
        description: document.getElementById("description").value.replace(/,/g, "&#44;"),
        link: document.getElementById("url").value.replace(/,/g, "&#44;"),
        timestamp: new Date().toISOString()
    };
    // Conversion en FormData pour Google Sheet
    const form = new FormData();
    for (let key in data) {
        form.append(key, data[key]);
    }

    try {
        await fetch(SHEET_URL, {
            method: "POST",
            body: form
        });

        document.getElementById("successPopup").classList.remove("popup-hidden");
        document.getElementById("recForm").reset();

    } catch (err) {
        console.error("Error sending to sheet:", err);
        alert("Error submitting. Please try again.");
    }
});

// Fermer la popup
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("closePopup").addEventListener("click", () => {
        document.getElementById("successPopup").classList.add("popup-hidden");
    });
});
