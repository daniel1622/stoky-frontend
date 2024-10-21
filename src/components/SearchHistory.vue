<template>
  <div class="search-history">
    <button v-for="(search, index) in lastSearches" :key="index" class="search-tag">
      {{ search }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    lastSearches: Array
  }
};
</script>

<style scoped>
.search-history {
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-tag {
  background-color: #eaeaea;
  border-radius: 15px;
  padding: 8px 15px;
  cursor: pointer;
}
</style>
