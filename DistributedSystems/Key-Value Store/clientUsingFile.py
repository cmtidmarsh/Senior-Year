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
# message = input("input lowercase sentence: ")

# opens and reads given text file
f = open("readme.txt")
print("OPENED")
message2 = f.read() # takes contents from  file and stores in variable
f.close()
key =+ 1
toString = str(key)
# uses variable where contents are stored to add to dictionary with key
setRequest(toString, message2)
# setRequest(toString, message)
getValue = dict.get(toString)
print("TEST: GETTING VALUE FROM DICTIONARY: ", getValue)
clientSocket.send(getValue.encode())
modifiedMessageFromServer = clientSocket.recv(1024)
newMessage = modifiedMessageFromServer.decode()
key =+ 2
keyToString = str(key)
setRequest(keyToString, newMessage)
print(dict)
print ("Data from server:" , modifiedMessageFromServer.decode())

clientSocket.close()

