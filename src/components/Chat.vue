<template>
	<div class="chat-container">
		<div class="users">
			<h3>Active Users: {{ activeUsers.length }}</h3>
		</div>
		<div class="messages">
			<div v-for="message in messages" :key="message.id">
				<strong>{{ message.user.username }}:</strong>
				{{ message.content }}
			</div>
		</div>
		<div class="input-section">
			<input
				v-model="content"
				placeholder="Type a message..."
				@keyup.enter="sendMessage"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import socket from "../socket";

export default defineComponent({
	setup() {
		const messages = ref<
			{ id: number; user: { username: string }; content: string }[]
		>([]);
		const activeUsers = ref<{ id: string; username: string }[]>([]);
		const content = ref("");
		const username = ref(prompt("Enter your username") || "Anonymous");

		onMounted(() => {
			// Listen for the message history event
			socket.on("history", (history) => {
				messages.value = history;
			});

			// Listen for new messages
			socket.on("message", (message) => {
				messages.value.push(message);
			});

			// Listen for active users
			socket.on("activeUsers", (users) => {
				activeUsers.value = users;
				console.log(users);
			});

			// Notify when user joins the chat
			socket.emit("message", {
				username: username.value,
				content: "joined the chat!",
			});
		});

		const sendMessage = () => {
			if (content.value.trim()) {
				socket.emit("message", {
					username: username.value,
					content: content.value,
				});
				content.value = "";
			}
		};

		return { messages, activeUsers, content, sendMessage };
	},
});
</script>

<style scoped>
.chat-container {
	display: flex;
	flex-direction: column;
	height: 80vh;
	border: 1px solid #ccc;
	padding: 10px;
}
.users {
	margin-bottom: 10px;
}
.messages {
	flex-grow: 1;
	overflow-y: auto;
}
.input-section {
	display: flex;
	padding: 10px;
}
input {
	flex-grow: 1;
	padding: 10px;
	font-size: 16px;
}
</style>
