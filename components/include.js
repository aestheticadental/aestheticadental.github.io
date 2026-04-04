document.addEventListener("DOMContentLoaded", function () {

  function loadComponent(id, file) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      });
  }

  loadComponent("header", "/components/header.html");
  loadComponent("footer", "/components/footer.html");
  loadComponent("cta", "/components/cta.html");

});
