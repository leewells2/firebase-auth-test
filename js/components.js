async function loadComponent(id, file) {

    const response = await fetch(file);

    document.getElementById(id).innerHTML =
        await response.text();

}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");
