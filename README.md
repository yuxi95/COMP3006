# COMP3006 Assessment 2
# Project Name
Library management system
# Project Proposal
## Aim
This project aims to design and implement a distributed library management system, using MongoDB as a database, providing API services through Node.js server, and building a dynamic Web interface using HTML, CSS and JavaScript on the client side. The goal of the system is to provide efficient library management, user borrowing, book return and reservation functions.
## ABC-STACK
Server：Node.js  
MYSQL：MongoDB  
Client：HTML, CSS, JavaScript  
Communication：WebSockets  
# Systematic architecture design
This library management system adopts a distributed system architecture. The core components of the system include Server, Client and two-way communication module implemented through WebSockets. The following is the main architectural design of the system: （35）
- Client
Written with dynamic Web technology, HTML, CSS and JavaScript, it is the main interface for users to interact with the system
Real-time two-way communication through WebSockets and Server to support interaction between users and systems
Users interact through functions such as registration, login, retrieval, borrowing and returning

- Server
Provides a medium for the API by using the Express framework to handle HTTP requests and building with node.js
This end is mainly responsible for processing user requests such as borrowing and returning, etc., and transmits them back to the client through the use of WebSockets
User information and book information are stored in the MongoDB database in real time for retrieval

- WebSockets
Establish real-time two-way information transfer between the client and the server
Operations such as borrowing or returning are accepted through WebSockets
Users can understand the system update status in real time, which is more convenient

- MongoDB
Distributed advantages: Can run on multiple computers to implement distributed architectur
Storage books and user information, etc. 
