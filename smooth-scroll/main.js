

  // ## Instancing
  // const supahscroll = new SupahScroll({
  //   el: 'main', // your element or classname or ID
  //   speed: 0.1 // lower is slower, this value could go from 0.01 to 1
  // })
  
  // ## Methods
  // - .update() // update and resize
  // - .pause() // pause, every scroll is stopped
  // - .play() // play, back to normality after pause
  // - .scrollTo(y) // go to your offsetY smoothly
  // - .staticScrollTo(y) // go to your offsetY without animation
  // - .destroy() // kaput, au revoir, kthxbye
  
  // ## CSS
  // Include this part in your stylesheet
  // `
  // .supah-scroll {
  //   position: fixed;
  //   z-index: 1;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: auto;
  //   will-change: transform;
  //   overflow: hidden;
  // }
  // `
  

class SupahScroll {
  constructor(options) {
    this.opt = options || {};
    this.el = this.opt.el ? this.opt.el : ".supah-scroll";
    this.speed = this.opt.speed ? this.opt.speed : 0.1;
    this.init();
  }

  init() {
    this.scrollY = 0;
    this.supahScroll = document.querySelectorAll(this.el)[0];
    this.supahScroll.classList.add("supah-scroll");
    this.events();
    this.update();
    this.animate();
  }

  update() {
    if (this.supahScroll === null) return;
    document.body.style.height = `${
      this.supahScroll.getBoundingClientRect().height
    }px`;
  }

  pause() {
    document.body.style.overflow = "hidden";
    cancelAnimationFrame(this.raf);
  }

  play() {
    document.body.style.overflow = "inherit";
    this.raf = requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {
    this.supahScroll.classList.remove("supah-scroll");
    this.supahScroll.style.transform = "none";
    document.body.style.overflow = "inherit";
    window.removeEventListener("resize", this.update);
    cancelAnimationFrame(this.raf);
    delete this.supahScroll;
  }

  animate() {
    this.scrollY += (window.scrollY - this.scrollY) * this.speed;
    this.supahScroll.style.transform = `translate3d(0,${-this.scrollY}px,0)`;
    this.raf = requestAnimationFrame(this.animate.bind(this));
  }

  scrollTo(y) {
    window.scrollTo(0, y);
  }

  staticScrollTo(y) {
    cancelAnimationFrame(this.raf);
    this.scrollY = y;
    window.scrollTo(0, y);
    this.supahScroll.style.transform = `translate3d(0,${-y}px,0)`;
    this.play();
  }

  events() {
    window.addEventListener("load", this.update.bind(this));
    window.addEventListener("resize", this.update.bind(this));
  }
}

/*------------------------------
Initialize
------------------------------*/
const supahscroll = new SupahScroll({
  el: "main",
  speed: 0.1
});
