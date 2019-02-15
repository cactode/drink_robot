from flask import Blueprint, request, abort, jsonify, current_app
from drink_robot.models.db import db
from drink_robot.models.recipe import Recipe
import json

bp = Blueprint('recipe', __name__)

@bp.route('/recipe', methods=['GET', 'POST', 'DELETE'])
def recipe():
    if request.method == 'GET':
        name = request.args.get('name', None)
        if not name:
            return jsonify([r.to_dict() for r in Recipe.query.all()])
        else:
            return jsonify(recipe.query.filter_by(name=name).first().to_dict())

    if request.method == 'POST':
        name = request.form.get('name', None)
        contents = request.form.get('contents', None)
        if not name or not contents:
            abort(400)

        if Recipe.query.filter_by(name=name).all():
            abort(409)

        contents = json.loads(contents)
        new_recipe = Recipe(name=name, contents=contents)
        db.session.add(new_recipe)
        db.session.commit()
        return jsonify(contents)

    if request.method == 'DELETE':
        name = request.form.get('name', None)
        if not name:
        	abort(400)
        recipe = Recipe.query.filter_by(name=name).first()
        if not recipe:
        	abort(404)
        db.session.delete(recipe)
        db.session.commit()
        return name