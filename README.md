# ImageProcessorS18
## BME590 Final Project : Image Processor for Medical Software Design

[![Build Status](https://travis-ci.org/kmc97/ImageProcessorS18.svg?branch=master)](https://travis-ci.org/kmc97/ImageProcessorS18)

This project facilitates the diagnosis of a torn ulnar collateral ligament (UCL). The service allows a user to upload an MRI image of the elbow, choose an image processing technique and then outputs a processed image. The new image will allow the user to gain more information about the possibility of a UCL tear by extracting unclear features. The images are saved in a database and may be pulled at a later time based on the unique description of the image.

## Running Method
To run this project run docker run -v $PWD/db:/data/db -p 27017:27017 mongo from the root of the repository. The file that needs to be run is "main.py". This can be run using flask with the command FLASK_APP=main.py flask run. To run react, enter the command npm run start in the react-learning folder. This will open up the web server at http://localhost:3000/

The input is the original images from the user and the output is the processed images, histogram of processed images, and image metrics. This data is posted on the web server.

## General Information
This service allows a user to upload a photo or multiple photos to a front end website and then have the option to choose various image processing methods to edit the photo. On the backend side, the server stores the images along with other useful data such as the timestamp, time taken to process the image and some basic image metrics like size, number of pixels, etc. The image processing methods available to the user are histogram equalization, contrast stretching, log compression and reverse video. In addition, a histogram of the original image and the processed image will be generated.

### Link to the RFC:
https://docs.google.com/document/d/1vcsbcqEtvKBKNdxcELAXiufVeGS2ZW9HNsqf_1FsJRI/edit#

### Webpage Layout:
<img src="Screen Shot 2018-05-02 at 12.50.21 PM.png" height="500px"/> 
<img src="Screen Shot 2018-05-02 at 12.51.24 PM.png" height="500px"/> 

### Example Processed Images:
<img src="Screen Shot 2018-05-02 at 12.50.29 PM.png" height="500px"/> 
<img src="Screen Shot 2018-05-02 at 12.50.42 PM.png" height="500px"/> 
<img src="Screen Shot 2018-05-02 at 12.50.49 PM.png" height="500px"/> 


