<template>
  <section class="App">

    <h1>Charge Hub - Coming Soon!</h1>

    <img
      class="App__image"
      alt="Charge Hub"
      src="./assets/onewheel.png">

  </section>
</template>

<style lang="scss">
body {
	margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__image {
    width: 50%;
  }
}
</style>
