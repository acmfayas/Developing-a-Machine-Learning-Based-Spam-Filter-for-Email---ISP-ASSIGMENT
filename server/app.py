import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import hashlib


client = MongoClient('mongodb+srv://fayasacm110:Fayas123119@fayasacm.vztessn.mongodb.net/test')
app = Flask(__name__)
app.debug = True
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Access the database
db = client['pythonApp']


user_schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["name", "password","email"],
        "properties": {
            "name": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
             "email": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "password": {
                "bsonType": "string",
                "description": "must be a string and is required"
            }
        }
    }
}

if 'user' not in db.list_collection_names():
    book_collection = db.create_collection("user", validator=user_schema)



model = pickle.load(open('spam.pkl', 'rb'))
cv = pickle.load(open('vectorizer.pkl', 'rb'))


user_collection = db["user"]

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.get_json()
    msg = data['msg']
    vec = cv.transform([msg]).toarray()
    result = model.predict(vec)
    if result[0] == 0:
        text = "This is Not A Spam Email"
    else:
        text = "This is A Spam Email"
    
    return jsonify({'result': text}),200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if 'name' not in data or 'password' not in data or 'name' not in data:
        return {'error': 'Missing name or email or password'}, 400
    
    name = data['name']
    password = data['password']
    email = data['email']
    hashed_password = hash_password(password)
    
    user = user_collection.find_one({'email': email})
    if user:
        msg = "user already exists with this email"
        status = False
    else:
        new_user = {"name":name , "email": email , "password" : hashed_password}
        user_collection.insert_one(new_user)
        msg = "User created successfully"
        status = True

    return {'message':msg ,'status':status}, 200



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return {'error': 'Missing email or password'}, 400
    
    password = data['password']
    email = data['email']

    hashed_password = hash_password(password)

    user = user_collection.find_one({'email': email,'password':hashed_password})
    if user:
        msg ={'name':user.get('name'),'email':user.get('email')} 
        status = True
    else:
        msg=('Invalid username or password.')
        status = False

    return {'message':msg ,'status':status}, 200



if __name__ == '__main__':
    app.run()
    
