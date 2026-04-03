// grab stuff lol
const heroStuff = document.querySelectorAll('.heroSection h2,.heroSection p,.heroBtn,.scrollInd')
const fadeStuff = document.querySelectorAll('.secStuff,.cardThing,.priceCard')

// hide everything first
function hideIt(arr){
  arr.forEach(x=>{
    x.style.opacity=0
    x.style.transform="translateY(20px)" // move down a bit lol
  })
}

hideIt(heroStuff)
hideIt(fadeStuff)

// animate things
function doAnim(arr,stagger=250,horiz=false){
  arr.forEach((el,i)=>{
    setTimeout(()=>{
      el.style.transition="opacity 0.6s ease-out, transform 0.6s ease-out"
      el.style.opacity=1
      if(horiz){
        const dir = i%2===0?-20:20
        el.style.transform="translateX(0) translateY(0)"
      }else{
        el.style.transform="translateY(0)"
      }
    },i*stagger)
  })
}

// page load anim
window.addEventListener('DOMContentLoaded',()=>{
  doAnim(heroStuff,300)
})

// intersection observer thingy
const obs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      if(entry.target.classList.contains('secStuff')){
        const kids = entry.target.querySelectorAll('.cardThing,.priceCard')
        kids.forEach((c,i)=>{
          c.style.opacity=0
          const dir = i%2===0?-20:20
          c.style.transform=`translateX(${dir}px) translateY(20px)`
        })
        doAnim(kids,250,true)
      }
      entry.target.style.transition="opacity 0.6s ease-out, transform 0.6s ease-out"
      entry.target.style.opacity=1
      entry.target.style.transform="translateY(0)"
    }else{
      if(!entry.target.classList.contains('secStuff')){
        entry.target.style.opacity=0
        entry.target.style.transform="translateY(20px)"
      }
    }
  })
},{threshold:0.1})

fadeStuff.forEach(el=>obs.observe(el))

// theme toggle thing lol
const toggle = document.getElementById("darkToggle")
if(localStorage.getItem("theme")==="dark"){document.body.classList.add("dark")}

toggle?.addEventListener("click",()=>{
  document.body.classList.toggle("dark")
  if(document.body.classList.contains("dark")){localStorage.setItem("theme","dark")}
  else{localStorage.setItem("theme","light")}
})
