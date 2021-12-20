import json
import os
import pymysql
from sqlalchemy import create_engine, insert, Table, MetaData, Table, Column, Integer, String, text
from flask import jsonify

db_user = os.environ.get('CLOUD_SQL_USERNAME')
db_password = os.environ.get('CLOUD_SQL_PASSWORD')
db_ip = os.environ.get('CLOUD_SQL_IP')

"""
def open_connection2():
    unix_socket = '/cloudsql/{}'.format(db_connection_name)
    try:
        if os.environ.get('GAE_ENV') == 'standard':
            conn = pymysql.connect(user=db_user,
								   password=db_password,
                                   unix_socket=unix_socket,
								   db=db_name,
                                   cursorclass=pymysql.cursors.DictCursor)
            return conn
    except Exception as e:
        print(e)
"""

"""
def open_connection() -> sqlalchemy.engine.Engine:
    def getconn() -> pymysql.connections.Connection:
        conn: pymysql.connections.Connection = connector.connect(
            os.environ["MYSQL_CONNECTION_NAME"],
            "pymysql",
            user=os.environ["MYSQL_USER"],
            password=os.environ["MYSQL_PASS"],
            db=os.environ["MYSQL_DB"],
        )
        return conn

    engine = sqlalchemy.create_engine(
        "mysql+pymysql://",
        creator=getconn,
    )
    return engine
"""
databaseName = "onlyPetsDatabase"

meta = MetaData()
user2 = Table(
   'user2', meta, 
   Column('userid', String, primary_key = True), 
   Column('username', String), 
   Column('password', String), 
)

def open_connection():
    engineUrl = f"mysql+pymysql://{db_user}:{db_password}@{db_ip}"
    engine = create_engine(engineUrl, echo=True)
    return engine.connect()

def search_by_username(username):
    try:
        connection = open_connection()
        connection.execute(f'USE {databaseName}')
        query = f'SELECT username FROM user WHERE username LIKE \"{username}\"'
        results = connection.execute(query)
        connection.close()
        return json.dumps(results)
    except:
        return json.dumps([])

def authentication(username, password):
    try:
        connection = open_connection()
        connection.execute(f'USE {databaseName}')
        query = f"SELECT password FROM user WHERE username = \"{username}\""
        results = connection.execute(query)
        connection.close()
        for result in results:
            if result['password'] == password:
                return {'message': 'User verified'}, 200
    except Exception as e:
        print(e)
        return {'message': 'Invalid User'}, 200
        # return {'message': 'Invalid User', 'error': json.dumps(e)}, 401
    return {'message': 'Invalid User'}, 200


class UserModel:
    def __init__(self, userid, username, password):
        self.userid = userid
        self.username = username
        self.password = password

    @classmethod
    def find_by_username(self, username):
        connection = open_connection()
        connection.execute(f'USE {databaseName}')
        query = f"SELECT * FROM user WHERE username = \"{username}\""
        results = connection.execute(query)
        row = results.fetchone()
        connection.close()
        
        if row is not None:
            return row
        else:
            return None

    @classmethod
    def find_by_userid(self, userid):
        connection = open_connection()
        connection.execute(f'USE {databaseName}')
        query = f"SELECT * FROM user WHERE userid = \"{userid}\""
        results = connection.execute(query)
        row = results.fetchone()
        connection.close()

        if row is not None:
            return row
        else:
            return None

    def delete(self):
        try:
            connection = open_connection()
            trans = connection.begin()
            connection.execute(f'USE {databaseName}')
            query = f"DELETE FROM user WHERE userid = \"{self.userid}\""
            results = connection.execute(query)
            trans.commit()
            connection.close()
        except:
            raise Exception(f'Error while deleting userid: {self.userid}')
    
    def update_password(self, password):
        try:
            connection = open_connection()
            trans = connection.begin()
            connection.execute(f'USE {databaseName}')
            query = f"UPDATE user SET password = \"{self.password}\" WHERE userid = \"{self.userid}\""
            results = connection.execute(query)
            trans.commit()
            connection.close()
            self.password = password
        except:
            raise Exception(f'Error while updating the password from userid: {self.userid}')
    
    def create_new_user(self):
        try:
            connection = open_connection()
            trans = connection.begin()
            connection.execute(f'USE {databaseName}')
            query = text(f"INSERT INTO user (userid, username, password) VALUES (\"{self.userid}\", \"{self.username}\", \"{self.password}\")")
            """ another way to insert
            query = user2.insert().values(
                userid=self.userid,
                username=self.username,
                password=self.password
            )
            """
            results = connection.execute(query)
            trans.commit()
            connection.close()
        except Exception as e:
            print(e)
            raise Exception(f'Error while creating user with userid: {self.userid,}, username: {self.username}')

