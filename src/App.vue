<template>
	<div id="app">
		<Chat />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chat from "./components/Chat.vue";

export default defineComponent({
	components: {
		Chat,
	},
});
</script>
