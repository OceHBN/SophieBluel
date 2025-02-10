//window onload pour charger la page completer de toute la gallery
window.addEventListener("load", (event) => {
    console.log("La page est complètement chargée");
});

// FILTRES via le backend en API
//Fonction pour filtrer les objets par catégorie
function filterObjects(works) {
    const workObjets = works.filter(work => work.categoryId === 1);
    console.log("Objets filtrés :", workObjets);
    return workObjets.map(work => `
        <div class="work">
            <img src="${work.imageUrl}" alt="${work.title}">
            <h3>${work.title}</h3>
        </div>
    `).join('');
}

function filterAppartements(works) {
    const workAppartements = works.filter(work => work.categoryId === 2);
    console.log("Appartements filtrés :", workAppartements);
    return workAppartements.map(work => `
        <div class="work">
            <img src="${work.imageUrl}" alt="${work.title}">
            <h3>${work.title}</h3>
        </div>
    `).join('');
}

function filterHotels(works) {
    const workHotels = works.filter(work => work.categoryId === 3);
    console.log("Hotels & Restaurants filtrés :", workHotels);
    return workHotels.map(work => `
        <div class="work">
            <img src="${work.imageUrl}" alt="${work.title}">
            <h3>${work.title}</h3>
        </div>
    `).join('');
}

//Fonction async pour récupérer les données "gallery" filtrés ou non
async function gallery(unfiltered) {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    console.log("Chargement ok");

    if (unfiltered) {
        const htmlContent = unfiltered(works);
        document.querySelector(".gallery").innerHTML = htmlContent;
    } else {
        const htmlContent = works.map(work => `
            <div class="work">
                <img src="${work.imageUrl}" alt="${work.title}">
                <h3>${work.title}</h3>
            </div>
        `).join('');
        document.querySelector(".gallery").innerHTML = htmlContent;
    }
}

//recupérer les boutons
const boutonsFiltres = document.querySelectorAll('.filtres > button') //je recupère un tableau, avec index
console.log("boutonsFiltres")
// au click sur bouton/filtre = event listener
function boutons() {
    boutonsFiltres.forEach(button => {
        button.addEventListener('click', (event) => {
            const idButton = event.target.id;
            event.preventDefault();
            console.log("bouton ok ", idButton);

            if (idButton === 'tous') {
                gallery();
            } else if (idButton === 'objects') {
                gallery(filterObjects);
            } else if (idButton === 'appartements') {
                gallery(filterAppartements);
            } else if (idButton === 'hotels') {
                gallery(filterHotels);
            }
        });
    });
}

//PAGE DE CONNEXION
//Recupérer la liste de navigation
const boutonsNav = document.querySelectorAll('ul > li')
console.log(boutonsNav)
//Creer un listenner au click sur l'élément "login" = afficher la section id #contact
function lancerBoutonsNav() {
    boutonsNav.forEach((button, index) => {
        button.addEventListener('click', () => {
            event.preventDefault();
            // Redirection basée sur l'index du bouton
            if (index === 0) {
                console.log("Redirection vers : /FrontEnd/index.html");
                window.location.href = '/FrontEnd/index.html';
            } else if (index === 1) {
                console.log("Redirection vers : /FrontEnd/index.html");
                window.location.href = '/FrontEnd/index.html';
            } else if (index === 2) {
                console.log("Redirection vers : /FrontEnd/login.html");
                window.location.href = '/FrontEnd/login.html';
            }
        });
    });
}

// GESTION DES MODALES
let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'block';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelectorAll('.js-modal-close').forEach((btn) => btn.addEventListener('click', closeModal));
    modal.querySelectorAll('.js-modal-stop').forEach((wrapper) => wrapper.addEventListener('click', stopPropagation));

    // Charger la galerie dans la modale
    gallery2();
};

const closeModal = function (e = null) {
    if (modal === null) return;
    if (e) e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelectorAll('.js-modal-close').forEach((btn) => btn.removeEventListener('click', closeModal));
    modal.querySelectorAll('.js-modal-stop').forEach((wrapper) => wrapper.removeEventListener('click', stopPropagation));
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

document.querySelectorAll('.js-open-modal').forEach((a) => {
    a.addEventListener('click', openModal);
});

// GESTION DE LA GALERIE-MODALE (DYNAMIQUE)
async function gallery2() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) return;

        const works = await response.json();

        // Sélectionne l'élément de la galerie
        const galleryContainer = document.querySelector('.gallery2');
        if (!galleryContainer) {

            return;
        }

        // Vide la galerie existante
        galleryContainer.innerHTML = '';

        // Ajoute chaque "work" au DOM
        works.forEach((work) => {
            const figure = document.createElement('figure');
            figure.dataset.id = work.id;

            const img = document.createElement('img');
            img.src = work.imageUrl;
            img.alt = work.title;

            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fa-solid fa-trash-can poubelle';

            // Ajoute les événements à l'icône pour la suppression
            deleteIcon.addEventListener('click', deleteImg);

            // Assemble les éléments
            figure.appendChild(img);
            figure.appendChild(deleteIcon);
            galleryContainer.appendChild(figure);
        });
    } catch {
    }
}

