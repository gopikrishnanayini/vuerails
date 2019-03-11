<template>
  <div class="form-group" v-bind:class="{ 'form-group-error mb-0': v.$error }">
    <label class="form-label" :for="id">{{label}}</label>
    <b-form-select :id="id" :value="value" @input="updateParent" :options="opts" :class="hclass" 
    :text-field="textField" :value-field="valueField"></b-form-select>
    <div v-if="v.$error">	
      <span class="form-group-message" v-if="!v.required">Field is required</span>	
    </div>
  </div>
</template>

<script>
export default {
  name: "Fselect",
  methods: {
    updateParent: function(e) {
      this.$emit("input", e);
      if (this.v.hasOwnProperty("$touch")) this.v.$touch();
    }
  },
  props: {
    v: {
      type: Object,
      default: function() {
        return {
          $error: false
        };
      }
    },
    value: {
      default: ""
    },
    opts: {
      type: Array,
      default: () => []
    },
    hclass: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    textField: {
      type: String,
      default: 'text'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    label: {
      type: String,
      defualt: ""
    },
    error: {
      type: Boolean,
      default: false
    },
    errReq: {
      type: Boolean,
      default: false
    }
  }
};
</script>
