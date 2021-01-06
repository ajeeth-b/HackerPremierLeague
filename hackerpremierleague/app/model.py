from mongoengine import Document, StringField, IntField, NotUniqueError, DoesNotExist

class Team(Document):
	team_name = StringField(unique=True, required=True)
	wins      = IntField(default=0)
	losses    = IntField(default=0)
	ties      = IntField(default=0)
	score     = IntField(default=0)
