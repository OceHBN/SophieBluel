//window onload pour charger la page completer de toute la gallery
window.addEventListener("load", (event) => {
    console.log("La page est complètement chargée");
});
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
//Activer le bouton "se connecter"
function lancerConnexion() {
    const connexion = document.getElementById('connexion')
    if (!connexion) {
        console.error("Formulaire de connexion non trouvé !");
        return;
    }
}
connexion.addEventListener("click", function (event) {
    event.preventDefault();
    // Création de l'objet de connexion
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

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
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: chargeUtile, // Envoie de la charge utile
    })
        .then(response => {
            if (response.ok) {
                console.log("Redirection vers : /FrontEnd/edit.html");

                // Ouvrir une nouvelle fenêtre pour la page edit.html
                window.location.href = 'http://127.0.0.1:5500/FrontEnd/edit.html', '_blank';
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
//FONCTIONS
lancerConnexion()
lancerBoutonsNav()

