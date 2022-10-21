Create app on heroku:
1) cd my-project/
2) git init
3) heroku git:remote -a yourapp
4) git add .
5) git commit -am "make it better"
6) git push heroku master

To use 'yt-dlp':

Create buildpack:
1) heroku buildpacks:add https://github.com/richmondzcoca/heroku-yt-dlp-buildpack.git
2) heroku buildpacks:add heroku/nodejs
3) Check buildpacks: "heroku buildpacks"

To push to heroku:
git push heroku master
