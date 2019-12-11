Copy-Item ../SegmentationModel/frozen_inference_graph.pb ./src/service
docker build --rm -f "./src/service/Dockerfile" -t blurthebackground:latest "./src/service"
