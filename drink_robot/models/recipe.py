from drink_robot.models.db import db
from drink_robot.util import TextPickleType
from pprint import pformat


class Recipe(db.Model):
    __tablename__ = 'recipe'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    contents = db.Column(TextPickleType, nullable=False)

    def __repr__(self):
        return str(self.id) + pformat(self.contents)

    def to_dict(self):
    	return {'name': self.name, 'contents': self.contents}
