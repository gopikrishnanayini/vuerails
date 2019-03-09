import data_service from 'homes/scripts/data_service'

export default {

  fetchTeachers() {
    const url = '/api/teachers.json'
    return data_service.get(url)
  },

}
