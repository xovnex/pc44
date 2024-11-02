// Función para alternar el estado de favoritos y mantener la persistencia en localStorage
function toggleFavorito(button, gameId, gameTitle, gameDescription, gameImage) {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (button.classList.contains("red")) {
    // Si ya está en favoritos, eliminarlo
    button.classList.remove("red");
    button.textContent = "❤️ Agregar a Favoritos";

    // Eliminar el juego de favoritos
    const nuevosFavoritos = favoritos.filter((juego) => juego.id !== gameId);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  } else {
    // Si no está en favoritos, agregarlo
    button.classList.add("red");
    button.textContent = "Eliminar de Favoritos";

    // Agregar el juego a favoritos
    const juegoFavorito = {
      id: gameId,
      title: gameTitle,
      description: gameDescription,
      image: gameImage,
    };

    favoritos.push(juegoFavorito);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
}

// Función para cargar los favoritos guardados en la página de favoritos
function cargarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const contenedorFavoritos = document.getElementById("contenedor-favoritos");

  // Limpiar el contenido antes de cargar los favoritos
  contenedorFavoritos.innerHTML = "";

  if (favoritos.length === 0) {
    contenedorFavoritos.innerHTML = "<p>No hay juegos en favoritos.</p>";
  } else {
    favoritos.forEach((juego) => {
      const gameElement = document.createElement("section");
      gameElement.classList.add("game-box");
      gameElement.innerHTML = `
                <h2>${juego.title}</h2>
                <p>${juego.description}</p>
                <img src="${juego.image}" alt="${juego.title}" width="200" height="200">
                <div class="buttons">
                    <button class="jugar" onclick="window.location.href='https://link-al-juego.com'">Jugar</button>
                    <button class="eliminar-favorito" onclick="eliminarFavorito('${juego.id}', this)">Eliminar de Favoritos</button>
                </div>
            `;
      contenedorFavoritos.appendChild(gameElement);
    });
  }
}

// Función para eliminar un juego de los favoritos desde la página de favoritos
function eliminarFavorito(gameId, button) {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const nuevosFavoritos = favoritos.filter((juego) => juego.id !== gameId);
  localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));

  // Eliminar el juego del HTML
  const gameElement = button.closest(".game-box");
  gameElement.remove();

  // Si no quedan favoritos, mostrar un mensaje
  const contenedorFavoritos = document.getElementById("contenedor-favoritos");
  if (nuevosFavoritos.length === 0) {
    contenedorFavoritos.innerHTML = "<p>No hay juegos en favoritos.</p>";
  }
}

// Llama a la función al cargar la página de favoritos
window.onload = cargarFavoritos;
