<template>
  <div class="product-list">
    <!-- Lista de productos -->
    <ProductCard
      v-for="(product) in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  components: {
    ProductCard
  },
  props: {
    products: Array
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
