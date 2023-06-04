let linksDiv = document.getElementById("links");
let linksRows = document.getElementsByClassName("links-row");
let links = document.getElementsByClassName("link-btn");
let linksDivH; // the links div height variable
let mobileVar = false;
if (window.innerWidth < 500 || window.screen.width < 500) {
  mobileVar = true; // if the device is a mobile, set the variable to true and resize the links to be appropriate
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
  // timeout is here, beacause without it, in the device toolbar in the browser, links won't resize
  if (window.innerWidth < 500 || window.screen.width < 500) {
    mobileVar = true;
    setTimeout(resize(mobileVar), 100);
  } else {
    setTimeout(resize, 100);
  }
});
