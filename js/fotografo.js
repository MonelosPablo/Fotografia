document.addEventListener("DOMContentLoaded", () => {
  const isAdmin = localStorage.getItem("isLoggedIn") === "true";
  
  if (isAdmin) {
    const tableCells = document.querySelectorAll(".quiensoy td");
    
    tableCells.forEach((cell) => {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.classList.add("btn", "btn-warning", "m-2");
      cell.appendChild(editBtn);
      
      editBtn.addEventListener("click", () => {
        const currentText = cell.childNodes[0].nodeValue.trim();
        const newText = prompt("Editar contenido:", currentText);
        if (newText !== null) {
          cell.childNodes[0].nodeValue = newText + " ";
          Toastify({
            text: "Dato actualizado",
            duration: 3000,
            gravity: "bottom",
            position: "center",
            backgroundColor: "linear-gradient(to right, #4CAF50, #96c93d)",
          }).showToast();
        }
      });
    });
  } else {
    Toastify({
      text: "Solo el admin puede editar",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
  }
});