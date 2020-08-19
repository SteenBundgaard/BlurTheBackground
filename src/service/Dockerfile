
FROM sbundgaard/docker-python37-opencv

ADD *.py /
ADD frozen_inference_graph.pb /

RUN pip install flask
RUN pip install flask_restful
RUN pip install tensorflow==1.15
RUN pip install opencv-python
RUN pip install numpy
RUN pip install pillow
RUN pip install scikit-image

EXPOSE 5000
ENTRYPOINT [ "python", "./app.py" ]