<template>
	<div id="chat">

	</div>
</template>

<script setup>
	import axios from 'axios'
import { onMounted } from 'vue'

	const props = defineProps({
		sala: String
	})

	let historial = []
	let scrollEstaAbajo = true

	onMounted(() => {
		const chatContainer = document.getElementById("chat")

		chatContainer.scrollTop = chatContainer.scrollHeight

		setInterval(() => {
			let url = `http://localhost:7500/api/v1/mensajes?sala=${props.sala}` // CAMBIAR POR LA URL DE LA PÁGINA
			if (historial.length > 0) {
				const ultimoMensaje = historial.reduce((a, b) => 
					new Date(a.mandado_en) > new Date(b.mandado_en) ? a : b
				).mandado_en
				const fechaSQL = new Date(ultimoMensaje)
					.toLocaleString('sv-SE', { hour12: false })
				url += `&ultimo_timestamp=${encodeURIComponent(fechaSQL)}`
			}
			
			axios.get(url)
				.then(res => {
					res.data.forEach(e => {
						historial.push(e)
						const fechaFormateada = new Date(e.mandado_en)
						const fecha = `${fechaFormateada.getDate().toString().padStart(2, "0")}/${(fechaFormateada.getMonth()+1).toString().padStart(2, "0")}/${fechaFormateada.getFullYear().toString().padStart(2, "0")} ${fechaFormateada.getHours().toString().padStart(2, "0")}:${fechaFormateada.getMinutes().toString().padStart(2, "0")}`
						chatContainer.innerHTML += `<span class="mensaje-chat"><span class="fecha-mensaje">${fecha}</span><span class="mensaje">${e.nombre}: ${e.mensaje}</span></span>`
						if (scrollEstaAbajo) chatContainer.scrollTop = chatContainer.scrollHeight
					});
				})
				.catch(err => {
					console.error(err)
				})
			
		}, 1000)

		setInterval(() => {
			if (scrollEstaAbajo) chatContainer.scrollTop = chatContainer.scrollHeight
		})

		chatContainer.addEventListener("scroll", () => {
			if (chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight - 1) {
				scrollEstaAbajo = true
			} else {
				scrollEstaAbajo = false
			}
		})
	})

</script>

<style scoped>	
	#chat {
		padding: .3rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		overflow-y: auto;
		height: 100%;
		box-sizing: border-box;
		flex: 1 1 0;
	}

	#chat :deep(.mensaje-chat) {
		display: flex;
		flex-direction: column;
	}

	#chat :deep(.fecha-mensaje) {
		color: gray;
		font-size: 0.7em;
	}
</style>