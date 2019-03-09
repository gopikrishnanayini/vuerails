json.data do
  json.payload do
    json.array! @result do |teacher|
      json.id teacher.id
      json.name teacher.name
      json.students teacher.students_count
      json.school teacher.school
    end
  end
end
