document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchInput");
    const table = document.getElementById("sociosTable");
    const rows = table.getElementsByTagName("tr");

    // Función para normalizar texto (quita tildes, espacios dobles, etc.)
    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Quita acentos
            .replace(/\s+/g, " ")           // Unifica espacios
            .trim();
    }

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            aplicarBusqueda();
        }
    });

    function aplicarBusqueda() {
        const filtro = normalizar(input.value);

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");

            const nombre = normalizar(cells[0].innerText);
            const dni = normalizar(cells[1].innerText);

            const coincide =
                nombre.includes(filtro) ||  // Apellido o nombre
                dni.includes(filtro);       // DNI

            rows[i].style.display = (coincide || filtro === "") ? "" : "none";
        }
    }
});
