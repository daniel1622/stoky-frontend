<template>
  <div class="product-search-results">
    <NavbarPage @search="onSearch" />
    <SearchHistory :lastSearches="lastSearches" />

    <div class="content">
      <SearchFilters />
      <ProductList :products="products" />
    </div>
  </div>
</template>

<script>
import NavbarPage from "@/components/NavbarPage.vue";
import SearchHistory from "@/components/SearchHistory.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import ProductList from "@/components/ProductList.vue";
import axios from 'axios';

export default {
  mounted() {
    console.log('Parámetro de búsqueda:', this.$route.query.q);
    this.fetchProducts();
  },
  components: {
    NavbarPage,
    SearchHistory,
    SearchFilters,
    ProductList
  },
  data() {
    return {
      lastSearches: ["comida para perros", "juguetes para perros", "cuidado para perros", "accesorios para perros", "entrenamiento para perros"],
      products: []
    };
  },
  methods: {   
    onSearch(query) {
      console.log("Buscando: " + query);
      // Aquí iría la llamada al backend para obtener los productos filtrados
    },
    async fetchProducts() {
      try {
        const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

        const response = await axios.get(`${apiBaseUrl}/api/products`);

        this.products = response.data;
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    },
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.content {
  display: flex;
  padding: 20px;
}

.filters {
  width: 20%;
}

.product-list {
  width: 80%;
}
</style>
