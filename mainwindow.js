const {ipcRenderer} = require("electron");



document.getElementById("test-block").addEventListener("mousedown", () => {
  alert("parent window alert")
})

window.addEventListener("mousemove", (e) => {
  console.log(e)
  if (
    e.clientX <= 110 &&
    e.clientY <= 110
  ) {
    ipcRenderer.send("enable-mouse")
  }
  document.getElementById("mainwindow-text").innerHTML = `${e.clientX}, ${e.clientY}`
})