import data_service from 'homes/scripts/data_service'

export default {

  fetchTeachers() {
    const url = '/api/teachers.json'
    return data_service.get(url)
  },

  createTeacher(data) {
    const url = '/api/teachers'
    return data_service.post(url, data)
  },

  updateTeacher(data) {
    const url = '/api/teachers/'+data.id
    return data_service.put(url, data)
  },

  deleteTeacher(id) {
    const url = '/api/teachers/'+id
    return data_service.delete(url)
  }
}
