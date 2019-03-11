<template>
  <div :class="pclass">
    <label class="form-label" :for="id">{{label}} <b-link v-if="flockHelper" v-b-popover.hover="flockHelper" class="flock-helper d-md-inline-block">?</b-link></label>
    <p v-if="labelhelper != '' && labelhelper != undefined" class="fade-text">{{labelhelper}}</p>
    <div :class="addonclass">
      <span v-if="addonPrepend" class="input-group-addon">
        <span>{{ addonPrepend }}</span>
      </span>
      <input type="text" class="form-control" :id="id" :placeholder="placeholder" :value="value" v-mask="mask" @input="updateVal">
      <span v-if="addonAppend" class="input-group-addon">
        <span>{{ addonAppend }}</span>
      </span>
    </div>
    <div v-if="v.$error">
      <span class="form-group-message" v-if="v.required==false">Field is required</span>
      <span class="form-group-message" v-if="v.numeric==false">Should be a number</span>
      <span class="form-group-message" v-if="v.shouldBeUnique==false">Should be unique</span>
      <span class="form-group-message" v-if="v.minLength==false">Must be of length {{v.$params.minLength.min}}</span>
      <span class="form-group-message" v-if="v.maxLength==false">Must be of length {{v.$params.maxLength.max}}</span>
      <span class="form-group-message" v-if="v.maxValue==false">Must be less than or equal to {{v.$params.maxValue.max}}</span>
      <span class="form-group-message" v-if="v.between==false">Must be between {{v.$params.between && v.$params.between.min}} and {{v.$params.between && v.$params.between.max}}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMask from 'v-mask';
Vue.use(VueMask);

export default {
  name: "Finput",
  props: {
    v: {
      type: Object,
      default: function() {
        return {};
      }
    },
    value: {
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    hclass: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      defualt: ""
    },
    labelhelper: {
      type: String,
      defualt: ""
    },
    domain: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    mask: {
      type: String,
      default: ""
    },
    addonPrepend :{
      type: String,
      default: null
    },
    addonAppend :{
      type: String,
      default: null
    },
    flockHelper :{
      type: String,
      default: null
    }
  },
  computed: {
    pclass: function() {
      let c = [];
      c.push("form-group");
      if (this.hclass != "") c.push(this.hclass);
      if (this.v.$error) c.push("form-group-error mb-0");
      return c.join(" ");
    },
    addonclass: function() {
      if(this.addonPrepend || this.addonAppend)
        return 'input-group'
      return ''
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
