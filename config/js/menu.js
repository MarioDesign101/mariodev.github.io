const header = document.getElementById('header');
const toggle = document.getElementById('toggle');

document.onclick = function(e){
    if(e.target.id !== 'header' && e.target.id !== 'toggle'){
        toggle.classList.remove('activation');
    }
}


toggle.onclick = function(){
    toggle.classList.toggle('activation'); 
    document.querySelector('.menuIndex').classList.toggle('active');
}


