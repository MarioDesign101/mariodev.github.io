document.addEventListener('DOMContentLoaded', function()
{
    let btns = document.querySelectorAll('.btn-cv');
    btns.forEach(function(btn){
        const spans = [];
        for (let i=0;i<40;i++){
            let span = document.createElement('span');
            span.style.top = `${i * 2}px`;
            spans.push(span);
            btn.appendChild(span);
            let randomDelay = (Math.random() * 0.75) + 0;
            span.style.transitionDelay = randomDelay + 's';
        }
    })
})



