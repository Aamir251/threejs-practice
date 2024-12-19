import images from "./images";

export function lerp(start, end, t) {
  return start * ( 1 - t ) + end * t
}


export function mouseMoveListener(cursor) {

  document.addEventListener("mousemove", e => {

    cursor.x = e.clientX;
    cursor.y = e.clientY
  })
}


export function addHoverListener(setTexture, watcher) {


  const links = document.querySelectorAll("ul li");


  links.forEach((link, index) => {
    link.addEventListener("mouseenter", () => {
      switch (index) {
        case 0:
          
          setTexture(images.imageOne)
          break;

        case 0:
          
          setTexture(images.imageTwo)
          break;

        case 0:
          
          setTexture(images.imageThree)
          break;

        case 0:
          
          setTexture(images.imageFour)
          break;
        
        default:
          break;
      }
    })
  })


  const ulWrapper = document.querySelector("ul")

  ulWrapper.addEventListener("mouseenter", () => {
    watcher.linksHover = true
  })

  ulWrapper.addEventListener("mouseleave", () => {
    watcher.linksHover = false
  })
}