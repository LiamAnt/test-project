<template>
  <div class="menuWrap">
    <RouterLink class="menuItem" to="/login">
      待辦清單
    </RouterLink>
    <div class="vertical_div"></div>
    <RouterLink class="menuItem" to="/timesetting">
      供餐時間選擇器
    </RouterLink>
  </div>
</template>

<style scoped>
  .menuWrap {
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
  }
  a.menuItem {
    color: black;
    text-decoration: none;
    font-size: 40px;
  }
  a.menuItem:hover {
    color: #339919;
  }
  .vertical_div {
    border-right: 1px solid black;
    height: 40px;
    margin: 0 40px;
  }
</style>
