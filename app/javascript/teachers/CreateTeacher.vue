<template>
  <!-- create teacher modal starts -->
  <b-modal id="create-teacher" v-model="popupOpen" centered title="Teacher" ok-title="Save" @ok.prevent="createTeacher()" ok-variant="primary">
    <h6>Name *</h6>
    <b-form-input type="text"
                      placeholder="Name of the teacher"
                      v-model="teacher.name"></b-form-input>
    <div v-if="$v.teacher.name.$error" class="form-group-error">
      <span class="form-group-message">Field is required</span>
    </div>
    <h6>School Name *</h6>
    <b-form-input type="text"
                      placeholder="Name of the school"
                      v-model="teacher.school"></b-form-input>
    <div v-if="$v.teacher.school.$error" class="form-group-error">
      <span class="form-group-message">Field is required</span>
    </div>
    <h6>Students Count *</h6>
    <b-form-input type="text"
                      placeholder="Number of the students"
                      v-model="teacher.students_count"></b-form-input>
  </b-modal>
  <!-- create folder modal ends -->
</template>

<script>
import api from './scripts/api';
import Finput from 'homes/components/Finput';
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CreateTeacher',
  components: {
    Finput
  },
  props: {
    teachers: Array,
    teacher: {
      type: Object,
      default: {

      }
    }
  },
  methods: {
    createTeacher: function() {
      this.$v.teacher.$touch()
      if (this.$v.teacher.$invalid)
        return false
      var self = this;
      if(self.teacher.id){
        api.updateTeacher(self.teacher)
        .then(res => {
          self.$v.teacher.$reset()
          self.$toasted.success("Teacher is updated successfully.")
          this.popupOpen = false;
        })
        .catch(error => {
          self.$v.teacher.$reset()
          self.$toasted.error("Error while updating teacher.")
        });
      } else {
        api.createTeacher(self.teacher)
        .then(res => {
          if(res && res.data && res.data.id) {
            self.teachers.push(res.data)
            self.$toasted.success("Teacher is created successfully.")
            self.$v.teacher.$reset()
            this.popupOpen = false;
          }
        })
        .catch(error => {
          self.$v.teacher.$reset()
          self.$toasted.error("Error while creating teacher.")
        });
      }
    }
  },
  data() {
    return {
      popupOpen: false
    }
  },
  validations: {
    teacher: {
      name: {
        required
      },
      school: {
        required
      }
    }
  }
}
</script>
