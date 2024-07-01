<main>
	<nav>
		<a href="/">Home</a>

		<span class="separator"></span>

		<a href="/new">Add Video</a>
	</nav>

	<section>
		<slot></slot>
	</section>
</main>

<style>
	nav {
		padding: 5px 15px;

		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

		display: flex;

		& a {
			text-decoration: none;
			color: #000;
			font-weight: bold;
		}

		& a:hover {
			color: #333;
			text-decoration: underline;
		}

		& .separator {
			flex-grow: 1;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		gap: var(--gap-size);

		flex-grow: 0;
		flex-shrink: 1;

		height: 100vh;
		box-sizing: border-box;
		padding: var(--gap-size);

		overflow: hidden;
	}

	section {
		min-height: 0;
		min-width: 0;

		display: grid;

		flex-grow: 0;
		flex-shrink: 1;
	}
</style>
