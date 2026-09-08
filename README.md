Flowtalk — Real-Time Chat Application

> A modern, real-time web chat application built with Spring Boot, WebSockets, STOMP, HTML, CSS, and JavaScript.



Flowtalk is a real-time global chat application that allows multiple users to connect through a browser and exchange messages instantly. The application uses Spring Boot WebSockets with STOMP messaging for low-latency communication and provides a modern, responsive, glassmorphism-inspired interface with animated background elements, connection status, online-member tracking, typing indicators, join/leave notifications, and message timestamps.


---

✨ Project Overview

Flowtalk demonstrates how a real-time communication system can be built using a Java/Spring Boot backend and a lightweight browser frontend without requiring a separate frontend framework.

The backend manages WebSocket connections and STOMP message routing, while the frontend connects to the WebSocket endpoint and updates the chat interface immediately whenever a message or user-status event is received.

Main capabilities

💬 Real-time global messaging

👥 Multiple users connected simultaneously

🟢 Online member tracking

🔔 Join and leave notifications

⌨️ Typing indicator

🕒 Message timestamps

🔌 WebSocket connection status

🔄 Automatic WebSocket reconnection

📱 Responsive modern UI

🎨 Animated/glassmorphism visual design

🌐 Browser-based usage with no separate frontend server



---

🚀 Key Features

Feature	Description

💬 Real-Time Messaging	Messages are delivered instantly through WebSockets.
👥 Online Members	Displays users currently connected to the chat.
🟢 Connection Status	Shows whether the WebSocket connection is active.
⌨️ Typing Indicator	Indicates when another participant is typing.
🔔 Join/Leave Events	Shows notifications when users enter or leave the chat.
🕒 Timestamps	Displays the time associated with each chat message.
🔄 Auto Reconnect	The STOMP client attempts to reconnect after connection loss.
📱 Responsive UI	Designed to work across desktop and smaller screens.
🎨 Modern Interface	Dark glassmorphism styling, gradients, glowing elements, and subtle animations.
🌐 Browser Based	No separate desktop/mobile application is required.



---

🛠️ Technologies Used

Backend

Java 21

Spring Boot 4.1.1

Spring Web MVC

Spring WebSocket

STOMP messaging

Maven

Embedded Apache Tomcat


Frontend

HTML5

CSS3

JavaScript

STOMP.js 7.2.1

Responsive CSS

CSS animations and visual effects


DevOps & Deployment

Docker

Multi-stage Docker builds

Render


Development Environment

IntelliJ IDEA

JDK 21

Maven

Modern web browser such as Chrome or Microsoft Edge



---

🧩 How the Application Works

Flowtalk follows a simple real-time messaging architecture:

┌──────────────────────┐
                    │      Browser 1       │
                    │ HTML/CSS/JavaScript  │
                    └──────────┬───────────┘
                               │
                         WebSocket / STOMP
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot       │
                    │   WebSocket Server   │
                    └──────────┬───────────┘
                               │
                     STOMP Message Broker
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
     /topic/messages                      /topic/users
              │                                 │
              │                                 │
              ▼                                 ▼
       Chat subscribers                  Online members
              │
              ▼
                    ┌──────────────────────┐
                    │      Browser 2       │
                    │ HTML/CSS/JavaScript  │
                    └──────────────────────┘

Message flow

1. A user enters a name on the Flowtalk welcome screen.


2. The JavaScript client creates a STOMP/WebSocket connection.


3. The client connects to the backend WebSocket endpoint:

/ws



4. The client subscribes to:

/topic/messages

/topic/users

/topic/typing



5. When a user sends a message, the client publishes it to:

/app/chat.send



6. ChatController receives the message using @MessageMapping.


7. The server adds the message type and timestamp.


8. The message is broadcast to /topic/messages.


9. Every subscribed client receives the message and updates its chat window immediately.


10. Connection events are used to maintain the online-user list.




---

📡 WebSocket & STOMP Destinations

Flowtalk uses STOMP destinations to separate incoming application messages from outgoing broker messages.

Client → Server

Destination	Purpose

/app/chat.send	Sends a chat message
/app/chat.join	Announces that a user joined
/app/chat.leave	Announces that a user left
/app/chat.typing	Sends typing-status information


Server → Clients

