<template>
  <!-- create teacher modal starts -->
  <b-modal id="create-teacher" v-model="popupOpen" centered title="Teacher" ok-title="Save" @ok.prevent="createTeacher()">
    <h6>Name *</h6>
    <!-- <finput placeholder="Folder"></finput> -->
    <b-form-input type="text"
                      placeholder="Name of the teacher"
                      v-model="teacher.name"></b-form-input>
    <h6>School Name *</h6>
    <b-form-input type="text"
                      placeholder="Name of the school"
                      v-model="teacher.school"></b-form-input>
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
    teachers: Array
  },
  methods: {
    createTeacher: function() {
      var self = this;
      api.createTeacher(self.teacher)
      .then(res => {
        if(res && res.data && res.data.id) {
          self.teachers.push(res.data)
          self.$toasted.success("Teacher is created successfully.")
          this.popupOpen = false;
        }
      })
      .catch(error => {
        self.$toasted.error("Error while creating teacher.")
      });
    }
  },
  data() {
    return {
      popupOpen: false,
      teacher: {}
    }
  }
}
</script>
