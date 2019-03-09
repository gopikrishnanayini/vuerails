<template>
  <!-- Initial Page start -->
  <div class="page-content reference-documents py-0">
    <!--list folders section-->
    <div class="row reference-documents--header mb-4">
      <div class="col-12 col-md-6">
        <h4 class="mb-0 font-weight-bold heading">Reference Documents</h4>
        <p class="mb-md-0 font-franca font-size-15">Here’s the list of reference documents</p>
      </div>
    </div>
    <hr class="pb-5">
    <table class="table-list-responsive no-lines force-lines documents-table">
      <thead>
        <tr>
          <th scope="col" colspan="3">Name</th>
          <th scope="col">Students Count</th>
          <th scope="col">School Name</th>
          <th scope="col">Updated On</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in teachers">
          <td>{{teacher.name}}</td>
          <td>{{teacher.students}}</td>
          <td>{{teacher.school}}</td>
          <td>{{teacher.updated_at}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from './scripts/api';

export default {
  name: 'List',
  created() {
    api.fetchTeachers()
    .then(res => {
      let all_folders = res.data.payload
      this.teachers = [...all_folders]
    })
    .catch(error => {
      console.log(error);
    });
  },
  data() {
    return {
      teachers: [],
      teacher: {}
    }
  }
}
</script>
