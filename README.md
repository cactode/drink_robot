# Drink Robot
The mechanical and software stack for the Putz robotic bartender

## Installing
Create a virtualenv for this project.
```
python -m venv ./venv
```
Enter the virtualenv
```
# On windows
./venv/Scripts/activate
# On Linux
source ./venv/bin/activate
```
Install dependencies
```
pip install -r requirements.txt
```
Set up environmental variables
```
# On windows
set FLASK_APP='drink_robot'
set FLASK_ENV='development'
# On Linux
export FLASK_APP=drink_robot
export FLASKK_ENV=development
```
Run server. Unless overridden, the server will start in DEBUG mode with GPIO disabled.
```
flask run
```

## Developing
The backend is mostly functional and serves as a RESTful API for saving/deleting/retrieving recipes and pouring them. The frontend is due for a major redesign since it doesn't really make a lot of sense rn.

## Shitty notetaking
game plan for interface:
top bar just has about dialogue, nothing else
then, individual pour things
then, recipe things
then, add a recipe thing

individual pour things have "pour", "edit" buttons.
edit buttons make pour thing editable. uses data select that draws ingredients from recipes
pour things are updated constantly

recipe things have "pour", remove buttons. pouring also opens dialogue box that indicates what you need to finish it.
constantly updated.

add a recipe thing is an integrated menu. lets you add list of ingredients and mL to use.
