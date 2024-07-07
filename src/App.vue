<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">Árfolyamok</router-link>
      <router-link to="/converter" class="nav-link">Valuta Váltó</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: 'Roboto', sans-serif;
  margin: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
  background-color: #4caf50;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  background-color: #66bb6a;
  border-radius: 5px;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.nav-link:hover {
  background-color: #81c784;
  transform: translateY(-2px);
}

.router-link-exact-active {
  background-color: #2e7d32;
  color: white;
}

.router-link-exact-active:hover {
  background-color: #1b5e20;
}
</style>
