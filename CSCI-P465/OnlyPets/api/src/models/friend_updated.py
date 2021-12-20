from sqlite3.dbapi2 import Cursor
from flask import request
from flask import Flask,jsonify,Request,abort
from sqlalchemy import create_engine, insert, Table, MetaData, Table, Column, Integer, String, text
import json
#1. - Load libraries
import sqlite3
import pandas as pd

# 2.- Create your connection.
def open_connection_sqlite3():
    cnx = sqlite3.connect(
        'friend_sqlitedb.db')
    cursor = cnx.cursor()
    return cnx,cursor

def open_connection():
    engineUrl = f"mysql+pymysql://root:onlypets@34.67.163.10"
    engine = create_engine(engineUrl, echo=True)
    return engine.connect()


databaseName = "onlyPetsDatabase"

# connection = open_connection()
# trans = connection.begin()
# connection.execute(f'USE {databaseName}')
# query = f"DELETE FROM user2 WHERE userid = \"{self.userid}\""
# results = connection.execute(query)
# trans.commit()
# connection.close()
app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# 2 methods
# 1) send friend request: accepts from_user_id and to_user_id and inserts request in friend_requests
# 2) get_requests: accepts user_id and returns  all the requests to that user


# freind_request DDL
# CREATE TABLE friend_requests(
#     from_user_id VARCHAR,
#     to_user_id VARCHAR
# )

#freind_requests DML
# INSERT INTO friend_requests(from_user_id, to_user_id)
# VALUES('a',	'b' );


@app.route('/api/send_request', methods=['POST'])
def send_request():
    # if not request.json or not 'title' in request.json:
    #     abort(400)
    request_body = request.get_json()
    from_user_id = request_body['from_user_id']
    to_user_id = request_body['to_user_id']
    
    #sqlite3
    # cnx,cursor = open_connection_sqlite3()
    # try:
    #     cursor.execute('insert into friend_requests values (?,?)',
    #                    (from_user_id, to_user_id))
    #     cnx.commit()
    #     return jsonify({'data': ''}), 201
    # except:
    #     abort(400)
    #mysql 
    try:
        connection = open_connection()
        trans = connection.begin()
        connection.execute(f'USE {databaseName}')
        query = "insert into friend_requests values ('"+from_user_id+"','"+ to_user_id+"')"
        results = connection.execute(query)
        trans.commit()
        connection.close()
        return jsonify({'data': ''}), 201
    except:
        abort(401)
    

    

# 2) view friend requests
@app.route('/api/get_requests', methods=['GET'])
def get_requests():
    user_id = request.args.get('user_id')
    # print(user_id)
    # cnx,cursor = open_connection_sqlite3()
    # cursor.execute(
    #     "SELECT from_user_id FROM friend_requests WHERE to_user_id=(?);",(user_id))
    # # query_out = cursor.fetchall()
    # list_userids = [x[0] for x in cursor.fetchall()]
    # # print(list_userids)
    # return jsonify(
    #     {'data':{'count':len(list_userids),'user_ids':list_userids}}
    # )
    try:
        connection = open_connection()
        trans = connection.begin()
        connection.execute(f'USE {databaseName}')
        query = "SELECT from_user_id FROM friend_requests WHERE to_user_id = '"+user_id+"'"
        results = connection.execute(query)
        list_userids = [row['from_user_id'] for row in results]
        # for result in results:
        #     print(result['from_user_id'])
        trans.commit()
        connection.close()
        return jsonify(
                {'data':{'count':len(list_userids),'user_ids':list_userids}}
            )
    except:
        abort(401)

