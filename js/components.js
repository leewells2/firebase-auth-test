async function loadComponent(id, file) {

    const response = await fetch(file);

    if (!response.ok) {
        console.error(`Couldn't load ${file}`);
        return;
    }

    document.getElementById(id).innerHTML =
        await response.text();

}

loadComponent("header", "./components/header.html");
loadComponent("footer", "./components/footer.html");
