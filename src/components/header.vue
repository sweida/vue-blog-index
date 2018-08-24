<template>
  <mu-appbar color="primary" class="mu-header">
    <mu-button icon slot="left">
      <mu-icon value="home"></mu-icon>
    </mu-button>
    Title
    <mu-menu slot="right">
      <mu-button flat>MENU</mu-button>
      <mu-list slot="content">
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>Menu Item 1</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>Menu Item 2</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>
  </mu-appbar>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mu-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 101;
  overflow: hidden;
}

</style>
