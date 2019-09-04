#! /bin/bash

SITE_PATH=$1
USER='root'
USERGROUP='root'

cd $SITE_PATH
git reset --hard origin/master
git clean -f
git pull
git checkout master
chown -R $USER:$USERGROUP $SITE_PATH