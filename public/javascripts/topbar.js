function showMenu(){
    document.querySelector('.dropdown-toggle').addEventListener('click', function() {
        console.log("************************")
        console.log(this.dataset.toggle)
        document.querySelector('.dropdown-menu').style.display = this.dataset.toggle === 'true' ? 'block' : 'none';
        this.dataset.toggle = this.dataset.toggle === 'true' ? 'false' : 'true';
    });
}