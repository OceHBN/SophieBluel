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

//Gestion MODAL
let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null

}

const stopPropagation = function (e) {
    e.stopPropagation()
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

//DELETE
const deleteImg = function (e) {
    e.preventDefault

}

document.querySelectorAll('poubelle').forEach(a => {
    a.addEventListener('click', deleteImg)
})
//FONCTION
gallery()
boutons()
lancerBoutonsNav()