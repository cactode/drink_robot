from flask import Blueprint, request, jsonify, current_app, abort


bp = Blueprint('bottle', __name__)

@bp.route('/bottle/', methods=['GET'])
def all_bottle():
	if request.method == 'GET':
		return jsonify(current_app.config['MAPPING'])


@bp.route('/bottle/<int:location>', methods=['GET', 'POST'])
def bottle(location):
	if request.method == 'GET':
		ingredient = current_app.config['MAPPING'].get(location, None)
		return jsonify(ingredient)

	if request.method == 'POST':
		ingredient = request.get_json().get('ingredient', None)
		current_app.config['MAPPING'][location] = ingredient
		return jsonify(True)
