#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

# Functiom that prints the latest stable version
version() {
  echo "0.0.2"
}

echo "cleaning up folder..."

# Remove existing folders if they exist
if [ -d "resources" ]; then
	rm resources -R
fi
if [ -d "templates" ]; then
	rm templates -R
fi


echo "Downloading latest version from github $(version)"

#download latest
wget https://github.com/MKHenson/mkblog/archive/v$(version).zip
unzip -o "v$(version).zip"

# Moves the server folder to the current directory
mv mkblog-$(version)/resources ./resources
mv mkblog-$(version)/templates ./templates

# Remove modepress-master
if [ -d "mkblog-$(version)" ]; then
	rm mkblog-$(version) -R
fi

# Remove the zip file
rm "v$(version).zip"

# All done
echo "MKBlog successfully installed :)"
exit
} # this ensures the entire script is downloaded #