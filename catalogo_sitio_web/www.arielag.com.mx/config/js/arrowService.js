function show() {
    const serviceItem = document.getElementsByClassName("service-item")[0];
    if(serviceItem.style.height == "330px") {
        serviceItem.style.height = "auto";
    } else {
        serviceItem.style.height = "330px";
    }
}