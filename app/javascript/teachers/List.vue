<template>
  <!-- Initial Page start -->
  <div>
    <b-jumbotron bg-variant="white">
      <h1 slot="header">Teacher's List</h1>
      <h5 slot="lead">List of Teacher's.</h5>
      <div class="text-right">
        <input type="text" v-model="filter" placeholder="Search title.."/>
        <b-button v-b-modal.create-teacher v-on:click="edit_teacher('new')">Upload Document</b-button>
      </div>
      <hr class="my-4" />
      <div class="text-center">
        <b-spinner type="grow" label="Spinning" v-if="teachers.length == 0" />
      </div>
      <template>
        <div class="w-100" style="text-align:center;">
          <b-table bordered :fields="fields" :items="teachers" :filter="filter">
            <template slot="actions" slot-scope="data">
              <div>
                <b-dropdown id="ddown-dropright" dropright variant="primary" class="m-2">
                  <template slot="button-content">
                    <i class="icon ion-ios-more"></i>
                  </template>
                  <b-dropdown-item v-b-modal.create-teacher variant="link" v-on:click="edit_teacher(data.item)">Edit</b-dropdown-item>
                  <b-dropdown-item @click="deleteTeacher(data.item)" href="#">Delete</b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
          </b-table>
        </div>
      </template>
      <create-teacher :teachers='teachers' :teacher='teacher'></create-teacher>
    </b-jumbotron>
  </div>
</template>

<script>
import api from './scripts/api';
import Finput from 'homes/components/Finput';
import CreateTeacher from './CreateTeacher';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'List',
  components: {
    Finput,
    CreateTeacher,
    Swal
  },
  methods: {
    edit_teacher: function(value){
      if (value == 'new') {
        this.teacher = {
          name: '',
          school: '',
          students_count: ''
        }
      } else {
        this.teacher = value
      }
    },
    deleteTeacher: function(teacher){
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete  "+teacher.name+'  teacher',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          var self = this;
          api.deleteTeacher(teacher.id)
          .then(res => {
            if(res && res.data && res.data.id) {
              self.teachers = _.reject(self.teachers, { id: res.data.id })
              self.$toasted.success("Folder is deleted successfully.")
            }
          })
          .catch(error => {
            console.log(error);
          });
        }
      })
    }
  },
  created() {
    api.fetchTeachers()
    .then(res => {
      let docs = res.data.payload
      this.teachers = docs
    })
    .catch(error => {
      console.log(error);
    });
  },
  data() {
    return {
      fields: [
        {
          key: 'name'
        },
        {
          key: 'school',
          label: 'School Name'
        },
        {
          key: 'students_count',
          label: 'Students Count'
        },
        {
          key: 'updated_at',
          label: 'Updated On'
        },
        {
          key: 'actions',
          label: '',
          variant: 'danger'
        }
      ],
      teachers: [],
      teacher: {},
      filter: '',
      delete_teacher: {}
    }
  },
}
</script>
