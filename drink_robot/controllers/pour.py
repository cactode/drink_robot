from flask import Blueprint, abort, current_app, jsonify
from drink_robot.models.recipe import Recipe
import pigpio
from threading import Timer

bp = Blueprint('pour', __name__)


@bp.route('/pour/recipe/<name>', methods=['GET'])
def pour_recipe(name):
    recipe = Recipe.query.filter_by(name=name).first()
    if not recipe:
        abort(404)
    missing = {}
    for ingredient, amount in recipe.contents.items():
        if ingredient in current_app.config['MAPPING'].values():
            pour(ingredient, amount)
        else:
            missing[ingredient] = amount
    return jsonify(missing)


@bp.route('/pour/ingredient/<ingredient>/<amount>', methods=['GET'])
def pour_ingredient(ingredient, amount):
    if ingredient not in current_app.config['MAPPING'].values():
        abort(404)
    pour(ingredient, float(amount))
    return jsonify(None)


@bp.route('/pour/estop', methods=['GET'])
def estop():
    if current_app.config['DEBUG']:
        current_app.logger.info("ESTOP triggered!")
        return
    pi = pigpio.pi()
    for pin in current_app.config['PINS'].values():
        pi.write(pin, 1)
    pi.stop()
    return jsonify(None)


def pour(ingredient, amount):
    if current_app.config['DEBUG']:
        current_app.logger.info("Attempted to pour " + ingredient + " for " + str(amount))
        return
    pi = pigpio.pi()
    location = [i for i, j in current_app.config['MAPPING'].items()
                if j == ingredient][0]
    pin = current_app.config['PINS'][location]
    pi.write(pin, 0)
    time_to_pour = amount * current_app.config['TAU']
    Timer(time_to_pour, stop_pour,
          kwargs={'pi': pi, 'pin': pin}).start()


def stop_pour(pi, pin):
	pi.write(pin, 1)
	pi.stop() # gotta close it