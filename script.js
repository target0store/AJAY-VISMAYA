const q=s=>document.querySelector(s);
window.addEventListener("load",()=>setTimeout(()=>{q("#preloader").style.opacity=0;setTimeout(()=>q("#preloader").remove(),900);document.querySelectorAll(".reveal").forEach((e,i)=>setTimeout(()=>e.classList.add("show"),200+i*80))},700));

/* falling petals */
const petals=q("#petals");
for(let i=0;i<28;i++){let p=document.createElement("span");p.className="petal";p.textContent=["✦","❀","♥","·"][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+"%";p.style.fontSize=(8+Math.random()*18)+"px";p.style.animationDuration=(8+Math.random()*12)+"s";p.style.animationDelay=(-Math.random()*15)+"s";p.style.setProperty("--drift",(Math.random()*180-90)+"px");petals.appendChild(p)}

/* subtle star field */
const c=q("#stars"),x=c.getContext("2d");let s=[];
function resize(){c.width=innerWidth;c.height=innerHeight;s=Array.from({length:110},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4,a:Math.random()}))}
function stars(){x.clearRect(0,0,c.width,c.height);s.forEach(a=>{a.a+=.01;x.globalAlpha=.08+Math.sin(a.a)*.07;x.fillStyle="#e6c8aa";x.beginPath();x.arc(a.x,a.y,a.r,0,7);x.fill()});requestAnimationFrame(stars)}resize();stars();addEventListener("resize",resize);

/* tilt cards */
document.querySelectorAll(".tilt").forEach(el=>el.addEventListener("pointermove",e=>{let r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${py*-5}deg) rotateY(${px*6}deg) translateZ(8px)`}));
document.querySelectorAll(".tilt").forEach(el=>el.addEventListener("pointerleave",()=>el.style.transform=""));

/* countdown */
const target=new Date("2026-10-25T09:00:00+05:30");
function tick(){let n=Math.max(0,target-new Date()),d=Math.floor(n/864e5),h=Math.floor(n/36e5)%24,m=Math.floor(n/6e4)%60,s=Math.floor(n/1e3)%60;q("#days").textContent=String(d).padStart(3,"0");q("#hours").textContent=String(h).padStart(2,"0");q("#minutes").textContent=String(m).padStart(2,"0");q("#seconds").textContent=String(s).padStart(2,"0")}tick();setInterval(tick,1000);

/* music button: lightweight ambient tone */
let ac=null,osc=null,gain=null,playing=false;
q("#musicBtn").onclick=()=>{if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();osc=ac.createOscillator();gain=ac.createGain();osc.type="sine";osc.frequency.value=196;gain.gain.value=.012;osc.connect(gain);gain.connect(ac.destination);osc.start();playing=true}else{playing=!playing;gain.gain.value=playing?.012:0}q("#musicBtn").innerHTML=playing?"Ⅱ <span>PAUSE MUSIC</span>":"♫ <span>PLAY MUSIC</span>"};
