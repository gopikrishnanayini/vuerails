<template>
  <div class="custom-file-upload">
    <div class="file-upload-wrapper">
      <div :class="pclass">
        <input type="text" class="file-upload-input file-browse-input" disabled="disabled" placeholder="Select Document" :value="fileName">
        <label class="button file-upload-button file-browse-btn">{{label}}
          <input type="file" class="custom-file-upload-hidden" @change="loadTextFromFile">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMask from 'v-mask';
Vue.use(VueMask);

export default {
  name: "Ffileinput",
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
    },
    loadTextFromFile: function(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      var self= this;
      reader.onload = e => this.$emit("input", e.target.result);
      reader.readAsDataURL(file);
      this.fileName = file.name;
    },
  },
  data() {
    return {
      fileName: ''
    }
  }
};
</script>
