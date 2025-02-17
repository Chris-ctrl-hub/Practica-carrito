const checkLogin = () => localStorage.getItem("jwt");

window.onload = () => {
	const isLoggedIn = checkLogin()
	if (isLoggedIn) {
	} else {
		window.location.href = "/panel.usuario.html";
	}

	function toggleElement() {
        const elemento = document.getElementById("absolute");
        const displayStyle = window.getComputedStyle(elemento).display;
    
        if (displayStyle === "none") {
            elemento.style.display = "block";
        } else {
            elemento.style.display = "none";
        }
    }

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

    const getCart = async () => {
      const response = await fetch(`/cart/${localStorage.getItem("userId")}`)
      const cart = await response.json()
      const totalPriceElement = document.getElementById("total_Price");
      totalPriceElement.innerHTML = `${cart.totalPrice}$`
      const itemsArray = cart.item
      const template = item =>
        `<div id="container_content">
          <img src="${item.product_image}" alt="">
          <div>
            <p>${item.product_name}</p>
            <p>${item.product_price}$</p>
          </div>
          <div class="cart_buttons">
            <button data-id="remove${item._id}">-</button>
            <p id="product_quantity">${item.quantity}</p>
            <button data-id="add${item._id}">+</button>
          </div>
        </div>`
      const items = document.getElementById('cart_container')
      items.innerHTML = itemsArray.map(item => template(item)).join('');
      itemsArray.forEach(async item => {
        if (item.quantity <= 0) {
            const responseCart = await fetch(`/cart/${item._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt"),
            }});
            getCart()
        }

          cartNode = document.querySelector(`[data-id="remove${item._id}"]`);
          cartNode.onclick = async e => {
                const responseCart = await fetch(`/cart/${item._id}`, {
                method: "PUT",
                body: JSON.stringify({
                    "quantity": item.quantity - 1,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("jwt"),
                }
            });
            getCart()    
          }
          cartNode = document.querySelector(`[data-id="add${item._id}"]`);
          cartNode.onclick = async e => {
            if (item.quantity < 9) {
              const responseCart = await fetch(`/cart/${item._id}`, {
                method: "PUT",
                body: JSON.stringify({
                    "quantity": item.quantity + 1,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("jwt"),
                }
            });
            }
            getCart()    
          }     
         
      })
  }
    OrderNode = document.getElementById("Order_generate");
    OrderNode.onclick = async e => {
    const response = await fetch(`/cart/${localStorage.getItem("userId")}`)
    const cart = await response.json()
    const totalPriceElement = document.getElementById("order_price");
    totalPriceElement.innerHTML = `Total:${cart.totalPrice}$`
    const itemsArray = cart.item

    const template = item =>  
        `<div class="popup_Content">
            <img src="${item.product_image}" alt="">
            <div>
                <p>${item.product_name}</p>
                <p>cantidad:${item.quantity}</p>
            </div>
            <p>${item.product_price}$</p>
        </div>`

    const items = document.getElementById('popup_container')
    items.innerHTML = itemsArray.map(item => template(item)).join('');

    popup.classList.toggle('hidden');
    e.stopPropagation(); 

    popup.onclick = async function(e) {
        e.stopPropagation();
    };


    document.addEventListener('click', function(event) {
        if (!popup.classList.contains('hidden')) {
            popup.classList.add('hidden');
        }
    });

    const add_order = document.getElementById('add_order');
    add_order.onclick = async function(e) {
        add_order.disabled = true;
                await fetch('/Order', {
                    method: 'POST',
                    body: JSON.stringify({
                        "user_id": localStorage.getItem("userId"),
                        "body": itemsArray,
                        "total_cost": cart.totalPrice,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem("jwt"),
                    }
                }); 

                await fetch(`/cart/user/${localStorage.getItem("userId")}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem("jwt"),
                    }
                }); 
            add_order.disabled = false;
            window.location.href = "/index.html";        
    };

}
    getCart()
    gotoCart()
    logOut()
    gotoUser()
}

    