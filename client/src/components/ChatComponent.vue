<template>
	<div id="chat">

	</div>
</template>

<script setup>
import axios from 'axios'

let historial = []
setInterval(() => {
	let url = 'http://localhost:7500/api/v1/mensajes'
	if (historial.length > 0) {
		const ultimoMensaje = historial.reduce((a, b) => 
			new Date(a.mandado_en) > new Date(b.mandado_en) ? a : b
		).mandado_en
		const fechaSQL = new Date(ultimoMensaje)
			.toLocaleString('sv-SE', { hour12: false })
		url += `?ultimo_timestamp=${encodeURIComponent(fechaSQL)}`
	}
	
	axios.get(url)
		.then(res => {
			res.data.forEach(e => {
				historial.push(e)
				const fechaFormateada = new Date(e.mandado_en)
				const fecha = `${fechaFormateada.getDate().toString().padStart(2, "0")}/${(fechaFormateada.getMonth()+1).toString().padStart(2, "0")}/${fechaFormateada.getFullYear().toString().padStart(2, "0")} ${fechaFormateada.getHours().toString().padStart(2, "0")}:${fechaFormateada.getMinutes().toString().padStart(2, "0")}`
				document.getElementById("chat").innerHTML += `<span class="mensaje-chat"><span class="fecha-mensaje">${fecha}</span><span class="mensaje">${e.nombre}: ${e.mensaje}</span></span>`
			});
		})
		.catch(err => {
			console.error(err)
		})
}, 1000)
</script>

<style scoped>	
	#chat {
		padding: .3rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		overflow-y: auto;  /* scroll vertical */
		height: 100%;      /* ocupa todo el contenedor pero respeta padding */
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