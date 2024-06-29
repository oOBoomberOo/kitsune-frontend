
<main>
	<nav>
		<a href="/">Home</a>
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

		& a {
			text-decoration: none;
			color: #000;
			font-weight: bold;
		}

		& a:hover {
			color: #333;
			text-decoration: underline;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 5px;
		
		flex-grow: 0;
		flex-shrink: 1;

		min-height: 0;
		min-width: 0;

		max-height: 100vh;

		padding: 5px 25px;
	}

	section {
		min-height: 0;
		min-width: 0;

		height: calc(100vh - 50px);

		flex-grow: 0;
		flex-shrink: 1;
	}
</style>