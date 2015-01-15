from tornado.ioloop import IOLoop
from tornado.web import RequestHandler, Application, url

import sqlite3
import json

def _execute(query, params=()):
	"""Function to execute queries against a local sqlite database"""
	dbPath = "database.db"
	connection = sqlite3.connect(dbPath)
	cursor = connection.cursor()
	try:
		cursor.execute(query, params)
		result = cursor.fetchall()
		connection.commit()
	except Exception:
		raise
	connection.close()
	return result

class MainApplication(Application):
	"""Main application"""
	def __init__(self, **kw):
		handlers = [
			url(r"/", MainHandler),
		]
		super(MainApplication, self).__init__(handlers, **kw)
		
class MainHandler(RequestHandler):
	"""Main handler of Application"""
	
	def get(self):
		"""Returns list of rows from database"""
		rows = _execute('SELECT * FROM links')
		data_list = []
		for row in rows:
			data_list.append(row)
		self.write(json.dumps(data_list))

	def post(self):
		"""Post new data as a JSON"""
		new_data = self.get_arguments('link')
		for link in new_data:
			_execute("INSERT INTO links (link) VALUES (?)", (link,))
		self.write(json.dumps({'result': 'OK'}))

def make_app():
	return MainApplication(**{'autoreload': True})

if __name__ == '__main__':
	application = make_app()
	application.listen(8080)
	IOLoop.current().start()
		
