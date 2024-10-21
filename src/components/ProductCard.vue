<template>
  <div class="product-card" @click="goToProductDetail">
    <img :src="product.image" alt="Product image" class="product-image" />

    <h3 class="product-name">{{ product.title }}</h3>

    <div class="rating">
      <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= product.rating }">★</span>
    </div>

    <p class="price-usd">
      ${{ formatPrice(product.price) }} - ${{ formatPrice(product.price) }} USD
    </p>

    <p class="price-cop">
      ${{ formatPrice(product.price) }} - ${{ formatCOP(product.price) }} COP
    </p>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    formatPrice(value) {
      return value.toFixed(2); 
    },
    formatCOP(value) {
      const conversionRate = 4237;
      return (value * conversionRate).toFixed(0);
    },
    goToProductDetail() {
      this.$router.push({ name: 'ProductDetail', params: { id: this.product.id } });
    },
  }
};
</script>

<style src="../assets/styles/ProductCard.css"></style>
