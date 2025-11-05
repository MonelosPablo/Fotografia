document.addEventListener("DOMContentLoaded", () => {
    const fotos = document.querySelectorAll(".foto-item button.agregar-carrito");
    const contenedorCarrito = document.getElementById("carrito-contenedor");
    const totalElemento = document.getElementById("total");
    const accionesCarrito = document.getElementById("acciones-carrito");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    fotos.forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".foto-item");
        const nombre = item.querySelector(".foto-nombre").textContent;
        const precio = parseFloat(item.querySelector(".foto-precio").textContent.replace("$", ""));
        const src = item.querySelector("img").src;

        carrito.push({ nombre, precio, src });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        Toastify({
          text: `${nombre} agregado al carrito`,
          duration: 2000,
          gravity: "bottom",
          position: "right",
          style: { background: "#4CAF50" },
        }).showToast();

        renderCarrito();
      });
    });

    function renderCarrito() {
      contenedorCarrito.innerHTML = "";

      if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
          <div class="col-12 text-center mt-4">
            <p>Tu carrito está vacío</p>
          </div>`;
        totalElemento.innerHTML = "";
        accionesCarrito.innerHTML = "";
        return;
      }

      carrito.forEach((foto, index) => {
        const item = document.createElement("div");
        item.classList.add("foto-item");
        item.innerHTML = `
          <img src="${foto.src}" alt="${foto.nombre}" class="foto">
          <p class="foto-nombre">${foto.nombre}</p>
          <p class="foto-precio">$${foto.precio}</p>
          <button class="eliminar-item">Eliminar</button>
        `;
        item.querySelector(".eliminar-item").dataset.index = index;
        contenedorCarrito.appendChild(item);
      });

      const total = carrito.reduce((acc, foto) => acc + foto.precio, 0);
      totalElemento.innerHTML = `<strong>Total: $${total}</strong>`;

      accionesCarrito.innerHTML = `
        <button id="vaciar-carrito" class="btn btn-outline-danger me-2">Vaciar carrito</button>
        <button id="finalizar-compra" class="btn btn-success">Finalizar compra</button>
      `;
    }

    function vaciarCarrito() {
      carrito = [];
      localStorage.removeItem("carrito");
      renderCarrito();
      Toastify({
        text: "Carrito vacio",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: { background: "#dc3545" },
      }).showToast();
    }

    function finalizarCompra() {
      const total = carrito.reduce((acc, foto) => acc + foto.precio, 0);

      accionesCarrito.innerHTML = `
        <div class="card p-4 shadow-sm text-center mt-4">
          <h4>Resumen de compra</h4>
          <p>Total a pagar: <strong>$${total}</strong></p>
          <h5 class="mt-3">Selecciona método de pago</h5>
          <div class="d-flex justify-content-center gap-3 mt-2">
            <label><input type="radio" name="pago" value="tarjeta" checked> Tarjeta</label>
            <label><input type="radio" name="pago" value="transferencia"> Transferencia</label>
          </div>
          <button id="confirmar-pago" class="btn btn-primary mt-3">Confirmar pago</button>
        </div>
      `;

      document.getElementById("confirmar-pago").addEventListener("click", () => {
        Toastify({
          text: "Pago realizado",
          duration: 3000,
          gravity: "bottom",
          position: "center",
          style: { background: "#28a745" },
        }).showToast();

        carrito = [];
        localStorage.removeItem("carrito");
        setTimeout(() => renderCarrito(), 2000);
      });
    }

    contenedorCarrito.addEventListener("click", (e) => {
      if (e.target.classList.contains("eliminar-item")) {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
        Toastify({
          text: "Foto eliminada del carrito",
          duration: 2000,
          gravity: "bottom",
          position: "right",
          style: { background: "#dc3545" },
        }).showToast();
      }
    });

    accionesCarrito.addEventListener("click", (e) => {
      if (e.target.id === "vaciar-carrito") vaciarCarrito();
      if (e.target.id === "finalizar-compra") finalizarCompra();
    });

    renderCarrito();
});