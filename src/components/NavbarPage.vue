<template>
  <nav class="navbar">
    <img
      src="@/assets/images/stoky-logo-black.png"
      alt="Stoky logo"
      class="logo"
    />
    <div class="search-container">
      <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
      <input type="text" placeholder="Buscar..." v-model="searchQuery" />
      <button @click="buscarProducto">Buscar</button>
    </div>

    <div class="icons">
      <div class="cart-icon-wrapper" @click="toggleCart">
        <i style="font-size: 23px; margin-right: 10px"><span class="fa fa-ship"></span></i>
        <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
      </div>
      
      <!-- Mostrar el carrito al hacer clic en el ícono -->
      <ShoppingCart v-if="showCart" />

      <i class="fa fa-user-circle" style="font-size: 23px;"></i>
    </div>
  </nav>
</template>

<script>
import ShoppingCart from "@/components/ShoppingCart.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    ShoppingCart,
  },
  computed: {
    ...mapGetters(['cartTotalItems']),

    totalItems() {
      return this.cartTotalItems;
    }
  },
  data() {
    return {
      searchQuery: "",
      showCart: false,
    };
  },
  methods: {
    buscarProducto() {
      this.$emit("search", this.searchQuery);
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo {
  width: 150px;
  margin-left: 60px;
}

.search-container {
  display: flex;
  width: 50%;
}

.search-container input {
  width: 100%;
  padding: 10px 50px 10px 40px;
  border: 1px solid #ccc;
  border-right: 1px solid #000000af;
  border-left: 1px solid #000000af;
  border-radius: 12px;
  color: #807f7f;
  font-size: 16px;
  outline: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.search-container button {
  margin-left: -91px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #adff00;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.search-container button:hover {
  background-color: #9ae900;
}

.icons {
  margin-right: 260px;
}

.icons i {
  cursor: pointer;
}

.cart-icon-wrapper {
  position: absolute;
  font-size: 23px;
  right: 300px;
  cursor: pointer;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -3px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

</style>
