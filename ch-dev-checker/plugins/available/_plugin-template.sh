#!/bin/bash

##############################################
# Plugin Template
##############################################

##############################################
# STEP 1: Define an entrty point function to inspect the code. Inside the for loop filter out tye type 
#         of file you want to inspect. ex: *.less, *.jsx, *.component.js
##############################################
function my-plugin-execute {
  # Loop through the array of filenames passed in
  arr=("$@")
  for filename in "${arr[@]}"
  do
    if [[ "$filename" == *.less ]]; then
      my-plugin-check ${filename}
    fi
  done
}

##############################################
# STEP 2: Loop through parameter Array to determine which files you care about
##############################################
function my-plugin-check {
  echo "Do stuff here"

  # Logic goes here
}