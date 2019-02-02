"""
This provides functions for loading some of the
model-based modules in this app. It also provides
a command for initializing the database for the
first time.
"""
import click

from flask.cli import with_appcontext

from drink_robot.models.db import db
from drink_robot.models.recipe import Recipe


@click.command('init-db')
@with_appcontext
def init_db_command():
    # destroy sqlite database and regen
    db.drop_all()
    db.create_all()

    click.echo('Initialized database.')


def init_db(app):
    # initialize sqlalchemy
    db.init_app(app)
    app.cli.add_command(init_db_command)
