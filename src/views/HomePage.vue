<template>
  <div class="home-container">
    <div class="logo-container">
      <img src="@/assets/images/stoky-logo.png" alt="Stoky logo" class="logo">
    </div>

    <div class="search-container">
      <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
      <input
        type="text"
        placeholder="Describe el producto que estás buscando..."
        v-model="searchQuery"
        class="search-input"
      />
      <button @click="buscarProducto" class="search-button">Buscar</button>
    </div>

    <div class="last-searches">
      <button v-for="(search, index) in lastSearches" :key="index" class="search-tag">
        {{ search }}
      </button>
    </div>

    <footer>
      <p>&copy; 2024</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      lastSearches: [
        "comida para perros",
        "juguetes para perros",
        "cuidado para perros",
        "accesorios para perros",
        "entrenamiento para perros",
      ],
    };
  },
  methods: {
    buscarProducto() {
      console.log(`Buscando: ${this.searchQuery}`);
      console.log(this.$router);
      if (this.searchQuery.trim() !== '') {
        this.$router.push({ name: 'ProductSearchResults', query: { q: this.searchQuery } });
      } else {
        console.log('La búsqueda está vacía.');
      }
    },
  },
};
</script>

<style src="../assets/styles/HomePage.css"></style>
