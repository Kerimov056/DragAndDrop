const mydiv = document.querySelectorAll(".my-div")
const cotainer = document.querySelector(".cotainer")

mydiv.addEventListener("drag",()=>{
    mydiv.style.display="none"
})

cotainer.addEventListener("dragend",()=>{
    mydiv.style.display="block"
})