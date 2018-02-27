function display_help {
    echo "Usage: $0 -[ahjl] {filename}" >&2
    echo "DESRIPTION:"
    echo "    Perform a sanity check on your code before you do a commit!"
    echo
    echo "   -h           help with switch options"
    echo "   -a           Angular files including *.component.js, *.directive.js, *.service.js, *.factory.js"
    echo "   -j           *.jsx files"
    echo "   -l           *.less files"
    echo
    # echo some stuff here for the -a or --add-options 
}