<template>
    <main>
        <nav id="botones-superiores-container">
            <BotonesSuperioresComponent />
        </nav>
        <section id="chat-container">
            <ChatComponent />
        </section>
        <aside id="salas-container">
            <!-- <SalasNavComponent /> -->
        </aside>
        <footer id="inputs-container">
            <InputsComponent />
        </footer>
    </main>
</template>

<script setup>
    import axios from "axios";
    import BotonesSuperioresComponent from "../components/BotonesSuperioresComponent.vue";
    import ChatComponent from "../components/ChatComponent.vue";
    import InputsComponent from "../components/InputsComponent.vue";

</script>

<style scoped>
    main > * {
        margin: 0.5rem;
    }

    main {
        display: grid;
        grid-template-areas: 
        "botones-superiores botones-superiores"
        "salas chat"
        "salas inputs";
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 15% 85%;
        padding: 1rem;
        width: 100vw;
        height: 100vh;
        background-color: var(--fondo-color-1);
    }

    #botones-superiores-container {
        grid-area: botones-superiores;
    }

    #chat-container {
        grid-area: chat;
        border: var(--border-1);
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        min-height: 0;
    }

    #salas-container {
        grid-area: salas;
        border: var(--border-1);
        background-color: white;
    }

    #inputs-container {
        grid-area: inputs;
    }
</style>
