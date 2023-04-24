var button = document.getElementById('sup-link')
var modal = document.getElementById('page-modal')
var close = document.getElementsByClassName('modal-close')[0]


button.onclick = function() {
  modal.style.display = 'block'
}

close.onclick = function() {
  modal.style.display = 'none'
}

window.onclick = function(event) {
if (event.target.className === 'modal-background') {
  modal.style.display = 'none'
}
}

// Route to display static src images
app.get("/static", (req, res) => {
	res.render("static");
});

// Route to display dynamic src images
app.get("/dynamic", (req, res) => {
	imageList = [];
	imageList.push({ src: "icons/flask.png", name: "flask" });
	imageList.push({ src: "icons/javascript.png", name: "javascript" });
	imageList.push({ src: "icons/react.png", name: "react" });
	res.render("dynamic", { imageList: imageList });
});
