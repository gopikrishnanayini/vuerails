<template>
  <div class="form-group" v-bind:class="{ 'form-group-error': v.$error }">
    <label class="form-label" :for="id">{{label}}</label>
    <textarea :disabled="disabled" class="form-control" :id="id" :rows="rows" :placeholder="placeholder" :value="value" @input="updateVal"></textarea>
    <div v-if="v.$error">
      <span class="form-group-message" v-if="!v.required">Field is required</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ftextarea",
  props: {
    v: {
      type: Object,
      default: function() {
        return {};
      }
    },
    value: {
      type: String,
      default: ""
    },
    hclass: {
      type: String,
      default: ""
    },
    rows: {
      type: Number,
      default: 3
    },
    id: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      defualt: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  methods: {
    updateVal: function(e) {
      this.$emit("input", e.target.value);
      if (this.v.hasOwnProperty("$touch")) this.v.$touch();
    }
  }
};
</script>

