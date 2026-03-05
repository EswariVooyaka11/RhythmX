/* same JS logic from your code remains */

let users = JSON.parse(localStorage.getItem("users")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

function login(){

let u=username.value.trim();
let p=password.value.trim();

let user=users.find(x=>x.username==u && x.password==p);

if(user){
localStorage.setItem("loggedInUser",u);
loginOverlay.style.display="none";
renderWishlist();
}else{
msg.innerText="Invalid credentials";
}

}

function register(){

let u=username.value.trim();
let p=password.value.trim();

if(!u||!p)return;

if(users.find(x=>x.username==u)){
msg.innerText="User exists";
return;
}

users.push({username:u,password:p});

localStorage.setItem("users",JSON.stringify(users));

msg.innerText="Registered!";

}

window.onload=()=>{

if(localStorage.getItem("loggedInUser")){
loginOverlay.style.display="none";
renderWishlist();
}

}

function logout(){
localStorage.removeItem("loggedInUser");
location.reload();
}

function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

const songsData={

rahman:[
{name:"Jai Ho",file:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},
{name:"Kun Faya Kun",file:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"}
],

karthik:[
{name:"Usure Pogudhey",file:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"}
],

shreya:[
{name:"Teri Ore",file:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"}
]

};

function showSongs(artist){

songsContainer.innerHTML="";

songsData[artist].forEach((song,i)=>{

let user=localStorage.getItem("loggedInUser");

let isAdded=wishlist[user]?.includes(song.name);

songsContainer.innerHTML+=`

<div class="song">

<span>${song.name}</span>

<div>

<button onclick="togglePlay('${artist+i}',this)">
Play
</button>

<button onclick="toggleWishlist('${song.name}')">

${isAdded?"💔 Remove":"❤️ Add"}

</button>

</div>

</div>

<audio id="${artist+i}" src="${song.file}"></audio>

`;

});

}

function togglePlay(id,btn){

let audio=document.getElementById(id);

if(audio.paused){
audio.play();
btn.innerText="Pause";
}else{
audio.pause();
btn.innerText="Play";
}

}

function toggleWishlist(song){

let user=localStorage.getItem("loggedInUser");

if(!user)return alert("Login first");

if(!wishlist[user])wishlist[user]=[];

let index=wishlist[user].indexOf(song);

if(index>-1){
wishlist[user].splice(index,1);
}else{
wishlist[user].push(song);
}

localStorage.setItem("wishlist",JSON.stringify(wishlist));

renderWishlist();

}

function renderWishlist(){

let currentUser = localStorage.getItem("loggedInUser");

wishlistContainer.innerHTML="";

if(!currentUser || !wishlist[currentUser]){
wishlistContainer.innerHTML="<p>No songs added yet.</p>";
return;
}

wishlist[currentUser].forEach(song=>{
wishlistContainer.innerHTML+=`<div>${song}</div>`;
});

}