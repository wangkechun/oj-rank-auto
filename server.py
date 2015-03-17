from flask import *
import flask

app = Flask(__name__)

@app.route('/bower_components/<path:path>')
def bower(path):
	return flask.send_from_directory("bower_components", path)


@app.route('/json')
def jsondata():
	return flask.send_file('out.json')

@app.route('/')
def index():
	return flask.send_file('index.html')

app.run(debug=True)