Destination	Purpose

/topic/messages	Broadcasts chat and join/leave messages
/topic/users	Broadcasts the current online-user list
/topic/typing	Broadcasts typing information


The application destination prefix is /app, while the simple broker uses /topic.


---

📁 Project Structure

Flowtalk/
│
├── Dockerfile
├── pom.xml
├── README.md
│
├── screenshots/
│   ├── entername_join.png
│   ├── runconsole_8081.png
│   ├── twouserchat.png
│   └── flowtalk-working-process.gif
│
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── example/
        │           └── flowtalk/
        │               │
        │               ├── FlowtalkApplication.java
        │               │
        │               ├── config/
        │               │   └── WebSocketConfig.java
        │               │
        │               ├── controller/
        │               │   └── ChatController.java
        │               │
        │               ├── listener/
        │               │   └── WebSocketEventListener.java
        │               │
        │               └── model/
        │                   ├── ChatMessage.java
        │                   └── UserStatus.java
        │
        └── resources/
            │
            ├── application.properties
            │
            └── static/
                ├── index.html
                ├── style.css
                └── app.js

Important files

FlowtalkApplication.java

Main Spring Boot application entry point.

WebSocketConfig.java

Enables STOMP over WebSockets, configures the /app application prefix, enables the in-memory /topic broker, and registers the /ws WebSocket endpoint.

ChatController.java

Handles chat, join, leave, and typing messages using STOMP @MessageMapping endpoints.

WebSocketEventListener.java

Tracks WebSocket session activity and broadcasts online-user information.

ChatMessage.java

Data model representing a chat message, including:

sender

content

type

timestamp


UserStatus.java

Data model containing the currently connected users.

index.html

Contains the Flowtalk login screen and chat application layout.

style.css

Provides the visual design, responsive layout, gradients, glass effects, animations, message bubbles, and mobile styling.

app.js

Creates the STOMP client, connects to the WebSocket server, subscribes to topics, publishes messages, handles typing status, updates the UI, and manages reconnection.


---

⚙️ Application Configuration

The application uses the following important configuration:

spring.application.name=Flowtalk
server.port=8081
spring.web.resources.cache.period=0

> Note: The screenshots in this project show Flowtalk running on port 8081. If your application.properties uses another port, replace 8081 in the URLs and commands below with your configured port.




---

🖥️ Step-by-Step: Run Flowtalk in IntelliJ IDEA

1. Install the prerequisites

Make sure the following are installed:

JDK 21

IntelliJ IDEA

Maven

Google Chrome, Microsoft Edge, or another modern browser


Verify Java:

java -version

Verify Maven:

mvn -version


---

2. Open the project

Open the Flowtalk project in IntelliJ IDEA.

The project should have the following basic Maven structure:

Flowtalk/
├── pom.xml
└── src/
    └── main/

Allow IntelliJ IDEA to import/reload the Maven dependencies.


---

3. Check the Maven configuration

The project uses:

Java 21

Spring Boot 4.1.1

Spring Web MVC

Spring WebSocket

Spring Boot Maven Plugin


The main dependencies are:

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>


---

4. Run the application

In IntelliJ IDEA, open:

src/main/java/com/example/flowtalk/FlowtalkApplication.java

Run:

FlowtalkApplication

or use the green Run ▶ button beside the main() method.

When the application starts successfully, the console should show that Tomcat has started on port 8081.


---

5. Open Flowtalk

Open your browser and visit:

http://localhost:8081

You should see the Flowtalk welcome screen.

Enter a username and click:

Join Chat →


---

6. Test real-time messaging

To test WebSocket communication:

1. Open Flowtalk in Chrome.


2. Enter a username, for example Dibyaman.


3. Open another browser or an Incognito window.


4. Visit http://localhost:8081.


5. Enter another username, for example Alock.


6. Join the chat.


7. Send messages from either window.


8. Verify that messages appear in both browser windows instantly.



This confirms that the WebSocket/STOMP communication is working.


---

🔨 Build the Application with Maven

From the Flowtalk project root:

mvn clean package

If the build succeeds, Maven creates the packaged application under:

target/

Typically:

target/flowtalk-0.0.1-SNAPSHOT.jar

Run the packaged application with:

java -jar target/flowtalk-0.0.1-SNAPSHOT.jar

