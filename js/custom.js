/**
 * Gestion du menu déroulant.
 */
const toggleBtn = document.querySelector('.toggle_btn');

/**
 * Icône du bouton de bascule du menu.
 * @type {HTMLElement}
 */
const toggleBtnIcon = document.querySelector('.toggle_btn i');

/**
 * Menu déroulant.
 * @type {HTMLElement}
 */
const dropDownMenu = document.querySelector('.dropdown_menu');

/**
 * Fonction de gestion du clic sur le bouton de bascule du menu.
 */
toggleBtn.onclick = function () {
    // Bascule la classe 'open' du menu déroulant
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    // Modification icon menu déroulant
    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
}

/**
 * Configuration du carrousel principal.
 * @type {Object}
 */
const mainCarouselConfig = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true
};

/**
 * Configuration du carrousel pour les cours.
 * @type {Object}
 */
const courseCarouselConfig = {
    items: 3, // Nombre d'éléments à afficher
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    margin: 15,
    responsive: {
        0: {
            items: 1,
        },
        501: {
            items: 2,
        },
        801: {
            items: 3
        },
    }
};

/**
 * Initialise le carrousel principal.
 */
jQuery(document).ready(function(){
    jQuery(".owl-carousel").owlCarousel(mainCarouselConfig);
});

/**
 * Initialise le carrousel pour les cours.
 */
$(".course-carousel").owlCarousel(courseCarouselConfig);

/**
 * Charge les données des enseignants à partir d'un fichier JSON.
 */
function loadTeachers() {
    fetch('./api/teacher.json')
        .then(response => response.json())
        .then(data => {
            console.log("Données des enseignants chargées :", data);
            const cardsContainer = document.querySelector('.cards');

            // Parcourez les données des enseignants pour créer des cartes
            data.forEach((teacher, index) => {
                // création  un élément de carte
                const card = document.createElement('div');
                card.classList.add('card');

                // création  une image
                const image = document.createElement('img');
                image.src = `images/${teacher.image}`;
                image.alt = 'avatar';
                card.appendChild(image);

                // création  le conteneur de la carte
                const cardContainer = document.createElement('div');
                cardContainer.classList.add('card-container');

                // création  le nom de l'enseignant
                const name = document.createElement('h4');
                const bold = document.createElement('b');
                bold.textContent = teacher.name;
                name.appendChild(bold);
                cardContainer.appendChild(name);

                // création  la description de l'enseignant
                const description = document.createElement('p');
                description.textContent = teacher.description;
                cardContainer.appendChild(description);

                // création  la ligne horizontale
                const hr = document.createElement('hr');
                cardContainer.appendChild(hr);

                // création  les icônes sociales
                const socialIcons = document.createElement('div');
                socialIcons.classList.add('social-icons');
                teacher.socials.forEach(social => {
                    for (const network in social) {
                        if (social.hasOwnProperty(network)) {
                            const link = document.createElement('a');
                            link.href = social[network];
                            const networkName = network;
                            const icon = document.createElement('i');
                            icon.className = `fab fa-${networkName}`;
                            link.appendChild(icon);
                            socialIcons.appendChild(link);
                        }
                    }
                });
                cardContainer.appendChild(socialIcons);

                // Ajout de la carte au conteneur de cartes existant
                card.appendChild(cardContainer);
                cardsContainer.appendChild(card);
            });

        })

        .catch(error => console.error('Error loading teacher data:', error));
}

/**
 * Fonction qui charge les données des enseignants au chargement de la page.
 * @function
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', loadTeachers);
