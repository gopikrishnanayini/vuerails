<template>
  <div :class="pclass">
    <label class="form-label" :for="id">{{label}}</label>
    <div class="input-group">
        <span class="input-group-addon">
            <span>{{currency}}</span>
        </span>
        <input type="text" class="form-control" v-money="money" :id="id" :placeholder="placeholder" :value="value" v-on:change="checkNegative" @input="updateVal">
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import money from "v-money";
Vue.use(money);

export default {
  name: "Fcurrency",
  data() {
    return {
      money: {
        decimal: ".",
        thousands: ",",
        precision: 2,
        masked: false
      }
    };
  },
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
    domain: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    currency: {
      type: String,
      default: "$"
    }
  },
  computed: {
    pclass: function() {
      let c = [];
      c.push("form-group");
      if (this.hclass != "") c.push(this.hclass);
      if (this.v.$error) c.push("form-group-error mb-0");
      return c.join(" ");
    }
  },
  methods: {
    updateVal: function(e) {
      this.$emit("input", e.target.value);
      if (this.v.hasOwnProperty("$touch")) this.v.$touch();
    },
    checkNegative: function() {
      this.$emit('omitNegative', this.value)
    }
  }
};
</script>
