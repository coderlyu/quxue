<template>
  <div class="loading-wrapper">
    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.loading-wrapper {
  z-index: 9999;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #7171C6;
  // background: rgb(172, 251, 234);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  display: flex;
  animation-delay: 1s;
}

.dot {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 8px;
  border-radius: 50%;
}

.dot::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  animation: wave 2s ease-out infinite;
}
.dot:nth-of-type(1) {
  background: #7ef9ff;
}
.dot:nth-of-type(1)::before {
  animation-delay: 0.2s;
}
.dot:nth-of-type(2) {
  background: #89cff0;
}
.dot:nth-of-type(2)::before {
  animation-delay: 0.4s;
}
.dot:nth-of-type(3) {
  background: #4682b4;
}
.dot:nth-of-type(3)::before {
  animation-delay: 0.6s;
}
.dot:nth-of-type(4) {
  background: #0f52ba;
}
.dot:nth-of-type(4)::before {
  animation-delay: 0.8s;
}
.dot:nth-of-type(5) {
  background: #000080;
}
.dot:nth-of-type(5)::before {
  animation-delay: 1s;
}
@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}
@media (max-width: 768px) {
  .dot {
    width: 10px;
    height: 10px;
  }
}
</style>
