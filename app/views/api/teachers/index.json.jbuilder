json.data do
  json.payload do
    json.array! @result do |teacher|
      json.id teacher.id
      json.name teacher.name
      json.students teacher.students_count
      json.school teacher.school
      json.updated_at teacher.updated_at.strftime("%m/%d/%Y")
    end
  end
end
