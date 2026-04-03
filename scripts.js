// ok so like grab stuff
let heroStuff = document.querySelectorAll('.bigTop h2,.bigTop p,.getBtn,.downArrow')
let otherStuff = document.querySelectorAll('#stuffWeDo,#aboutUsMaybe,#moneyStuff,.boxA,.priceBox')

// hide things first
function hideThings(arr){
  arr.forEach(x=>{
    x.style.opacity=0
    x.style.transform="translateY(20px)"
  })
}

hideThings(heroStuff)
hideThings(otherStuff)

// animate but like messy
function doAnim(arr,delay,side){
  arr.forEach((el,i)=>{
    setTimeout(()=>{
      el.style.transition="all 0.6s ease-out"
      el.style.opacity=1
      if(side){
        el.style.transform="translateX(0px)"
      }else{
        el.style.transform="translateY(0px)"
      }
    }, i*(delay||200))
  })
}

// when page loads
window.onload = ()=>{
  doAnim(heroStuff,300,false)
}

// observer thing (copied from somewhere tbh)
let obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity=1
      e.target.style.transform="translateY(0px)"

      if(e.target.classList.contains("boxA") || e.target.classList.contains("priceBox")){
        // idk alternate sides
        let dir = Math.random()>0.5 ? -20 : 20
        e.target.style.transform="translateX(0px)"
      }

    } else {
      e.target.style.opacity=0
      e.target.style.transform="translateY(20px)"
    }
  })
},{threshold:0.1})

// observe everything
otherStuff.forEach(el=>{
  obs.observe(el)
})

// fake email logic lol
let emailSpot = document.getElementById("emailHere")
let eName = "maplewebs"
let eDomain = "outlook.com"

// delay it so looks dynamic
setTimeout(()=>{
  emailSpot.innerText = eName + "@" + eDomain
}, 500)

// button clicks
document.querySelectorAll(".getBtn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    window.location.href = "mailto:"+eName+"@"+eDomain+"?subject=yo i want a site"
    console.log("button clicked or something")
  })
})
