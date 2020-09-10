##Welcome

This repository is the source code of a web app that demonstrates modern image segmentation using a 'deep learning' model in TensorFlow. The app uses the segmented output from the model to add a background blurring effect. When the input image is a portrait the application of this is to enhance the foreground-background seperation in the portrait.

The TensorFlow model is not part of this repository and the code requires an external model to be provided. 

As Proof-Of-Concept the web app is deployed on the web for everyone to play with: [blurbackground.online]https://blurbackground.online

The current deployed App utilizes the DeepLabV3 semantic image segmentation model by Google Research.

##Technology overview

* React/Redux for Front End
* Razzle for Server Side Rendering
* Express for API backend
* Python for image processing
* Docker for containerization
