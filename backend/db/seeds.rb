# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

users = User.create!([
  {email: "test1@test.com", password: "123456"},
  {email: "test2@test.com", password: "123456"},
  {email: "test3@test.com", password: "123456"}
])


Event.create!([
  {title: "Sewing Night", 
  description: "Bring your sewing machine and a project to work on!", 
  start_time: DateTime.new(2025, 3, 14, 16, 0),
  end_time: DateTime.new(2025, 3, 14, 19, 30),
  location: "Haleiwa",
  user_id: 1}, 
  {title: "Tech Networking", 
  description: "Come meet other women in tech!", 
  start_time: DateTime.new(2025, 3, 18, 15, 30),
  end_time: DateTime.new(2025, 3, 18, 17, 0),
  location: "Virtual",
  user_id: 1}, 
  {title: "March Cookbook Club", 
  description: "Bring your favorite nourishing food to share. You can also bring a topping for buddha bowls.", 
  start_time: DateTime.new(2025, 3, 27, 17, 30),
  end_time: DateTime.new(2025, 3, 27, 20, 30),
  location: "Haleiwa Beach Park",
  user_id: 2},
  {title: "Sunday Surf", 
  description: "Meet up and surf with friends", 
  start_time: DateTime.new(2025, 3, 6, 9, 30),
  end_time: DateTime.new(2025, 3, 6, 12, 30),
  location: "Pua'ena",
  user_id: 3}
])






