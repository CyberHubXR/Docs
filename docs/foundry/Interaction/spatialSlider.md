# SpatialSlider

![SpatialSlider](./img/spatialSliderScript.png)

## Description
A networked Slider implementation, using the foundry touch point system. 

## Usage
Add to an empty game object, with a child object with a collider representing the grabbable portion of the slider, then set the slider start and end points to the points on the slider that it should slide between.

If you wish you can set the slider to use increments instead of smooth motion.

## Networking
To network the object as well add a NetworkObject to the root and a NetworkTransform"to the slider's visual object.

## Examples
[Slider Gadget](foundry/samples/gadgets/slider.md)