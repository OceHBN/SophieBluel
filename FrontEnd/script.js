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

boutons();

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
lancerBoutonsNav()

//Activer le bouton "se connecter"
function lancerConnexion() {
    const connexion = document.getElementById('connexion')
    if (!connexion) {
        console.error("Formulaire de connexion non trouvé !");
        return;
    }
}
connexion.addEventListener("submit", function (event) {
    event.preventDefault();
    // Création de l'objet de connexion
    const emailField = connexion.querySelector("[name=email]");
    const passwordField = connexion.querySelector("[name=password]");

    if (!emailField || !passwordField) {
        console.error("Champs email ou password manquants dans le formulaire !");
        return;
    }

    const connexionInfos = {
        email: emailField.value,
        password: passwordField.value,
    };

    console.log("email et password ok :", connexionInfos)
    //charge utile => format JSON
    const chargeUtile = JSON.stringify(connexionInfos)
    console.log("Données envoyées :", chargeUtile);
    // Fetch pour envoyer les infos de connexion
    fetch('http://localhost:5678/api/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4>"
        },
        body: chargeUtile, // Envoie de la charge utile
    })
        .then(response => {
            if (response.ok) {
                console.log("Redirection vers : /FrontEnd/index.html");

                // Ouvrir une nouvelle fenêtre pour la page edit.html
                // window.open('http://127.0.0.1:5500/FrontEnd/edit.html', '_blank');


                // Retourner les données JSON
                return response.json();
            } else {
                throw new Error("Erreur lors de la connexion");
            }
        })
        .then(data => {
            console.log("Connexion réussie :", data);

            // Stockage des informations dans le localStorage
            window.localStorage.setItem("email", connexionInfos.email);
            window.localStorage.setItem("token", data.token);

        })
        .catch(error => {
            console.error("Erreur lors de la connexion :", error);
        });
}
)
lancerConnexion()
