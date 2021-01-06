from flask import Flask
from mongoengine import connect

def create_app():
	app = Flask(__name__)
	app.config.from_pyfile('config.py')

	connect(app.config['MONGO_DB_NAME'], host=app.config['MONGO_DB_HOST'], connect=False)

	from .leaderboard import leaderboard
	app.register_blueprint(leaderboard)

	return app