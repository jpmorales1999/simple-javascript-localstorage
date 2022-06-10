/* Select Form */
document.getElementById('form-shop').addEventListener('submit', saveShop)

function saveShop(e) {
    e.preventDefault()

    /* Select Inputs Form */
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value

    /* Object for Data */
    const shopData = {
        title,
        description
    }

    if (localStorage.getItem('shops') === null) {
        let shopsArray = []
        /* Added ShopData */
        shopsArray.push(shopData)
        /* Convert JSON Javascript To Json String */
        localStorage.setItem('shops', JSON.stringify(shopsArray))
        getShops()
    } else {
        /* Get Shops of the LocalStorage and Convert to Json Javascript (Object) */ 
        let shopsStorage = JSON.parse(localStorage.getItem('shops'))
        /* Added ShopData */
        shopsStorage.push(shopData)
        /* Save to Storage */
        localStorage.setItem('shops', JSON.stringify(shopsStorage))
        getShops()
    }

    /* Reset Form */
    document.getElementById('form-shop').reset()
}

function getShops () {
    /* Get Data of the Storage */
    const shopsStorage = JSON.parse(localStorage.getItem('shops'))

    /* Select Element HTML with id Shops */
    let shopsView = document.getElementById('shops')

    shopsView.innerHTML = ''

    /* Loop For Alls Shops of the Storage */
    for (let i = 0; i < shopsStorage.length; i++) {
        /* Get title and Description of the Loop */ 
        let title = shopsStorage[i].title
        let description = shopsStorage[i].description
        
        /* Acumulado de Shops */
        shopsView.innerHTML += `
            <div class='card mb-3'>
                <div class='card-body'>
                    <p>${title} - ${description}</p>
                    <a class='btn btn-danger' onclick="deleteShop('${title}')">Delete</a>
                </div>
            </div>
        `
    }
}

function deleteShop(title) {
     /* Get Data of the Storage */
     const shopsStorage = JSON.parse(localStorage.getItem('shops'))

     for (let i = 0; i < shopsStorage.length; i++) {
        if (shopsStorage[i].title === title) {
            shopsStorage.splice(i, 1)
        }
     }
     localStorage.setItem('shops', JSON.stringify(shopsStorage))
     getShops()
}

getShops()