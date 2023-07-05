window.onclick = (event) => {
    if (!event.target.matches('.user-dropdown') &&
        !event.target.matches('.profile') &&
        !event.target.matches('.active-menu') &&
        !event.target.matches('.dd-li') &&
        !event.target.matches('.welcome')
    ) {
        var dropdowns = document.getElementsByClassName("menu");
        var angle = document.getElementsByClassName("angle");
        if (dropdowns[0] && angle && dropdowns[0].classList.contains('active-menu')) {
            dropdowns[0].classList.remove('active-menu');
            angle[0].classList.remove('rotate');
        }
    }
}