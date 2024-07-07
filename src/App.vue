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
  font-family: 'Arial', sans-serif;
  margin: 20px;
}

nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.nav-link {
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  background-color: #f2f2f2;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.router-link-exact-active {
  background-color: #66afe9;
  color: white;
}

.router-link-exact-active:hover {
  background-color: #4c90cd;
}
</style>
