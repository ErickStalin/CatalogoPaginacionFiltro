document.addEventListener("DOMContentLoaded", () => {
  const productosDiv = document.querySelector(".catalogo");
  const pageList = document.querySelector(".page-list");
  const categoriaSelect = document.getElementById("categoria");
  const itemsPerPage = 16;
  let currentPage = 1;
  let productos = [];
  let currentCategoriaFiltro = "Todas"; // Mantén un seguimiento de la categoría actualmente filtrada

  function showProductsOnPage(page, categoriaFiltro) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let productsToShow = productos;

    if (categoriaFiltro !== "Todas") {
      productsToShow = productsToShow.filter(
        (producto) => producto.Categorias === categoriaFiltro
      );
    }

    const totalPages = Math.ceil(productsToShow.length / itemsPerPage);
    createPaginationButtons(totalPages); // Crea los botones de paginación según sea necesario

    productosDiv.innerHTML = "";

    const startIndexToShow = (page - 1) * itemsPerPage;
    const endIndexToShow = startIndexToShow + itemsPerPage;

    productsToShow.slice(startIndexToShow, endIndexToShow).forEach((producto) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto");

      const imagen = document.createElement("img");
      imagen.src = producto.Imagenes;
      imagen.alt = producto.SKU;

      const nombre = document.createElement("p");
      nombre.classList.add("nombre");
      nombre.textContent = producto.Nombre;

      const sku = document.createElement("p");
      sku.classList.add("sku");
      sku.textContent = producto.SKU;

      // Crear el botón "Leer más"
      const leerMasButton = document.createElement("button");
      leerMasButton.textContent = "Leer más";
      leerMasButton.addEventListener("click", () => {
        // Aquí puedes agregar la lógica para mostrar más detalles del producto
        // Puedes abrir un modal o redirigir a una página de detalles del producto, por ejemplo.
        // Por ahora, simplemente mostraremos un mensaje de ejemplo.
        alert(`Más detalles de ${producto.Nombre}`);
      });

      productoDiv.appendChild(imagen);
      productoDiv.appendChild(nombre);
      productoDiv.appendChild(sku);
      productoDiv.appendChild(leerMasButton);
      productosDiv.appendChild(productoDiv);
    });
  }

  categoriaSelect.addEventListener("change", () => {
    const categoriaFiltro = categoriaSelect.value.trim(); // Elimina espacios adicionales
    currentPage = 1;
    currentCategoriaFiltro = categoriaFiltro; // Actualiza la categoría de filtro actual
    showProductsOnPage(currentPage, categoriaFiltro);
  });

  function createPaginationButtons(totalPages) {
    pageList.innerHTML = ""; // Limpia la lista de páginas antes de crear nuevos botones

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("li");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showProductsOnPage(currentPage, currentCategoriaFiltro); // Usa la categoría actual de filtro
      });
      pageList.appendChild(pageButton);
    }
  }

  // No necesitas inicializar la paginación aquí, ya que la generamos según sea necesario.

  fetch("http://localhost:3000/buscar")
    .then((response) => response.json())
    .then((data) => {
      productos = data;
      showProductsOnPage(currentPage, currentCategoriaFiltro); // Mostrar todos los productos al principio
    })
    .catch((error) => {
      console.error("Error al obtener datos de productos:", error);
    });
});
