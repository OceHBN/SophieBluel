//window onload pour charger la page completer de toute la gallery
window.addEventListener("load", (event) => {
    console.log("La page est complètement chargée");
});
// Activer les boutons filtres via le backend en API
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

// Fonction async pour récupérer les données "gallery" filtrés ou non
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

gallery();

//recupérer les boutons
const boutonsFiltres = document.querySelectorAll('.filtres > button') //je recupère un tableau, avec index
console.log("boutonsFiltres")
// au click sur bouton/filtre = event listener
function boutons() {
    boutonsFiltres.forEach(button => {
        button.addEventListener('click', (event) => {
            const idButton = event.target.id;
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

boutons();


//console.log(btnTous)
//console.log(btnObjects)
//console.log(btnAppartements)
//console.log(btnHotels)


// afficher le contenue = fonction 
//const figure = document.queryselector(figure)
//function displayCategory(img, frigcaption) {}


//Utiliser la fonction Filter + peut-etre faire un tableau par catégorie, pour appeler la fonction//
//.innerHTML permet de modifer les balises HTML (supp, ajout)
