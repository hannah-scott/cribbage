#!/bin/bash
# Script to uninstall old versions of application
# and reinstall
# Requires deploy
echo Uninstalling old versions
ids=$(gdeploy list | grep 'cribbage' | cut -d/ -f3)
for i in $ids; do 
    gdeploy uninstall $i
done
echo
echo Installing latest version
gdeploy install .
echo
echo Done!