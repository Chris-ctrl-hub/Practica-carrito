	
const checkLogin = () => localStorage.getItem("jwt");

const loadRegisterTemplate = () => {
	const template = `
			<div class= inicio>
            <img src="images/cala logo.png" alt="">
			<p>Registro</p>
			<form id="register-form">
				<div>
					<input type="email" name="email" placeholder="email" />
				</div>
				<div>
					<input type="password" name="password" placeholder="constraseña" />
				</div>
                <a class="enviar" href="#" id="login">Iniciar sesión</a>
			    <div id="error"></div>
				<button type="submit">Enviar</button>
			</form>
		</div>
		`
		const body = document.getElementsByTagName("body")[0]
		body.innerHTML = template
}

const addRegisterListener = () => {
	const registerForm = document.getElementById("register-form")
	registerForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(registerForm)
		const data = Object.fromEntries(formData.entries())

		const response = await fetch('/register', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			}
		});
		const responseData = await response.json()
		if (response.status >= 300) {
			const errorNode = document.getElementById("error")
		} else {
            localStorage.setItem("jwt", `Bearer ${responseData.token}`);
            localStorage.setItem("userId", responseData.userId); 
            window.location.href = "/index.html";
		}
	}
}

const gotoLoginListener = () => {
	const gotoLogin = document.getElementById("login")
	gotoLogin.onclick = (e) => {
		e.preventDefault()
		loginPage()
		gotoregisterListener()
	}
}

const registerPage = () => {
	console.log("pagina de registro")
	loadRegisterTemplate()
	addRegisterListener()
  	gotoLoginListener()
}	

const loginPage = () => {
	loadLogintemplate()
	addLoginListener()
}

	

const loadLogintemplate = () => {
		const template = `
			<div class= inicio>
            <img src="images/cala logo.png" alt="">
			<p>Login</p>
			<form id="login-form">
				<div>
					<input type="email" name="email" placeholder="email" />
				</div>
				<div>
					<input type="password" name="password" placeholder="constraseña" />
				</div>
                <a href="#" id="register">Registrate</a>
				<div id="error"></div>
				<button type="submit">Enviar</button>
			</form>
		</div>
		`
		const body = document.getElementsByTagName("body")[0]
		body.innerHTML = template
}

const gotoregisterListener = () => {
	const gotoRegister = document.getElementById("register")
	gotoRegister.onclick = (e) => {
		e.preventDefault()
		registerPage()
	}
}

const addLoginListener = () => {
	const loginform = document.getElementById("login-form")
	loginform.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(loginform)
		const data = Object.fromEntries(formData.entries())

		const response = await fetch('/login', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			}
		});
		const responseData = await response.json()
		if (response.status >= 300) {
			const errorNode = document.getElementById("error")
			errorNode.innerHTML = responseData
		} else {
			localStorage.setItem("jwt", `Bearer ${responseData.token}`);
			localStorage.setItem("userId", responseData.userId);
			window.location.href = "/index.html";
		}
	}
}

window.onload = () => {
	const isLoggedIn = checkLogin()
	if (isLoggedIn) {
	} else {
		loginPage()
		gotoregisterListener()
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

	gotoCart()
    logOut()
    gotoUser()
}


