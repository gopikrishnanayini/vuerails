<template>
  <div class="col-xs-12 text-center p-3" v-if="busy">
    <div class="d-inline-block spinner-loader">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    busy: {
      type: Boolean,
      default: false
    }
  }
}
</script>
