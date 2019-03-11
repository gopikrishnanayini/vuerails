<template>
  <b-progress :max="100" show-progress class="flock-progress">
    <b-progress-bar :value="value" :label="labelText"></b-progress-bar>
  </b-progress>
</template>

<script>
export default {
  name: "Fprogressbar",
  props: {
    max: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    labelText: function() {
      return this.value + "%"
    }
  }
}
</script>
