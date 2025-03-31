fetch('/footer.html') // Fetch the navbar HTML file
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));