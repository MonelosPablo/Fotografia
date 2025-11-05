document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".agregar-carrito");

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".foto-item");
      const nombre = item.querySelector(".foto-nombre").textContent;
      const precio = parseFloat(item.querySelector(".foto-precio").textContent.replace("$", ""));
      const src = item.querySelector("img").src;
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push({ nombre, precio, src });
      localStorage.setItem("carrito", JSON.stringify(carrito));

      Toastify({
        text: `${nombre} agregado al carrito`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: { background: "#4CAF50" },
      }).showToast();
    });
  });

  setTimeout(() => {
    Toastify({
      text: "Seguinos en nuestras redes sociales",
      duration: 5000,
      destination: "https://www.instagram.com/_natcap",
      newWindow: true,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        borderRadius: "8px",
      },
    }).showToast();
  }, 4000);

  const loginButton = document.querySelector(".send-button");
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();

      const email = document.querySelector("#floatingInput").value.trim();
      const password = document.querySelector("#floatingPassword").value.trim();

      if (email === "admin@admin.com" && password === "admin") {
        localStorage.setItem("usuario", JSON.stringify({ email }));

        Toastify({
          text: "Bienvenido",
          duration: 2000,
          gravity: "bottom",
          position: "right",
          style: { background: "#4CAF50" },
        }).showToast();

        setTimeout(() => {
          const base = window.location.pathname.includes("/assets/pages/") ? "../../" : "./";
          window.location.href = `${base}index.html`;
        }, 1500);
      } else {
        Toastify({
          text: "Email o contraseña incorrectos",
          duration: 3000,
          gravity: "bottom",
          position: "right",
          style: { background: "#f44336" },
        }).showToast();
      }
    });
  }

  function actualizarMenu() {
    const navList = document.querySelector(".navbar-text.mb-0.h6");
    if (!navList) return;
    const usuario = localStorage.getItem("usuario");
    const base = window.location.pathname.includes("/assets/pages/") ? "../../" : "./";

    if (usuario) {
      navList.innerHTML = `
        <li class="nav-item">
          <a class="nav-link osakan-link" href="${base}assets/pages/albumes.html">Buscar Fotos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link osakan-link" href="${base}assets/pages/fotografo1.html">Contratar Fotógrafo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link osakan-link" href="${base}assets/pages/contacto.html">Contacto</a>
        </li>
        <li class="nav-item d-flex">
          <button class="btn btn-light" id="cerrar-sesion">Cerrar sesión</button>
        </li>
      `;
    } else {
      navList.innerHTML = `
        <li class="nav-item">
          <a class="nav-link osakan-link" href="${base}assets/pages/albumes.html">Buscar Fotos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link osakan-link" href="${base}assets/pages/login.html">Vender Fotos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link osakan-link" href="${base}assets/pages/fotografo1.html">Contratar Fotógrafo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link osakan-link" href="${base}assets/pages/contacto.html">Contacto</a>
        </li>
        <li class="nav-item d-flex">
          <a href="${base}assets/pages/login.html" class="btn btn-light">Ingresar</a>
        </li>
      `;
    }

    const btnCerrarSesion = document.getElementById("cerrar-sesion");
    if (btnCerrarSesion) {
      btnCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario");

        Toastify({
          text: "Sesión cerrada",
          duration: 2000,
          gravity: "bottom",
          position: "right",
          style: { background: "#ff4b2b" },
        }).showToast();

        setTimeout(() => {
          window.location.href = `${base}index.html`;
        }, 1000);
      });
    }
  }

  actualizarMenu();
});