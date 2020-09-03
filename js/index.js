window.onload = () => {
    document.querySelector("#start-btn").addEventListener("click", () => {
        document.querySelector(".game").classList.toggle("hidden")
        document.querySelector("#myCanvas").classList.toggle("hidden")
        pangApp.init('myCanvas')
    })
};