from socket import *
from webbrowser import get

# server host and port initialization
serverPort = 12000

# create welcoming TCP socket:
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(("",serverPort))  # binds the host name with the serverPort number as a pair

# allows the server to listen to TCP requests 
serverSocket.listen(1)

# print statement will ensure when the socket is listening and ready
print("Connected")

# empty string used to intialize message holder from client
message = "" 
# while server socket is listening,
while(1):
    (connectionSocket, addr) = serverSocket.accept() # connection socket is created and accepts incoming requests from an individual client  
    dataFromClient = connectionSocket.recv(1024) # receives request from client 
    print("NEW SOCKET CREATED") # print statement for testing purposes
    message = dataFromClient.decode()
    if message != "":
        print("MESSAGE DECODED AND TEMPORARILY STORED IN VARIABLE \r\n")
        messageToUpper = dataFromClient.upper()
        print("TEST: MESSAGE MODIFIED TO UPPERCASE")
        connectionSocket.send(messageToUpper) # reads bytes from socket (send() can only be used with a connected socket)
        print("TEST: MESSSAGE SENT TO CLIENT")
        connectionSocket.close() # closes socket
        print("ClOSED/END")
    else:
        print("MESSAGE NOT STORED \r\n")




