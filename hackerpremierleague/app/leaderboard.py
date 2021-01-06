from flask import Blueprint, render_template, request, redirect, jsonify, make_response
from .model import Team, NotUniqueError, DoesNotExist

leaderboard = Blueprint('Leaderboard', __name__)

@leaderboard.route('/')
def index():
	return redirect('/leaderboard')	


@leaderboard.route('/leaderboard/')
def get_leaderboard():
	return render_template('leaderboard.html', teams = Team.objects())


@leaderboard.route('/new-team', methods = ['POST'])
def add_team():
	team_name = request.form['team_name']

	try:
		Team(team_name = team_name.title()).save()
	except NotUniqueError:
		return jsonify({'message':'Team name already exists!'})
	except:
		return jsonify({'message':'Internal error. Please try later.'})

	return jsonify({'success':'Team name added!'})


@leaderboard.route('/paring', methods = ['POST'])
def paring():

	try:
		team1 = Team.objects.get(team_name=request.json['team1'])
		team2 = Team.objects.get(team_name=request.json['team2'])

		if team1.team_name ==  team2.team_name:
			return jsonify({'message':'Teams cannot be same!'})

		if request.json['result'] == 'win':
			team1.score += 3
			team1.wins += 1
			team2.losses += 1
			team1.save()
			team2.save()
		elif request.json['result'] == 'tie':
			team1.score += 1
			team2.score += 1
			team1.ties += 1
			team2.ties += 1
			team1.save()
			team2.save()
	except DoesNotExist:
		return jsonify({'message':'Team does not exist!'})
	except:
		return jsonify({'message':'Internal error. Please try later.'})

	return jsonify({'success':'Score updated!'})


