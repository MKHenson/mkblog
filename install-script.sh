#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

# Functiom that prints the latest stable version
version() {
  echo "0.1.1"
}

echo "Downloading latest version from github $(version)"

#download latest
wget https://github.com/MKHenson/mkblog/archive/v$(version).zip
unzip -o "v$(version).zip"

# Moves the server folder to the current directory
cp -r mkblog-$(version)/* ./

# Removes the temp mkblog folder
if [ -d "mkblog-$(version)" ]; then
	rm mkblog-$(version) -R
fi

# Remove the zip file
rm "v$(version).zip"

# All done
echo "MKBlog v$(version) successfully downloaded"
exit
} # this ensures the entire script is downloaded #