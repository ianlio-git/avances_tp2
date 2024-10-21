// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Ajustar margen del contenido principal para que no se superponga con la barra de navegación
function ajustarMargen() {
    const navbar = document.querySelector('nav'); 
    const mainContent = document.getElementById('main-content');
    const alturaNavbar = navbar.offsetHeight;
    mainContent.style.marginTop = `${alturaNavbar + 40}px`; 
}
window.onload = ajustarMargen;
window.onresize = ajustarMargen;

// Abrir/cerrar menú móvil
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Cerrar menú cuando se hace clic fuera de él
document.addEventListener('click', (event) => {
    if (mobileMenu) {
        const isClickInsideMenu = mobileMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Función para cargar una página
function loadPage(page) {
    const pageUrl = `pages/${page}.html`; // Ruta de la página que deseas cargar

    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Página no encontrada');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('main-content').innerHTML = data; // Inserta el HTML en el main-content
            
            // Cargar los scripts asociados a la página
            loadPageScripts(page); 
        })
        .catch(error => {
            document.getElementById('main-content').innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
        });
}

// Función para cargar los scripts de una página
function loadPageScripts(page) {
    const scriptUrl = `scripts/${page}.js`; // Asume que cada página tiene su script en una carpeta scripts
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.onload = function() {
        console.log(`Script ${scriptUrl} cargado exitosamente`);
    };
    scriptElement.onerror = function() {
        console.error(`Error al cargar el script ${scriptUrl}`);
    };
    document.body.appendChild(scriptElement); // Agrega el script al body para ejecutarlo
}

// Listener para la navegación en los enlaces
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        loadPage(page);
        
        // Cerrar el menú después de hacer clic en un enlace
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Carga por defecto la página de inicio
window.addEventListener('load', function() {
    loadPage('inicio'); 
});
