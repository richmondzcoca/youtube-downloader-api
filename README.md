Create app on heroku:
$ cd my-project/
$ git init
$ heroku git:remote -a yourapp
$ git add .
$ git commit -am "make it better"
$ git push heroku master

To use 'yt-dlp':

Create buildpack:
1) heroku buildpacks:add https://github.com/richmondzcoca/heroku-yt-dlp-buildpack.git
2) heroku buildpacks:add heroku/nodejs
3) Check buildpacks: "heroku buildpacks"