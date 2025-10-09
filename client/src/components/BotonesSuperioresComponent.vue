<template>
    <div id="botones-flex">
        <span id="elemento-conectados"><img id="conectados-icono" src="../assets/img/conectados-icono.png"> <span id="conectados">{{ conectados }}</span></span>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";

    let conectados = ref(0)

    async function obtenerConectados() {
        await fetch(`http://localhost:7500/api/v1/conectado`)
            .then(res => res.json())
            .then(data => conectados.value = data.length)
    }

    onMounted(() => {
        obtenerConectados()
        setInterval(obtenerConectados, 5000)
    })
</script>

<style scoped>
    #botones-flex {
        display: flex;
        justify-content: center;
        gap: 1rem;
        border: var(--border-1);
        background-color: white;
        width: fit-content;
    }
    
    #elemento-conectados {
        display: flex;
        align-items: center;
        padding: .5rem;
        gap: .5rem;
    }

    #conectados-icono {
        width: 20px;
    }
</style>