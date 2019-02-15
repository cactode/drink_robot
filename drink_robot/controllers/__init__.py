from drink_robot.controllers.index import bp as index
from drink_robot.controllers.recipe import bp as recipe
from drink_robot.controllers.bottle import bp as bottle
from drink_robot.controllers.pour import bp as pour
import pigpio

def init_pins(app):
    if app.config['DEBUG']:
        return
    gpio = pigpio.pi()
    for pin in app.config['PINS'].values():
        gpio.set_mode(pin, pigpio.OUTPUT)
        gpio.write(pin, 1)


def init_all_blueprints(app):
    app.register_blueprint(index)
    app.register_blueprint(recipe)
    app.register_blueprint(bottle)
    app.register_blueprint(pour)