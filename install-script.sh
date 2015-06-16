#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

# Functiom that prints the latest stable version
version() {
  echo "0.0.7"
}

echo "Downloading latest version from github $(version)"

#download latest
wget https://github.com/MKHenson/mkblog/archive/v$(version).zip
unzip -o "v$(version).zip"

# If directories are not present, then create them
if [ ! -d "resources" ]; then
	mkdir resources
	mkdir templates
fi

# Moves the server folder to the current directory
cp -r mkblog-$(version)/resources/* ./resources
cp -r mkblog-$(version)/templates/* ./templates

# Removes the temp mkblog folder
if [ -d "mkblog-$(version)" ]; then
	rm mkblog-$(version) -R
fi

# Remove the zip file
rm "v$(version).zip"

# All done
echo "MKBlog successfully installed :)"
exit
} # this ensures the entire script is downloaded #