import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
    importCosts: {
      freightCost: 361,
      maritimeCost: 72,
      documentationFees: 145,
      insurance: 18,
      demurrageFees: 72,
      landTransport: 54,
      handlingFees: 54,
      iva: 1941,
      duties: 2043,
      agencyFees: 291,
      stokyCommission: 728,
    },
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.cart.push({ ...product });
      }
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
  },
  getters: {
    cart: state => {
      return state.cart;
    },
    cartItemCount: state => state.cart.length,
    cartTotalPriceUSD: state =>
      state.cart.reduce((total, product) => total + product.price * product.quantity, 0),
    cartTotalPriceCOP: (state, getters) => {
      const conversionRate = 4220;
      return getters.cartTotalPriceUSD * conversionRate;
    },
    cartTotalItems: state => {
      return state.cart.reduce((total, product) => total + product.quantity, 0);
    },
    // Calcular el costo total de importación sumando los costos del state
    totalImportCost: state => {
      const { freightCost, maritimeCost, documentationFees, insurance, demurrageFees, landTransport, handlingFees, iva, duties, agencyFees, stokyCommission } = state.importCosts;
      return freightCost + maritimeCost + documentationFees + insurance + demurrageFees + landTransport + handlingFees + iva + duties + agencyFees + stokyCommission;
    },

    // Calcular el valor total de venta sumando el precio de cada producto multiplicado por su cantidad
    totalSalesValue: state => {
      return state.cart.reduce((total, product) => total + product.price * product.quantity, 0);
    },

    // Uso del contenedor: ejemplo simple basado en la cantidad de productos
    containerUsage: state => {
      const totalItems = state.cart.reduce((total, product) => total + product.quantity, 0);
      const containerCapacity = 5000; // Capacidad máxima del contenedor
      return ((totalItems / containerCapacity) * 100).toFixed(1); // Porcentaje del contenedor usado
    },

    // Tiempo estimado de importación en meses (se puede hacer más complejo si se requiere)
    estimatedTime: () => 6, // 6 meses como ejemplo

    // Costo total estimado (costo de importación + valor de los productos en el carrito)
    totalEstimatedCost: (state, getters) => {
      return getters.totalImportCost + getters.totalSalesValue;
    },
  },
});
