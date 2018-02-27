# ch-dev-operations

## Overview
What the heck is this? This is a sanity check for developers to measure coding guidelines such as alphabetizing styles. This is
meant to live in the developers' local environment. Developers can include this check in the pre-commit phase of their build

## Installation
Copy the following to the root folder of your project:
* The file: `ch-dev-checker.sh`
* Copy the folder: `ch-dev-checker`

## Usage
From the root of your project run the script using the following: `./ch-dev-checker.sh`

NOTE: make sure you have permissions on `./ch-dev-checker.sh` set so you can execute

For command line help use the -h switch: `./ch-dev-checker.sh -h`

Include any files that you want to ignore in `ch-dev-checker/ignore-list.txt`