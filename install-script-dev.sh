#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

echo "Downloading latest version from github dev"

#download latest
wget https://github.com/MKHenson/mkblog/archive/dev.zip
unzip -o "dev.zip"

# Moves the server folder to the current directory
cp -r mkblog-dev/resources/* ./resources
cp -r mkblog-dev/templates/* ./templates

# Removes the temp mkblog folder
if [ -d "mkblog-dev" ]; then
	rm mkblog-dev -R
fi

# Remove the zip file
rm "dev.zip"

# All done
echo "MKBlog successfully installed :)"
exit
} # this ensures the entire script is downloaded #