Then open:

http://localhost:8081


---

🐳 Docker Support

Flowtalk can be containerized using Docker, making the application easier to build, run, and deploy consistently across different environments.

Docker packages the Spring Boot application together with its Java runtime environment, allowing Flowtalk to run as a portable container.

Dockerfile

The project uses a multi-stage Docker build:

# ---------- Build Stage ----------
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# ---------- Runtime Stage ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]

Build the Docker Image

From the Flowtalk project root:

docker build -t flowtalk .

This creates a Docker image named:

flowtalk

Run Flowtalk with Docker

For local Docker testing with the project's current port:

docker run -p 8081:8081 -e PORT=8081 flowtalk

Then open:

http://localhost:8081

Flowtalk should now be running inside a Docker container.

Docker Architecture

┌────────────────────────────────────────────┐
│              Docker Container              │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │       Eclipse Temurin JRE 21         │  │
│  │                                      │  │
│  │        Flowtalk Spring Boot          │  │
│  │             Application              │  │
│  │                                      │  │
│  │      WebSocket + STOMP + Tomcat      │  │
│  └──────────────────────────────────────┘  │
│                                            │
└─────────────────────┬──────────────────────┘
                      │
                 Port 8081
                      │
                      ▼
              ┌──────────────┐
              │    Browser   │
              └──────────────┘

Multi-Stage Docker Build

The Dockerfile uses two stages.

1. Build Stage

The Maven image is used to:

Download project dependencies

Compile the Spring Boot application

Package the application as a JAR file


2. Runtime Stage

The Java 21 JRE image is used to:

Run the generated JAR

Keep Maven and build dependencies out of the runtime image

Provide a cleaner production container


☁️ Docker Deployment on Render

Flowtalk can be deployed on Render using Docker.

The Dockerfile reads the PORT environment variable provided by the hosting platform:

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]

This allows the same Docker image to work both locally and on cloud platforms that dynamically assign the application port.

For local development, Flowtalk can continue using port 8081 through application.properties.

For cloud deployment, the platform-provided PORT value is used automatically.

Docker Benefits

📦 Consistent application environment

🚀 Easy deployment

🔄 Reproducible builds

☁️ Cloud-platform compatibility

🧩 Isolated runtime environment

🛠️ Simplified deployment process

🔧 No manual Java/Maven setup required on the deployment server



---

🧪 Testing Checklist

Use the following checklist after starting the application:

[x] Welcome/login screen loads

[x] Username can be entered

[x] Join Chat button works

[x] WebSocket connection becomes connected

[x] Chat page loads

[x] Messages can be sent

[x] Messages appear in multiple browser windows

[x] Join notifications are displayed

[x] Leave notifications are displayed

[x] Typing indicator works

[x] Message timestamps are displayed

[x] Connection status is visible

[x] Reconnection is configured

[x] Application can be containerized with Docker



---

🖼️ Screenshots

The screenshots are stored in the root-level screenshots folder.

1. Flowtalk Welcome Screen

The initial login screen where a user enters their name before joining the chat.



2. Spring Boot Console

The IntelliJ IDEA Run/Console window showing Flowtalk successfully starting with Spring Boot and Tomcat on port 8081.



3. Two-User Real-Time Chat

Two browser windows connected to the same Flowtalk server demonstrate real-time communication between users.



4. Working Process

The GIF below demonstrates the real-time working process of Flowtalk, showcasing how users connect and exchange messages instantly.




---

🎨 User Interface

Flowtalk uses a modern dark interface designed around:

Glassmorphism-style panels

Gradient backgrounds

Soft glowing effects

Rounded cards and buttons

Animated background shapes

Clear message bubbles

Online status indicators

Responsive layout

Minimal and professional typography


The interface contains two main states.

Welcome Screen

┌────────────────────────────────────┐
│              F  Flowtalk           │
│                                    │
│        Welcome to Flowtalk         │
│                                    │
│  Connect, chat and share moments   │
│             in real time.          │
│                                    │
│       [ Enter your name ]          │
│                                    │
│          [ Join Chat → ]           │
└────────────────────────────────────┘

Chat Screen

