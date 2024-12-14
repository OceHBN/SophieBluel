//window onload pour charger la page completer de toute la gallery
window.addEventListener("load", (event) => {
    console.log("La page est complètement chargée");
});
// Activer les boutons filtres via le backend en API
//Fonction pour filtrer les objets par catégorie
function filterObjects(works) {
    const workObjets = works.filter(work => work.categoryId === 1);
    console.log("Objets filtrés :", workObjets);
}

function filterAppartements(works) {
    const workAppartements = works.filter(work => work.categoryId === 2);
    console.log("Appartements filtrés :", workAppartements);
}

function filterHotels(works) {
    const workHotels = works.filter(work => work.categoryId === 3);
    console.log("Hotels & Restaurants filtrés :", workHotels);
}

// Fonction async pour récupérer les données "gallery"
async function gallery() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    console.log("Chargement ok");

    // Appel de la fonction externe pour filtrer les données
    // un let projet : qui modifiera l'affichage au click (hors scope fetch)
    filterObjects(works);
    filterAppartements(works)
    filterHotels(works)
}

gallery();

//recupérer les boutons
const boutonsFiltres = document.querySelectorAll('.filtres > button') //je recupère un tableau, avec index
console.log("boutonsFiltres")
// au click sur bouton/filtre = event listener
function boutons() {
    boutonsFiltres.forEach(button => {
        button.addEventListener('click', (event) => {
            const idButton = event.target.id;
            console.log("bouton ok", idButton);

            if (idButton === 'tous') { gallery(); }
            else if (idButton === 'objects') { filterObjects(); }
            else if (idButton === 'appartements') { filterAppartements(); }
            else if (idButton === 'hotels') { filterHotels(); }
        });
    });
}

boutons()


//const btnTous = addEventListener.gallery
//const btnObjects = filterObjects
//const btnAppartements = filterAppartements
//const btnHotels = filterHotels
//}
//console.log(btnTous)
//console.log(btnObjects)
//console.log(btnAppartements)
//console.log(btnHotels)


// afficher le contenue = fonction 
//const figure = document.queryselector(figure)
//function displayCategory(img, frigcaption) {}


//Utiliser la fonction Filter + peut-etre faire un tableau par catégorie, pour appeler la fonction//
//.innerHTML permet de modifer les balises HTML (supp, ajout)
