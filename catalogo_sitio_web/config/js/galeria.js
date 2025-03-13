const fullImgBox = document.getElementById("fullImgBox");
fullImg = document.getElementById("fulImg");

function closeImg(){
    fullImgBox.style.display = "none";
}

function openFullImg(reference){
    fullImgBox.style.display = "flex";
    fullImg.src = reference;
}