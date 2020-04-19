document.getElementById('logo').addEventListener('click', function(){
    document.getElementById('menu').classList.toggle('hide')
});

async function getAllCategories() {
    const result = await fetch('./data.json').then((data) => data.json()).catch((error) => console.log(error));
    let images = [];
    result.data.forEach((element) => {
        element.images.map((element, ind) => {
            const imgElement = document.createElement('IMG');
            imgElement.setAttribute('src', element);
            imgElement.setAttribute('alt', `img-${ind}`);
            images.push(imgElement);    
        });
    });
    return images;
}

getAllCategories().then((data) => {
    data.forEach((element) => {
        document.getElementById('grid').insertAdjacentElement('beforeend', element)
    }); 
});

async function getCategorie(categorie) {
    const result = await fetch('./data.json').then((data) => data.json()).catch((error) => console.log(error));
    const findCategorie = result.data.find((element) => element.categorie === categorie) 
    let images = [];
    findCategorie.images.map((element, ind) => {
        const imgElement = document.createElement('IMG');
        imgElement.setAttribute('src', element);
        imgElement.setAttribute('alt', `img-${ind}`);
        images.push(imgElement);    
    });
    return images;
}

document.getElementById('selectCategorie').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const categorie = event.target.dataset.categorie;
        let grid = document.getElementById('grid');
        if (categorie !== 'all') {
            getCategorie(event.target.dataset.categorie).then((data) => {
                [...grid.childNodes].forEach((element)=> {
                    grid.removeChild(element)
                });
                data.forEach((element) => {
                    document.getElementById('grid').insertAdjacentElement('beforeend', element)
                }); 
            });
        } else {
            [...grid.childNodes].forEach((element)=> {
                grid.removeChild(element)
            });
            getAllCategories().then((data) => {
                data.forEach((element) => {
                    document.getElementById('grid').insertAdjacentElement('beforeend', element)
                }); 
            });            
        }
    }
});

document.getElementById('showMore').addEventListener('click', function() {
    getAllCategories().then((data) => {
        data.forEach((element) => {
            document.getElementById('grid').insertAdjacentElement('beforeend', element)
        }); 
    });
});

document.getElementById('filterButton').addEventListener('click', function(event) {
    console.log(event.target.tagName);
    if(event.target.tagName === 'IMG') {
        console.log(event.target.dataset.filtertype)
        if (event.target.dataset.filtertype == 'list') {
            document.getElementById('grid').classList.toggle('filter-type--grid');
            document.getElementById('grid').classList.toggle('filter-type--list');
        } else {
            document.getElementById('grid').classList.toggle('filter-type--list');
            document.getElementById('grid').classList.toggle('filter-type--grid');
        }
    }
});