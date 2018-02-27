# function to inspect .components.js files inject section
function angular-component-inject-alpha-execute {
  # Loop through the array of filenames passed in
  arr=("$@")
  for filename in "${arr[@]}"
  do
    if [[ "$filename" == *components.js ]]; then
      echo "checking: ${filename}"
      angular-component-inject-alpha-check ${filename}
    fi
  done
}

function angular-component-inject-alpha-check {
  index=-1

  # Loop over the lines in the file passed in
  while IFS= read line
  do
    # logic to parse out injected services
    if [[ ! $line = *module.exports* && ! $line = *Component* && ! $line = *ngInject* && ! $line = *constructor* ]]; then

    let index=index+1
      # trim leading whitespace
      serviceName="$(echo -e "${line}" | sed -e 's/^[[:space:]]*//')"
      services[$index]=$serviceName

      # compare contiguous style names if more than one
      if [[ $index -gt 1 ]]; then
        previous="${services[index-1]}"
        next="${services[index]}"      

        # lexical comparison of style names
        if [ $previous \> $next ]; then
          echo "ERROR: Out of order:"
          echo "line: ${next} does NOT come before ${previous}"
        fi
      fi

      if [[ $line = *\)* ]]; then
        break
      fi
    fi

  done <"$1"
}