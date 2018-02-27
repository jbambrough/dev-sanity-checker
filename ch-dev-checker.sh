#!/bin/bash

##############################################
# Choice Hotels developer sanity checker. Performs the following functions:
#   1. Detects what files have been modified (tracked or untracked) and new files, puts them in filelist.txt
#   2. Iterates through the list of installed plugins to apply logic checks and spit out warnings to stdout
##############################################

# Constants
pluginDir="ch-dev-checker/plugins"
fileName='filelist'
ignoreFiles='ch-dev-checker/ignore-list.txt'

# Import plugins from directory /ch-dev-checker/plugins
for plugin in `ls $pluginDir`; do
  . ch-dev-checker/plugins/$plugin
done

##############################################
# STEP 1: Detect any pending changes and list those files in filelist.txt. This includes:
#         a) Files that are new (untracked)
#         b) Tracked files that have been modified but NOT staged
#         c) Tracked files that have been modified and staged
##############################################

rm "$fileName.txt"

# all git modified files
git diff --name-only --diff-filter=AM > "$fileName-tmp.txt"

# all git untracked files (new files, not yet staged or committed)
git ls-files --others --exclude-standard >> "$fileName-tmp.txt"

# all staged files
git diff --name-only --cached >> "$fileName-tmp.txt"

# Loop through ignore-list.txt and populate ignore array
cnt=0
while IFS= read line
do
  ignore[cnt]="$line"
  cnt=$(($cnt+1))
done <"$ignoreFiles"

# Loop through and check the types of files to include.
# Files listed in /ch-dev-checker/ignore-list.txt will NOT be included
cnt=0
while IFS= read line
do
  includeFile=0
  for ig in "${ignore[@]}"
  do
    if [[ $ig = $line ]]; then
      includeFile=cnt
    fi
  done

  if [[ $includeFile -eq 0 ]]; then
    echo "${line}" >> "$fileName.txt"
    filenameArray[cnt]="$line"
  fi
  cnt=$(($cnt+1))
done <"$fileName-tmp.txt"

# Remove temporary file
rm "$fileName-tmp.txt"

##############################################
# STEP 2: Apply logic for each installed plugin in pluginDir for each file in filelist.txt
##############################################

# Loop through each plugin and invoke function <plugin-name>-execute
for plugin in `ls $pluginDir | sed -n 's/\.sh$//p'`; do
  # Pass in ONE file from the command line you want to check
  if [ $# -eq 1 ]; then
    oneFileArray[0]=$1
    $plugin-execute "${oneFileArray[@]}"
  # Check all files (new, modified)
  else
    $plugin-execute "${filenameArray[@]}"
  fi  
done