<template>
    <div id="inputs-flex">
        <input type="text" id="input-mensaje" />
        <button id="boton-envio"><img id="icono-envio" src="../assets/img/envio-icono.png"/></button>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import { onMounted } from 'vue'

    const props = defineProps({
        sala: String
    })
    
    onMounted(() => {
        const inputMensaje = document.getElementById("input-mensaje")
        const botonEnvio = document.getElementById("boton-envio")
        
        inputMensaje.addEventListener("keypress", (e) => {
            if (e.key == "Enter") mandarMensaje()
        })
    
        botonEnvio.addEventListener("click", (e) => {
            e.preventDefault()
            mandarMensaje()
        })

        async function mandarMensaje() {
            const mensaje = {
                usuario: "SISTEMA", // CAMBIAR POR EL SESSION DEL USUARIO O ALGO
                sala: props.sala,
                mensaje: inputMensaje.value
            }
    
            axios.post(`/api/v1/mensajes`, mensaje) // CAMBIAR LA URL POR LA DEL SERVIDOR

            inputMensaje.value = ""
        }
    })

</script>

<style scoped>
    #inputs-flex {
        display: flex;
        width: 100%;
        gap: 1rem;
    }

    #input-mensaje {
        border: var(--border-1);
        flex-grow: 1;
        font-size: 20px;
        padding: .5rem;
    }

    #boton-envio {
        background-color: var(--fondo-color-2);
        border: var(--border-1);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
    }

    #icono-envio {
        width: 40px;
    }
</style>