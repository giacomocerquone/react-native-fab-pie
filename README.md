# React Native Fab Pie

A very small library to help drawing beautiful animated pie charts. It uses React Native ART, d3 and native animations.
<br>
**Compatible with expo**

## Playground

Here there is the expo snack you can play with: https://snack.expo.io/@giacomocerquone/react-native-fab-pie

## Todo

- doc
- prop-types
- tests

## Motivation

I needed a lib to display **only** a pie chart.
I immediately saw react-native-svg-charts. 
<br>Cool, but what I needed was just a pie chart, plus I wanted to animate it and despite that lib has an animation prop, the developer disabled it because it isn't working.
So I noticed that the code for the pie chart was all contained in one file, I copied it and I started hacking on it to get what I wanted.
<br>I understand that for you is not ideal to have 2+ packages to draw charts, but I just needed a drop in component for my app.
I could have done a fork and do a PR to support this kind of animation, but, as I said, I just needed a pie chart plus I don't know if they'd accept it. Anyway a PR is something I'm considering (you can do it too :) )

## Inspiration:

- [React Native svg Charts](https://github.com/JesperLekland/react-native-svg-charts)
- [Animated Charts in React Native using D3 and ART](https://medium.com/the-react-native-log/animated-charts-in-react-native-using-d3-and-art-21cd9ccf6c58)
- [Pie animation in React Native using SVG](https://medium.com/@oriharel/pie-animation-in-react-native-using-svg-55d7d3f90156)
