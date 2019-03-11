<template>
  <div :class="pclass">
    <label class="form-label d-inline-block" for="startdate">{{label}}
      <b-link v-if="flockHelper" v-b-popover.hover="flockHelper" class="flock-helper d-md-inline-block">?</b-link>
    </label>
    <div class="input-group">
      <datepicker ref="datepicker" input-class="form-control" format="MM/dd/yyyy" onpaste="return false" :placeholder="placeholder" :typeable="true" :disabledDates="disabledDates" :open-date="openDate" :value="value" @selected="updateParent"></datepicker>
      <span class="input-group-addon input-group-append" @click.prevent="open()">
        <i class="ion-android-calendar input-group-text"></i>
      </span>
    </div>
    <span class="form-group-message" v-if="v.required == false">Field is required</span>
    <span class="form-group-message" v-if="v.uniqueStartDate == false">Start date overlaps with existing review cycle. Please change date to proceed.</span>
    <span class="form-group-message" v-if="v.uniqueEndDate == false">End date overlaps with existing review cycle. Please change date to proceed.</span>
    <span class="form-group-message" v-if="v.maxValue == false && !(this.id === 'new-dob' || this.id === 'new-hire-date')">Start Date should be lesser than End Date</span>
    <span class="form-group-message" v-if="v.minValue == false && !(this.id === 'new-dob' || this.id === 'new-hire-date')">End Date should be greater than Start Date</span>
    <span class="form-group-message" v-if="v.checkRcStartDate == false && !(this.id === 'new-dob' || this.id === 'new-hire-date')">Start Date should be greater/equal to Review Cycle Start Date</span>
    <span class="form-group-message" v-if="v.checkRcEndDate == false && !(this.id === 'new-dob' || this.id === 'new-hire-date')">End Date should be lesser/equal to Review Cycle End Date</span>
  </div>

</template>

<script>
import Datepicker from "vuejs-datepicker";
import startOfToday from 'date-fns/start_of_today';

export default {
  name: "Fdatepicker",
  components: {
    Datepicker
  },
  methods: {
    updateParent: function(value) {
      this.$emit("input", value);
      this.v.$touch();
    },
    open: function() {
      this.$refs.datepicker.showCalendar();
    }
  },
  props: {
    v: {
      type: Object,
      default: function() {
        return {
          uniqueStartDate: true,
          uniqueEndDate: true,
          maxValue: true,
          required: true
        };
      }
    },
    value: {
      default: ""
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
    placeholder: {
      type: String,
      default: ""
    },
    disabledDates: {
      type: Object,
      default: function() {
        return {}
      }
    },
    openDate: {
      type: Date,
      default: () => new Date()
    },
    error: {
      type: Boolean,
      default: false
    },
    errReq: {
      type: Boolean,
      default: false
    },
    errMax: {
      type: Boolean,
      default: false
    },
    flockHelper: {
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
    }
  }
};
</script>
