const draggables = document.querySelectorAll('.draggable')
const myDiv = document.querySelectorAll('.my-div')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})
//Burda her bir icerdeki dive yeni 1,2,3 .. olanlarra gore forEach 
//loopunda dondurduk ve her bir divi burda dragstart zamani yeni
//goturmeye basladigimzida classListe class listesine yerlesdiririk
//ve dragend yeni isdediyimiz yere qoyduqdan sonra yeni bitdikden 
//sonra cllas hemen goturduyumuz classin listinnen silirik 
//bir funksiyada her iki isi goruruk hem ekleyib hemde silirk



myDiv.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = AfterDiv(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})
//ve burda goturduyumuz divin (AfterDiv) harda yerlesdirmek istiyirk 
//hemin onun location'unu tapiriq ve afterElment'e beraberlesdirik
//ve sonra eger afterElemnt null'disa yaratdigimiz .dragging elamani
//olan listine qoyulur yox eger null deyilse evvelki container'e 
//qoyulur.



function AfterDiv(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
//burda neynirik tapdigimiz locationu'u duzgun yerlesdirmeye calisiriq
// ve biz burda reduce'den istifade edirik.Reduce burda ne edir uygun
//yeri yerlesdieceyimiz yeri tampagimzdda bize komek edir.
//ve offset'den isdifade etmisik offset ne edir?
//offset surusdurduyumuz div'in duzgun location'un tapmaq ucun istifade
//edirik.
//hundurluk deyeri eger menfi olarsan bu uste musbet olarsa alta eklenir
//    const offset = y - box.top - box.height / 2
// ve burda y-burda goturduyumuz div'in yuksekliyini tutur.
// ve box.top -burda divin ustun hissesinin bir noqteye uzunlugunu  tutar
// ve box.height -buda bizim divinimizn yuksekliyini hesablayir ve biz 
// onu 2 yere bolerek div'imizin center'den hesablayir.
//    { offset: Number.NEGATIVE_INFINITY }
// reduce funksiyasini baslagic deyerini hesablayir 
// offset deyeri her hansi bir div'e yerlesirmeden once ilk olaraq infinty
// deyerine beraberlesdirir. closest deyiseni en yaxin div'i tutmaga goredir
