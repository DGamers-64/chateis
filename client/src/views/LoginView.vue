<template>
    <main>
        <h1>Login</h1>
        <input type="text" id="nombre-usuario"/>
        <input type="password" id="contrasena" />
        <button id="iniciar-sesion">Iniciar sesión</button>
        <router-link to="/" id="guest-link">Entrar como invitado</router-link>
        <span id="error"></span>
    </main>
</template>

<script setup>
    import { onMounted } from 'vue';
    import axios from 'axios';
    onMounted(() => {
        document.title = "Chateis - Login"
        const nombreUsuario = document.getElementById("nombre-usuario")
        const contrasena = document.getElementById("contrasena")
        const errorContainer = document.getElementById("error")
        const botonLogin = document.getElementById("iniciar-sesion")
        
        botonLogin.addEventListener("click", (e) => {
            e.preventDefault()
            iniciarSesion()
        })

        nombreUsuario.addEventListener("click", (e) => {
            if (e.key == "Enter") iniciarSesion()
        })

        contrasena.addEventListener("click", (e) => {
            if (e.key == "Enter") iniciarSesion()
        })

        async function iniciarSesion() {
            errorContainer.innerHTML = ""
            errorContainer.style.display = "none"
            
            if (nombreUsuario.value == "" || contrasena.value == "") {
                errorContainer.innerHTML = "Por favor introduce un usuario y una contraseña"
                errorContainer.style.display = "block"
            }

            axios.post("/api/v1/login", {
                usuario: nombreUsuario.value,
                password: contrasena.value
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                .then(res => {
                    if (!res.data.ok) {
                        nombreUsuario.value = ""
                        contrasena.value = ""
                        errorContainer.style.display = "block"
                        errorContainer.innerHTML = res.data.error
                    }
                })
                .catch(e => {
                    errorContainer.value = "Error interno"
                    console.error(e)
                })
        }

    })

</script>

<style scoped>
    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--fondo-color-1);
    }

    h1 {
        font-size: 4em;
    }

    input {
        font-size: 1.5em;
        padding: .2rem;
    }

    button {
        font-size: 1.3em;
        padding: .2rem;
        cursor: pointer;
        background-color: white;
        border: var(--border-1);
    }

    button:hover {
        background-color: var(--hover-color-2);
    }

    #guest-link {
        color: black;
    }

    #guest-link:hover {
        color: var(--hover-color-1);
    }

    #error {
        display: none;
        border: 1px solid darkred;
        background-color: lightcoral;
        color: darkred;
        border-radius: 5px;
        padding: .5rem;
    }
</style>