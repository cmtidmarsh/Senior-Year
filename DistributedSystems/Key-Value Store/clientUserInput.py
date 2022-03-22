from socket import *

serverHost = 'localhost'
serverPort = 12000
dict = {}
key = 0


# def not used 
def getRequest(key):
    return value

def setRequest(key, value):
    dict[key] = value
    return dict


 # creating client socket
clientSocket = socket(AF_INET, SOCK_STREAM)
# connecting client socket to server and port
clientSocket.connect((serverHost,serverPort))
# user input
message = input("input lowercase sentence: ")
key =+ 1
# converting key integer value to string
toString = str(key)
# adds key and message to dictionary
setRequest(toString, message)
# gets the value at its key
getValue = dict.get(toString)
print("TEST: GETTING VALUE FROM DICTIONARY: ", getValue)
# encode value/message and send to server
clientSocket.send(getValue.encode())
# receive and decode new message from server
modifiedMessageFromServer = clientSocket.recv(1024)
newMessage = modifiedMessageFromServer.decode()
# create key for new message
key =+ 2
keyToString = str(key)
# add new key and new message to the dictionary
setRequest(keyToString, newMessage)

# prints dictionary with original value and new value 
print(dict) 
print ("Data from server:" , modifiedMessageFromServer.decode())

clientSocket.close()




