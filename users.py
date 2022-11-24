from pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.mydb
users = db.users

user_list = [
    {
        "name": "Ruairi Coleman",
        "username": "ruairi",
        "password": b"password",
        "email": "coleman-r@ulster.ac.uk",
        "admin": True
    }
]

for new_user in user_list:
    new_user["password"] = bcrypt.hashpw(new_user["password"], bcrypt.gensalt())
    users.insert_one(new_user)
