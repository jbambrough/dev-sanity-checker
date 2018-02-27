# plugin to inspect .less files
function less-alpha-execute {
  # Loop through the array of filenames passed in
  arr=("$@")
  for filename in "${arr[@]}"
  do
    if [[ "$filename" == *.less ]]; then
      less-alpha-check ${filename}
    fi
  done
}

function less-alpha-check {
  echo "-------- Checking file: $1"
  count=-1
  fileLineCount=-1
  index=-1
  flag=0

  # Loop over the lines in the file passed in
  while IFS= read line
  do
    str=""
    let fileLineCount=fileLineCount+1

    # logic to filter out lines that are non-styles
    if [[ ! $line = [[:space:]]*\.* && ! $line = *}* && ! $line = *{* && $line = *:* ]]; then
      let count=count+1
      let index=index+1

      # trim leading whitespace
      str="$(echo -e "${line}" | sed -e 's/^[[:space:]]*//')"
      IFS=':' read styleName styleValue <<< "$str"

      styles[$index]=$styleName
      
      # compare contiguous style names if more than one
      if [[ $index -gt 1 ]]; then
        previous="${styles[index-1]}"
        next="${styles[index]}"

        # lexical comparison of style names
        if [ $previous \> $next ]; then
          echo -e "\033[33mWARNING:\033[0m Styles out of order:"
          echo -e "line: ${fileLineCount} \033[33m${next}\033[0m does NOT come before \033[33m${previous}\033[0m"
          flag=1
        fi
      fi
    else
      styles=()
      index=0
    fi
  done <"$1"

  if [ $flag -eq 0 ]; then
    echo ">>>>>> You're a Rockstar! $1 checked out"
  else
    echo "Alpha problem. Returning code 1"
    return 1  
  fi

  # test
  #return $flag  
}