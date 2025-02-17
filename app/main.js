window.onload = () => {
    const banners = [
        "/images/banner-1.webp",
        "/images/banner-2.webp",
        "/images/banner-3.webp",
        "/images/banner-4.webp"
    ];

    let contador = 1;
    const bannerElement = document.getElementById("banner");

    bannerElement.style.transition = "opacity 1s ease-in-out";

    function BannerRotation() {
        bannerElement.style.opacity = 0;

        setTimeout(() => {
            bannerElement.src = banners[contador];
            contador = (contador + 1) % banners.length;
            bannerElement.style.opacity = 1;
        }, 750);
    }

    BannerRotation();
    setInterval(BannerRotation, 3000);

    function toggleElement() {
        const elemento = document.getElementById("absolute");
        const displayStyle = window.getComputedStyle(elemento).display;
    
        if (displayStyle === "none") {
            elemento.style.display = "block";
        } else {
            elemento.style.display = "none";
        }
    }

    const checkLogin = () => localStorage.getItem("jwt");
	const isLoggedIn = checkLogin()

    const gotoCart = () => {
		const gotoCartElement = document.getElementById("cart");
		gotoCartElement.onclick = (e) => {
			e.preventDefault();
			const isLoggedIn = true;
			if (isLoggedIn) {
				window.location.href = "/carrito.html";
			} else {
					window.location.href = "/panel.usuario.html";
			}
			}
		}

    const gotoUser = () => {
        const gotoUser = document.getElementById("usuario")
        gotoUser.onclick = (e) => {
            e.preventDefault()
            if (isLoggedIn) {
                toggleElement()
            } else {
                window.location.href = "/panel.usuario.html";
            }
        }
    }

    const logOut= () => {
        const logOut = document.getElementById("logOut")
        logOut.onclick = (e) => {
            e.preventDefault()
            localStorage.clear();
            window.location.href = "/panel.usuario.html";
        }
    }

    const getProducts = async () => {
        const response = await fetch('/product')
        const product = await response.json()
        const template = product => `
            <div>
            <img class="product" data-id="${product._id}" src="${product.image}" alt="">
            <p>${product.name}</p>
            <p>${product.price}$</p>
            </div>
        ` 
        const productList = document.getElementById('product-container')
        productList.innerHTML = product.map(product => template(product)).join('')
        product.forEach(product => {
            productNode = document.querySelector(`[data-id="${product._id}"]`);
            productNode.onclick = async e => {
                const responseProduct = await fetch(`/product/${product._id}`);
                const selectedProduct = await responseProduct.json();
                console.log(selectedProduct)
                const template = selectedProduct => `
			        <img src="${selectedProduct.image}" alt="">
                    <div>
                        <img class="logo" src="/images/cala logo.png" alt="logo">
                        <p>${selectedProduct.name}</p>
                    <p>${selectedProduct.price}$</p>
                    <button id="add">Añadir al carrito</button>
                    </div>
		        `

                const popup = document.getElementById('popup');
                popup.innerHTML = template((selectedProduct))
                popup.classList.toggle('hidden');
                e.stopPropagation(); 
            
                popup.onclick = async function(e) {
                    e.stopPropagation();
                };

                const add = document.getElementById('add');
                add.onclick = async function(e) {
                    add.disabled = true;
                    const responseCart = await fetch(`/cart/${localStorage.getItem("userId")}/${product._id}`);
                    const cartProduct = await responseCart.json();
                        if(cartProduct && cartProduct.message === "No hay articulos"){
                            const response = await fetch('/cart', {
                                method: 'POST',
                                body: JSON.stringify({
                                    "user_id": localStorage.getItem("userId"),
                                    "product_id": `${selectedProduct._id}`,
                                    "product_price": `${selectedProduct.price}`,
                                    "product_image": `${selectedProduct.image}`,
                                    "product_name": `${selectedProduct.name}`,
                                    "quantity": 1
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem("jwt"),
                                }
                            }); 
                        }
                        add.disabled = false;        
                };
            
                document.addEventListener('click', function(event) {
                    if (!popup.classList.contains('hidden')) {
                        popup.classList.add('hidden');
                    }
                });
            
            }
        })
    }

    logOut()
    gotoUser()
    gotoCart()
    getProducts()
}





