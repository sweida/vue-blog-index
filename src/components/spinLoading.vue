<template>
  <fragment>
    <div class="spinner" v-if="isLoading">
      <div class="bounce1 aa"></div>
      <div class="bounce2 bb"></div>
      <div class="bounce3"></div>
    </div>
    <slot v-else></slot>
  </fragment>
</template>

<script>
export default {
  name: 'spinLoading',
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  // watch: {
  //   isLoading: function (newValue, oldValue) {
  //     // 监听 countWatcher 的变化
  //     console.log("props.isLoading 的值已变为：" + newValue);
  //   }
  // },
}
</script>

<style scoped lang="stylus">
.spinner {
  margin: 100px auto 60px;
  width: 150px;
  text-align: center;

  &>div {
    width: 30px;
    height: 30px;
    background-color: #67CF22;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
}


@keyframes bouncedelay {

  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {

  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }

  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>