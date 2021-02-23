const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.90 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 2 });
tl.fromTo(".hometext", { opacity: 0 }, { opacity: 1, duration: 2 }, '-=1');
tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 3 }, '-=1');

//subscribe 
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
