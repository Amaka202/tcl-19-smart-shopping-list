# Overview

## What is this project?

This is a smart shopping app which was developed by a group of four developers under the [collab lab](https://the-collab-lab.codes/about-us/) mentorship program. The app learns your buying habits and helps you remember what you will likely need to buy on your next trip to the store. 

## How does it work?

As a user, you will need to create a new shopping list or join an existing list. You can then add items to your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be bought soon, it rises to the top of the shopping list.

## Video demo of the app:

Option 1 (like Before): A picture with a link that sends you to a youtube video of a demo.

![](https://github.com/the-collab-lab/tcl-19-smart-shopping-list/blob/read-me/public/Thumbnail.png)

Option 2: The demo as a gif (with lower quality.. could not find a way to have the same quality as the video I made.)

![](https://github.com/the-collab-lab/tcl-19-smart-shopping-list/blob/read-me/public/smart-shopping-app.gif)


## Live project

The live project can be viewed [here](https://tcl-19-smart-shopping-list-2.web.app/).

## Setting up the project

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- [Google Firebase](https://firebase.google.com/) is used to store the data
- To make integration with Firebase even more straightforward [react-firebase-hooks](https://firebaseopensource.com/projects/csfrequency/react-firebase-hooks/) were installed
- To navigate between the different views [react-router-dom](https://reactrouter.com/web/guides/quick-start) was installed
- For styling [TailwindCSS](https://tailwindcss.com/docs/guides/create-react-app) was chosen



# Setting up the project locally

To set up the project locally, follow the steps below.

1. Clone the project to your local machine using the command `git clone https://github.com/the-collab-lab/tcl-19-smart-shopping-list.git`. This requires you to have git installed on your machine. If you don't have git, you can download it from [here](https://git-scm.com/downloads). It is a very powerful and popular version control system(VCS). If you are familiar with another VCS, you can check out the [git documentation](https://git-scm.com/doc). If you are a total beginner to git and VCS, [this awesome course by atlassian](https://www.atlassian.com/git/tutorials) will set you off.

2. Build the app locally. 
  
   To run the app locally, you need to:

    - have `node` and `npm` installed on your machine. If you don't have `node` installed on your machine, follow the instructions [here](https://nodejs.org/en/) to install it. If you are not sure whether you have it installed, run `node --version` on your terminal. If you see the version of node like `v15.0.1` then node has already been installed.  When you download Node.js, you automatically get `npm` installed as well.
    - create a firebase project 
    - create `.env` file and then copy and paste the contents of [example.env](./example.env) in it. The corresponding  value of each environment variable in the `.env` file should correspond with the configuration key for the firebase project  you  created.
    - run `npm update` to install and update the project dependencies
    - run `npm start` to start a live version of the app on local host. The app will be on `localhost:3000`.
