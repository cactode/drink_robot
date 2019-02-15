"""
This creates the app and initializes all the components
in the right order.
"""
import os
from flask import Flask


def create_app(test_config=None):
    # create the flask object
    app = Flask(
        __name__,
        instance_relative_config=True,
        template_folder='views',
        static_folder='static',
        static_url_path='/static'
    )

    app.config.from_mapping(
        # a default secret that should be overridden by instance config
        SECRET_KEY='dev',
        DEBUG=True,
        SQLALCHEMY_DATABASE_URI='sqlite:///'+os.path.join(app.instance_path, 'drink_robot.sqlite'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        PINS={
            0: 21,
            1: 20,
            2: 26,
            3: 16,
            4: 19,
            5: 13,
            6: 12,
            7: 6
        },
        MAPPING={},
        TAU=0.04 # seconds per milliliter
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.update(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


    # initialize physical valves
    from drink_robot.controllers import init_pins
    init_pins(app)

    # start initializing app components
    # set up blueprints for each page
    from drink_robot.controllers import init_all_blueprints
    init_all_blueprints(app)

    # set up database
    from drink_robot.models import init_db
    init_db(app)

    # return our precious summer child
    return app