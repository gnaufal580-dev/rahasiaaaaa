const openBtn=document.getElementById("openBtn");
const envelope=document.getElementById("envelope");
const cover=document.getElementById("cover");
const invite=document.getElementById("invite");
const music=document.getElementById("music");
const musicBtn=document.getElementById("musicBtn");
let opened=false;

for(let i=0;i<34;i++){
  const s=document.createElement("span");s.className="star";s.textContent=Math.random()>.5?"✦":"✧";
  s.style.left=Math.random()*100+"vw";s.style.top=Math.random()*100+"vh";
  s.style.fontSize=(7+Math.random()*10)+"px";s.style.setProperty("--speed",(2+Math.random()*4)+"s");
  s.style.setProperty("--delay",(-Math.random()*5)+"s");document.querySelector(".stars").appendChild(s);
}
openBtn.addEventListener("click",()=>{
  if(opened)return;opened=true;envelope.classList.add("open");openBtn.disabled=true;
  openBtn.textContent="MEMBUKA UNDANGAN...";
  setTimeout(()=>{
    cover.classList.add("hidden");invite.classList.remove("hidden");musicBtn.classList.remove("hidden");
    document.body.style.background="#f3e9dc";
    document.querySelectorAll(".reveal").forEach((el,i)=>setTimeout(()=>el.classList.add("show"),180*i));
    window.scrollTo({top:0,behavior:"instant"});
    music.play().then(()=>musicState(true)).catch(()=>musicState(false));
  },1150);
});
function musicState(on){musicBtn.classList.toggle("playing",on);musicBtn.querySelector("span").textContent=on?"MUSIC ON":"MUSIC OFF";}
musicBtn.addEventListener("click",async()=>{
  if(music.paused){try{await music.play();musicState(true)}catch{musicState(false);alert("Masukkan file assets/music.mp3 terlebih dahulu.")}}
  else{music.pause();musicState(false)}
});
const target=new Date("2026-11-14T13:00:00+07:00").getTime();
function countdown(){
  let t=Math.max(0,target-Date.now());
  const values=[Math.floor(t/86400000),Math.floor(t%86400000/3600000),Math.floor(t%3600000/60000),Math.floor(t%60000/1000)];
  ["days","hours","minutes","seconds"].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,"0"));
}
countdown();setInterval(countdown,1000);