┌────────────────┬──────────────────────────────┐
│    Flowtalk    │          Global Chat         │
│                │                              │
│ Online Members │    Messages / Notifications │
│                │                              │
│ • User 1       │    User message              │
│ • User 2       │                              │
│ • User 3       │                              │
│                │                              │
│ Connection     │ [ Type a message... ] [Send]│
│   Connected    │                              │
└────────────────┴──────────────────────────────┘


---

🔐 Current Architecture Notes

Flowtalk currently uses Spring's simple in-memory message broker.

This architecture is ideal for:

Learning WebSockets

College/academic projects

Demonstrations

Local development

Small deployments

Proof-of-concept applications


For a large production deployment with multiple backend instances, an external message broker and persistent data storage should be considered.


---

🔮 Future Improvements

Flowtalk can be expanded into a more complete messaging platform.

Planned/Possible Improvements

🔐 User authentication and authorization

💾 Database-backed message history

👤 User profiles and avatars

💬 Private one-to-one messaging

👥 Chat rooms/groups

🔎 Message search

📎 File and image sharing

🖼️ Image previews

😀 Emoji picker and reactions

📨 Message delivery/read indicators

✏️ Edit and delete messages

🔔 Browser notifications

🟢 Better online/offline presence

📱 Progressive Web App support

🌙 Light/dark theme switcher

🛡️ Input validation and stronger security

🐇 RabbitMQ/external broker integration for scalable deployments

☁️ Cloud deployment improvements

🧪 Automated unit and integration tests

📊 Monitoring and application metrics



---

📌 Production Considerations

Before deploying Flowtalk publicly:

1. Replace permissive WebSocket origin configuration with trusted origins.


2. Add authentication and authorization.


3. Validate and sanitize user input.


4. Add persistent storage for users and messages.


5. Consider an external STOMP broker such as RabbitMQ for multi-instance deployments.


6. Add HTTPS/WSS.


7. Add rate limiting and abuse protection.


8. Add automated tests and monitoring.


9. Configure production logging.


10. Store configuration using environment variables rather than hard-coding deployment-specific values.


11. Configure Docker and cloud environment variables appropriately.


12. Use a production-ready external message broker when horizontal scaling is required.




---

📚 Learning Objectives

This project is useful for learning:

Spring Boot application development

WebSocket communication

STOMP messaging

Real-time event-driven applications

Spring message mapping

WebSocket session events

Java backend/frontend integration

REST-independent real-time communication

Maven project management

Responsive frontend development

JavaScript event handling

Real-time UI updates

Docker containerization

Multi-stage Docker builds

Cloud deployment concepts



---

🌐 Live Demo

Live Application:
https://flowtalk-4ovp.onrender.com/

The deployed version demonstrates the Flowtalk application running as a cloud-hosted Spring Boot application.

> Note: Because Flowtalk currently uses an in-memory message broker, the application is primarily intended as a learning/demo project rather than a highly scalable production chat platform.




---

💻 Source Code

GitHub Repository:
https://github.com/dibyaman-sahoo/FlowTalk

The complete source code, configuration, frontend files, backend implementation, Dockerfile, and project documentation are available in the repository.


---

👨‍💻 Project Information

Property	Details

Project Name	Flowtalk
Application Type	Real-Time Chat Application
Backend	Spring Boot + WebSockets + STOMP
Frontend	HTML + CSS + JavaScript
Java Version	21
Spring Boot	4.1.1
Build Tool	Maven
Containerization	Docker
Deployment	Render
Default Runtime Port	8081
WebSocket Endpoint	/ws
Application Prefix	/app
Broker Prefix	/topic



---

📄 License

This project can be used as a learning, academic, demonstration, or starter application.

Add an appropriate open-source license here if you plan to publish the project publicly.


---

⭐ Conclusion

Flowtalk demonstrates a complete real-time communication workflow using Spring Boot WebSockets and STOMP with a modern browser-based frontend.

The project combines backend WebSocket communication, STOMP messaging, real-time UI updates, online-user tracking, typing indicators, automatic reconnection, responsive frontend design, and Docker containerization.

It provides a strong foundation for learning real-time application development and can be extended with authentication, private messaging, persistent storage, file sharing, notifications, scalable message-broker infrastructure, automated testing, and production monitoring.


---

⭐ If you find this project useful

Consider giving the repository a star ⭐ on GitHub and sharing your feedback or suggestions.