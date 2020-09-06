import base64
from flask import Flask, request, Response
from flask_restful import Api, Resource, reqparse
from execute import fit

#img_base64
class Processor(Resource):
    def post(self):
        img_base64 = request.data
        image = base64.b64decode(img_base64)
        binary_format = bytearray(image)
        file = open('input.jpg', mode="wb")
        file.write(binary_format)
        fit('./frozen_inference_graph.pb', './input.jpg', True if request.args.get('downscale') == 'true' else False)

class Reader(Resource):
    def get(self):
        try:
            with open('final.jpg', "rb") as image_file:
                image_data_binary = image_file.read()
                image_data = str(base64.b64encode(image_data_binary), "utf-8")
                response = Response(image_data, mimetype='text/plain')
                response.status_code = 200
                return response
        except FileNotFoundError:
            return "not found", 404

if __name__ == '__main__':
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(Processor, "/unprocessed")
    api.add_resource(Reader, "/processed")
    app.run(host='0.0.0.0')
