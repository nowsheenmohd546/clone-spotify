let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let progress = 0;
let duration = 210;
let interval = null;

const tracks = [
  {title:'Side To Side',artist:'Ariana Grande',art:'🎵',color:'#b91d73'},
  {title:'Blinding Lights',artist:'The Weeknd',art:'🎸',color:'#e94560'},
  {title:'Jhol',artist:'Shubh',art:'🎵',color:'#4286f4'},
  {title:'Kesariya',artist:'Arijit Singh',art:'🧡',color:'#f7971e'},
  {title:'Tum Hi Ho',artist:'Arijit Singh',art:'🌹',color:'#1abc9c'},
  {title:'Ae Dil Hai Mushkil',artist:'Pritam',art:'❤️',color:'#8b0000'},
  {title:'Raataan Lambiyan',artist:'Jubin Nautiyal',art:'🌙',color:'#8360c3'},
  {title:'Espresso',artist:'Sabrina Carpenter',art:'☕',color:'#c07850'},
];
let idx = 0;

function playTrack(title, artist, art, color) {
  document.getElementById('mini-title').textContent = title;
  document.getElementById('mini-artist').textContent = artist;
  document.getElementById('mini-art').textContent = art;
  document.getElementById('mini-art').style.background = `linear-gradient(135deg,${color},#121212)`;
  document.getElementById('fp-title').textContent = title;
  document.getElementById('fp-artist').textContent = artist;
  document.getElementById('fp-art').textContent = art;
  document.getElementById('fp-art').style.background = `linear-gradient(135deg,${color}88,#121212)`;
  document.querySelector('.full-player').style.background =
    `linear-gradient(180deg,${color}99 0%,#121212 55%)`;
  progress = 0;
  duration = Math.floor(Math.random()*80)+170;
  isPlaying = false;
  togglePlay();
}

function togglePlay() {
  isPlaying = !isPlaying;
  // mini
  document.getElementById('mini-play-icon').style.display  = isPlaying?'none':'block';
  document.getElementById('mini-pause-icon').style.display = isPlaying?'block':'none';
  // full
  document.getElementById('fp-play-icon').style.display  = isPlaying?'none':'block';
  document.getElementById('fp-pause-icon').style.display = isPlaying?'block':'none';
  isPlaying ? startProgress() : stopProgress();
}

function startProgress() {
  stopProgress();
  interval = setInterval(()=>{
    progress++;
    if(progress>=duration){
      if(isRepeat){progress=0;}
      else{nextTrack();return;}
    }
    updateUI();
  },1000);
}

function stopProgress(){if(interval){clearInterval(interval);interval=null;}}

function updateUI(){
  const pct = duration>0?(progress/duration)*100:0;
  document.getElementById('fp-fill').style.width = pct+'%';
  document.getElementById('fp-dot').style.left   = pct+'%';
  document.getElementById('fp-cur').textContent  = fmt(progress);
  document.getElementById('fp-dur').textContent  = fmt(duration);
}

function fmt(s){return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}

function seekTo(e){
  const bar = document.getElementById('fp-progress-bar');
  const r = bar.getBoundingClientRect();
  progress = Math.floor(((e.clientX-r.left)/r.width)*duration);
  updateUI();
}

function nextTrack(){
  idx = isShuffle ? Math.floor(Math.random()*tracks.length) : (idx+1)%tracks.length;
  const t=tracks[idx]; playTrack(t.title,t.artist,t.art,t.color);
}
function prevTrack(){
  if(progress>3){progress=0;updateUI();return;}
  idx=(idx-1+tracks.length)%tracks.length;
  const t=tracks[idx]; playTrack(t.title,t.artist,t.art,t.color);
}

function toggleShuffle(){
  isShuffle=!isShuffle;
  document.getElementById('btn-shuffle').classList.toggle('active',isShuffle);
}
function toggleRepeat(){
  isRepeat=!isRepeat;
  document.getElementById('btn-repeat').classList.toggle('active',isRepeat);
}
function toggleHeart(){
  document.getElementById('fp-heart').classList.toggle('liked');
}

function expandPlayer(){document.querySelector('.full-player').classList.add('open');}
function collapsePlayer(){document.querySelector('.full-player').classList.remove('open');}

function setVolume(e){
  const t=document.getElementById('vol-track');
  const r=t.getBoundingClientRect();
  const pct=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));
  document.getElementById('vol-fill').style.width=pct+'%';
  document.getElementById('vol-dot').style.left=pct+'%';
}

function setPill(el){
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
}

function setNav(el){
  document.querySelectorAll('.bnav-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
}

function connectDevice(){console.log('Connect to device');}
function addToQueue(){console.log('Add to queue');}

document.addEventListener('DOMContentLoaded',()=>{updateUI();});