# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


Event.create(title: "January Cookbook Club", 
description: "Bring your favorite nourishing food to share. You can also bring a topping for buddah bowls.", 
start_time: DateTime.now + 2.days + 2.hours,
end_time: DateTime.now + 2.days + 5.hours,
location: "66-000 Kam Highway Haleiwa")