# 3) approve request
@app.route('/api/approve', methods=['POST'])
def approve():
    request_body = request.get_json()
    from_user_id = request_body['from_user_id']
    to_user_id = request_body['to_user_id']
    print(from_user_id,to_user_id)
    # cnx, cursor = open_connection_sqlite3()
    # try:
    #     cursor.execute(
    #         "UPDATE  user_network set connection_type = 'follow' WHERE user_id1=(?) and user_id2=(?);", (from_user_id, to_user_id))
    #     # cursor.execute(
    #     #     "UPDATE  friend_requests set connection = 'follow' WHERE user_id1=(?) and user_id2=(?);", (to_user_id, from_user_id))
    #     cnx.commit()
    #     return jsonify({'data': ''}), 201
    # except:
    #     abort(400)

    try:
        connection = open_connection()
        trans = connection.begin()
        connection.execute(f'USE {databaseName}')
        query = "UPDATE  user_network set connection_type = 'follow' WHERE user_id1='"+from_user_id+"'"+" and user_id2='"+to_user_id+"'"
        results = connection.execute(query)
        # for result in results:
        #     print(result['from_user_id'])
        trans.commit()
        connection.close()
        return jsonify({'data': ''}), 201
    except:
        abort(401)


# 4) deny request
@app.route('/api/deny', methods=['POST'])
def deny():
    request_body = request.get_json()
    from_user_id = request_body['from_user_id']
    to_user_id = request_body['to_user_id']
    # cnx, cursor = open_connection_sqlite3()
    # try:
    #     cursor.execute(
    #         "DELETE FROM friend_requests WHERE from_user_id=(?) and to_user_id=(?);", (from_user_id, to_user_id))
    #     cnx.commit()
    #     return jsonify({'data': ''}), 201
    # except:
    #     abort(400)
    try:
        connection = open_connection()
        trans = connection.begin()
        connection.execute(f'USE {databaseName}')
        query = "DELETE FROM friend_requests WHERE from_user_id='"+from_user_id+"' and to_user_id='"+to_user_id+"'"
        results = connection.execute(query)
        # for result in results:
        #     print(result['from_user_id'])
        trans.commit()
        connection.close()
        return jsonify({'data': ''}), 201
    except:
        abort(401)
    # pass

# 5) unfriend
@app.route('/api/unfollow', methods=['POST'])
def unfriend():
    request_body = request.get_json()
    from_user_id = request_body['from_user_id']
    to_user_id = request_body['to_user_id']
    cnx, cursor = open_connection_sqlite3()
    # try:
    #     cursor.execute(
    #         "UPDATE  user_network set connection_type = 'unfollow' WHERE user_id1=(?) and user_id2=(?);", (from_user_id, to_user_id))
    #     cnx.commit()
    #     return jsonify({'data': ''}), 201
    # except:
    #     abort(400)
    try:
        connection = open_connection()
        trans = connection.begin()
        connection.execute(f'USE {databaseName}')
        query = "UPDATE  user_network set connection_type = 'unfollow' WHERE user_id1='"+from_user_id+ "' and user_id2='"+to_user_id+"';"
        results = connection.execute(query)
        # for result in results:
        #     print(result['from_user_id'])
        trans.commit()
        connection.close()
        return jsonify({'data': ''}), 201
    except:
        abort(401)


# 6) block  
@app.route('/api/block', methods=['POST'])
def block():
    request_body = request.get_json()
    from_user_id = request_body['from_user_id']
    to_user_id = request_body['to_user_id']
    cnx, cursor = open_connection_sqlite3()
    # try:
    #     cursor.execute(
    #         "UPDATE  user_network set connection_type = 'blocked' WHERE user_id1=(?) and user_id2=(?);", (from_user_id, to_user_id))
    #     cnx.commit()
    #     return jsonify({'data': ''}), 201
    # except:
    #     abort(400)
    try:
        connection = open_connection()
        trans = connection.begin()
        connection.execute(f'USE {databaseName}')
        query = "UPDATE  user_network set connection_type = 'blocked' WHERE user_id1='"+from_user_id+"' and user_id2='"+to_user_id+"';"
        results = connection.execute(query)
        # for result in results:
        #     print(result['from_user_id'])
        trans.commit()
        connection.close()
        return jsonify({'data': ''}), 201
    except:
        abort(401)

    pass
if __name__ == '__main__':
    app.run(port=8000,debug=True)