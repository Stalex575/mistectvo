let linksDiv = document.getElementById("links");
let linksRows = document.getElementsByClassName("links-row");
let links = document.getElementsByClassName("link-btn");
let linksDivH;
let mobileVar = false;
if (window.innerWidth < 500 || window.screen.width < 500) {
  mobileVar = true;
}
function resize(mobile = false) {
  if (!mobile) {
    linksDivH = window.innerHeight - linksDiv.offsetTop - 58;
    linksDiv.style.height = linksDivH + "px";
  } else {
    linksDiv.style.height = "100vh";
  }

  if (!mobile) {
    for (let link of links) {
      link.style.width = "50%";
      link.style.height =
        linksDiv.getBoundingClientRect().height / linksRows.length + "px";
    }
    if (links.length % 2 !== 0) {
      links[links.length - 1].style.width = "100%";
    }
  } else {
    for (let link of links) {
      link.style.width = "100%";
      link.style.height =
        linksDiv.getBoundingClientRect().height / linksRows.length + "px";
    }
  }

  console.log(mobile);
}

resize(mobileVar);
window.addEventListener("resize", function () {
  // таймаут для того, щоб адаптивність працювала і в режимі браузера, в якому тестується адаптивність.
  if (window.innerWidth < 500 || window.screen.width < 500) {
    mobileVar = true;
    setTimeout(resize(mobileVar), 100);
  } else {
    setTimeout(resize, 100);
  }
});
