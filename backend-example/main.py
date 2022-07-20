import json
import os

from flask import Flask, request

from middleware import jwt_authenticated

# Document for jwt_authenticated 
# https://github.com/GoogleCloudPlatform/python-docs-samples/tree/88c4ee8b7355624e09009bbeff6b7d9834bd35f7/run/idp-sql

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello world service. '


@app.route('/hello-world-service/api/v1/hello', methods=['POST'])
@jwt_authenticated
def hello():
    json_data = request.get_json()
    name = 'World'
    if 'name' in json_data.keys():
        name = json_data['name']

    resp = {
        'message': 'Hello, {}!'.format(name)
    }

    return resp, 200


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
