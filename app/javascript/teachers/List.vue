<template>
  <!-- Initial Page start -->
  <div>
    <b-jumbotron>
      <h1 slot="header">Teacher's List</h1>
      <h5 slot="lead">List of Teacher's.</h5>
       <div class="text-right">
          <b-button v-b-modal.create-teacher v-on:click="edit_teacher('new')">Upload Document</b-button>
        </div>
      <hr class="my-4" />
      <div class="w-100" style="text-align:center;">
        <b-table class="table-list-responsive no-lines force-lines" :fields="fields" :items="teachers">
          <template slot="actions" slot-scope="data">
            <div>
              <b-dropdown id="ddown-left" text="Left align" variant="primary" class="m-2">
                <template slot="button-content">
                  <i class="icon ion-ios-more"></i>
                </template>
                <b-dropdown-item v-b-modal.create-teacher variant="link" v-on:click="edit_teacher(data.item.id)">Edit</b-dropdown-item>
                <b-dropdown-item @click="deleteTeacher(data.item.id)" href="#">Delete</b-dropdown-item>
              </b-dropdown>
            </div>
          </template>
        </b-table>
      </div>
      <create-teacher :teachers='teachers' :teacher='teacher'></create-teacher>
    </b-jumbotron>
  </div>
</template>

<script>
import api from './scripts/api';
import Finput from 'homes/components/Finput';
import CreateTeacher from './CreateTeacher';

export default {
  name: 'List',
  components: {
    Finput,
    CreateTeacher
  },
  methods: {
    edit_teacher: function(value){
      if (value == 'edit') {
        this.teacher = this.teacher
      } else {
        this.teacher = {
          name: '',
          school: '',
          students: ''
        }
      }
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
          key: 'students',
          label: 'Students Count'
        },
        {
          key: 'updated_at',
          label: 'Updated On'
        },
        {
          key: 'actions',
          label: ''
        }
      ],
      teachers: [],
      teacher: {}
    }
  },
}
</script>
