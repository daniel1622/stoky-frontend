<template>
  <div class="sr-shopping-cart">
    <h3>Productos en el contenedor</h3>

    <div class="sr-cart-products">
      <!-- Iterar sobre los productos en el carrito -->
      <div v-for="product in cart" :key="product.id" class="sr-product-card">
        <!-- Imagen del producto -->
        <img :src="product.image" alt="Imagen del producto" class="sr-product-image" />

        <!-- Información del producto -->
        <div class="sr-product-info">
          <h4 class="sr-product-title">{{ product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title }}</h4>
          <p class="sr-product-price">${{ formatPrice(product.price * product.quantity) }} USD</p>
          <p class="sr-product-price-cop">${{ formatCOP(product.price * product.quantity) }} COP</p>
          <!-- <p class="sr-product-id">{{ product.id }}</p> -->

          <!-- Selector de cantidad -->
          <div class="sr-quantity-selector">
            <button @click="decreaseQuantity(product)" class="sr-quantity-button" style="border-radius: 5px 0 0 5px">-</button>
            <input type="number" v-model="product.quantity" min="1" class="sr-quantity-input" @input="updateQuantity(product)" />
            <button @click="increaseQuantity(product)" class="sr-quantity-button" style="border-radius: 0 5px 5px 0">+</button>
          </div>
        </div>

        <i class="fa fa-ellipsis-v product-options"></i>
      </div>
    </div>

    <!-- Botón para ir al contenedor -->
    <button class="sr-go-to-container" @click="goToSummary">
      Ir al contenedor <i class="fa fa-ship"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cart']),
  },
  methods: {
    ...mapActions(['updateQuantity', 'removeFromCart']),
    formatPrice(value) {
      return value.toFixed(2);
    },
    formatCOP(value) {
      const conversionRate = 4220; // Tasa de conversión USD a COP
      return (value * conversionRate).toLocaleString('es-CO');
    },
    increaseQuantity(product) {
      product.quantity++;
      this.updateQuantity({ productId: product.id, quantity: product.quantity });
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity--;
        this.updateQuantity({ productId: product.id, quantity: product.quantity });
      }
    },
    goToSummary() {
      this.$router.push('/summary-cart');
    }
  },
};
</script>

<style scoped>
/* Contenedor flotante del carrito */
.sr-shopping-cart {
  position: absolute;
  top: 50px;
  right: 300px;
  width: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
}

/* Título del carrito */
h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

/* Contenedor de productos con scroll */
.sr-cart-products {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
}

/* Card de cada producto */
.sr-product-card {
  display: flex;
  justify-content: space-between; 
  align-items: left;
  background-color: #fff;
  padding: 5px;
  border-radius: 12px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  gap: 10px;
  position: relative;
  width: 87%;
  margin-left: 10px;
  border-left: 15px solid rgb(163, 163, 163);
}

/* Imagen del producto */
.sr-product-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

/* Información del producto */
.sr-product-info {
  flex: 1;
}

.sr-product-title {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sr-product-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  color: #333;
}

.sr-product-price-cop {
  font-size: 13px;
  color: #666;
}

.sr-product-id {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

/* Selector de cantidad */
.sr-quantity-selector {
  display: flex;
  align-items: left;
}

.sr-quantity-button {
  width: 37px;
  background-color: #adff00;
  border: none;
  padding: 8px 10px;
  cursor: pointer;
  border: 1px solid #adff00;
}

.sr-quantity-input {
  width: 50px;
  text-align: center;
  border: 1px solid #adff00;
  padding: 8px 10px;
  margin: 0;
}

/* Ícono de opciones (tres puntos verticales) */
.sr-product-options {
  font-size: 18px;
  color: #999;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Botón "Ir al contenedor" */
.sr-go-to-container {
  background-color: #adff00;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  width: 50%;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: 10px;
}

.sr-go-to-container i {
  margin-left: 5px;
}
</style>
