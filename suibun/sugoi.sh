#!/bin/sh

cd /home/ubuntu/idea_cloud
git pull
cd /home/ubuntu/idea_cloud/suibun
sudo rake db:migrate
sudo service suibun stop
sudo service suibun start