// GESTION DES SUPPRESSIONS WORKS
async function deleteImg(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    const imageId = e.target.closest('figure')?.dataset.id;
    if (!imageId) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) return;

        console.log('Image supprimée avec succès');
        e.target.closest('figure').remove();

        // 🎯 1. Fermer la modale
        closeModal();

        // 🎯 2. Mettre à jour `.gallery` et `.gallery2`
        await gallery();  // Recharge la galerie principale
        await gallery2(); // Recharge la galerie modale

        console.log('Work supprimé avec succès et galeries mises à jour.');
    } catch {
    }
}



// GESTION DES MODALES (DISPLAY/NONE)
const modalWrapper1 = document.querySelector('.modal-wrapper1');
const modalWrapper2 = document.querySelector('.modal-wrapper2');
const ajoutPhotoButton = document.querySelector('.ajoutPhoto');

ajoutPhotoButton.addEventListener('click', function (event) {
    event.preventDefault();
    modalWrapper1.style.display = 'none';
    modalWrapper2.style.display = 'flex';
});

// LANCE LES FONCTIONS AU CHARGEMENT
document.addEventListener('DOMContentLoaded', () => {
    gallery2(); // Charger la galerie au démarrage
});

//AJOUT NEW WORK
// Charger les catégories dans .bulleCategories
async function loadCategories() {
    console.log("catego recup")
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) return;

        const categories = await response.json();
        console.log(categories)
        const categoriesRecup = document.querySelector('.bulleCategories'); // Récupérer le select avec class bulleCategories

        // Nettoyer le contenu actuel
        categoriesRecup.innerHTML = '';

        // Remplir le menu déroulant des catégories
        categories.forEach(category => {
            const newCatego = document.createElement('option'); // Corrigé : remplacer 'newCatego' par 'option'
            newCatego.value = category.id; // ID de la catégorie
            newCatego.textContent = category.name; // Nom de la catégorie
            categoriesRecup.appendChild(newCatego);
        });

        // Gérer le changement de catégorie
        categoriesRecup.addEventListener('change', (e) => {
            const selectedCategoryId = e.target.value;
            loadWorksByCategory(selectedCategoryId); // Charger les works pour la catégorie sélectionnée
        });
    } catch {
    }
}

//Preview IMG
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");
    const cadre = document.querySelector(".cadre");

    fileInput.addEventListener("change", function () {
        const file = this.files[0];

        console.log("Fichier sélectionné :", file);

        if (file) {
            const objectURL = URL.createObjectURL(file);

            console.log("URL de l'image :", objectURL);

            imagePreview.src = objectURL;
            imagePreview.style.display = "block";
            cadre.classList.add("hidden-elements");
        }
    });
});

// Ajouter une nouvelle œuvre
async function addWork(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const fileInput = document.querySelector('#fileInput');
    const titleInput = document.querySelector('.bulleTitre');
    const categoryInput = document.querySelector('.bulleCategories');

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categoryInput.value);

    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData, // Envoyer les données dans le body sous format multipart/form-data
        });

        if (!response.ok) return;

        const newWork = await response.json();

        // 🎯 1. Fermer la modale
        closeModal();

        // 🎯 2. Mettre à jour `.gallery` et `.gallery2`
        await gallery(); // Recharge la galerie principale
        await gallery2(); // Recharge la galerie dans la modale

        // 🎯 3. Réinitialiser le formulaire
        document.querySelector('form[name="fileinfo"]').reset();
        document.getElementById("imagePreview").style.display = "none"; // Cacher la preview

        console.log('Work ajouté avec succès et galeries mises à jour.');
    } catch {
    }
}

// Attacher les événements nécessaires
document.addEventListener('DOMContentLoaded', () => {
    loadCategories(); // Charger les catégories et initialiser les droprecup

    // Gérer le clic sur le bouton de validation
    const submitButton = document.querySelector('.submit');
    submitButton.addEventListener('click', addWork);
});

//FONCTIONS
gallery()
boutons()
lancerBoutonsNav()
gallery2()
closeModal()
