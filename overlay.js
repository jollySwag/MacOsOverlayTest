const {ipcRenderer} = require("electron");

window.addEventListener("mousemove", (e) => {
  document.getElementById("overlay-text").innerHTML = `${e.clientX}, ${e.clientY}`
})

document.getElementById("test-block2").addEventListener("mousedown", () => {
  document.getElementById("test-block2").style.backgroundColor = "yellow"
})

document.getElementById("test-block2").addEventListener("mouseup", () => {
  document.getElementById("test-block2").style.backgroundColor = null
})

document.getElementById("test-block2").addEventListener("mouseenter", () => {
  document.getElementById("overlay-mouse-status").innerHTML = "Mouse events enabled"
  ipcRenderer.send("enable-mouse")
})

// document.getElementById("test-block2").addEventListener("mouseleave", () => {
//   document.getElementById("overlay-mouse-status").innerHTML = "Mouse events disabled"
//   ipcRenderer.send("disable-mouse")
// })


document.getElementsByTagName("BODY")[0].addEventListener("mouseover", (e) => {
  console.log(e)
  document.getElementById("overlay-mouse-status").innerHTML = "Mouse events disabled"
  ipcRenderer.send("disable-mouse")
})
