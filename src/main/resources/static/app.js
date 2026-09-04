let stompClient = null;

let username = "";

let typingTimer = null;

const loginScreen =
    document.getElementById("loginScreen");

const chatApp =
    document.getElementById("chatApp");

const usernameInput =
    document.getElementById("usernameInput");

const joinButton =
    document.getElementById("joinButton");

const messageForm =
    document.getElementById("messageForm");

const messageInput =
    document.getElementById("messageInput");

const messages =
    document.getElementById("messages");

const usersList =
    document.getElementById("usersList");

const onlineCount =
    document.getElementById("onlineCount");

const connectionDot =
    document.getElementById("connectionDot");

const connectionText =
    document.getElementById("connectionText");

const typingIndicator =
    document.getElementById("typingIndicator");


/* ================================
   JOIN BUTTON
================================ */

joinButton.addEventListener("click", joinChat);

usernameInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        joinChat();
    }

});


function joinChat() {

    const name =
        usernameInput.value.trim();

    if (!name) {

        usernameInput.focus();

        return;
    }

    username = name;

    loginScreen.classList.add("hidden");

    chatApp.classList.remove("hidden");

    connect();
}


/* ================================
   WEBSOCKET CONNECTION
================================ */

function connect() {

    setConnectionStatus(
        "Connecting...",
        false
    );

    const protocol =
        window.location.protocol === "https:"
            ? "wss"
            : "ws";

    const socketUrl =
        `${protocol}://${window.location.host}/ws`;

    stompClient =
        new StompJs.Client({

            brokerURL: socketUrl,

            reconnectDelay: 5000,

            heartbeatIncoming: 10000,

            heartbeatOutgoing: 10000,

            connectHeaders: {
                username: username
            },

            debug: function () {
                // Disable STOMP debug logs
            }

        });


    stompClient.onConnect = function () {

        setConnectionStatus(
            "Connected",
            true
        );

        subscribeToTopics();

        sendJoinMessage();

        messageInput.focus();
    };


    stompClient.onStompError = function (frame) {

        console.error(
            "STOMP error:",
            frame.headers["message"]
        );

        setConnectionStatus(
            "Connection error",
            false
        );
    };


    stompClient.onWebSocketError = function () {

        setConnectionStatus(
            "Connection error",
            false
        );
    };


    stompClient.onWebSocketClose = function () {

        setConnectionStatus(
            "Disconnected",
            false
        );
    };


    stompClient.activate();
}


/* ================================
   SUBSCRIPTIONS
================================ */

function subscribeToTopics() {

    stompClient.subscribe(
        "/topic/messages",
        function (message) {

            const chatMessage =
                JSON.parse(message.body);

            displayMessage(chatMessage);
        }
    );


    stompClient.subscribe(
        "/topic/users",
        function (message) {

            const userStatus =
                JSON.parse(message.body);

            updateUsers(
                userStatus.users || []
            );
        }
    );


    stompClient.subscribe(
        "/topic/typing",
        function (message) {

            const data =
                JSON.parse(message.body);

            if (data.sender !== username) {

                showTyping(
                    data.sender,
                    data.typing
                );
            }
        }
    );
}


/* ================================
   JOIN MESSAGE
================================ */

function sendJoinMessage() {

    stompClient.publish({

        destination: "/app/chat.join",

        body: JSON.stringify({

            sender: username,

            content: "",

            type: "JOIN"

        })

    });
}


/* ================================
   SEND MESSAGE
================================ */

messageForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        sendMessage();

    }
);


messageInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();
        }

    }
);


function sendMessage() {

    if (!stompClient ||
        !stompClient.connected) {

        return;
    }

    const content =
        messageInput.value.trim();

    if (!content) {
        return;
    }


    stompClient.publish({

        destination: "/app/chat.send",

        body: JSON.stringify({

            sender: username,

            content: content,

            type: "CHAT"

        })

    });


    messageInput.value = "";

    sendTyping(false);
}


/* ================================
   DISPLAY MESSAGE
================================ */

function displayMessage(message) {

    const welcome =
        document.querySelector(
            ".welcome-message"
        );

    if (welcome) {
        welcome.remove();
    }


    if (message.type === "JOIN" ||
        message.type === "LEAVE") {

        const system =
            document.createElement("div");

        system.className =
            "system-message";

        system.textContent =
            message.content;

        messages.appendChild(system);

        scrollToBottom();

        return;
    }


    const wrapper =
        document.createElement("div");

    wrapper.className = "message";


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        getInitial(message.sender);


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const meta =
        document.createElement("div");

    meta.className =
        "message-meta";


    const sender =
        document.createElement("span");

    sender.className =
        "message-sender";

    sender.textContent =
        message.sender;


    const time =
        document.createElement("span");

    time.className =
        "message-time";

    time.textContent =
        message.timestamp || "";


    const text =
        document.createElement("div");

    text.className =
        "message-text";

    text.textContent =
        message.content;


    meta.appendChild(sender);

    meta.appendChild(time);

    content.appendChild(meta);

    content.appendChild(text);

    wrapper.appendChild(avatar);

    wrapper.appendChild(content);

    messages.appendChild(wrapper);

    scrollToBottom();
}


/* ================================
   USERS
================================ */

function updateUsers(users) {

    usersList.innerHTML = "";

    const uniqueUsers =
        [...new Set(users)];

    onlineCount.textContent =
        uniqueUsers.length;


    uniqueUsers.forEach(function (user) {

        const userElement =
            document.createElement("div");

        userElement.className =
            "user";


        const avatar =
            document.createElement("div");

        avatar.className =
            "avatar";

        avatar.textContent =
            getInitial(user);


        const info =
            document.createElement("div");


        const name =
            document.createElement("div");

        name.className =
            "user-name";

        name.textContent =
            user;


        const status =
            document.createElement("div");

        status.className =
            "user-status";

        status.textContent =
            "● Online";


        info.appendChild(name);

        info.appendChild(status);


        userElement.appendChild(avatar);

        userElement.appendChild(info);


        usersList.appendChild(userElement);

    });
}


/* ================================
   TYPING
================================ */

messageInput.addEventListener(
    "input",
    function () {

        sendTyping(true);

        clearTimeout(typingTimer);

        typingTimer = setTimeout(
            function () {
                sendTyping(false);
            },
            1000
        );

    }
);


function sendTyping(isTyping) {

    if (!stompClient ||
        !stompClient.connected) {

        return;
    }


    stompClient.publish({

        destination: "/app/chat.typing",

        body: JSON.stringify({

            sender: username,

            typing: isTyping

        })

    });
}


function showTyping(sender, typing) {

    if (typing) {

        typingIndicator.textContent =
            `${sender} is typing...`;

    } else {

        typingIndicator.textContent =
            "";

    }
}


/* ================================
   CONNECTION STATUS
================================ */

function setConnectionStatus(
    text,
    connected
) {

    connectionText.textContent =
        text;

    connectionDot.style.background =
        connected
            ? "#31d68b"
            : "#f2b84b";
}


/* ================================
   UTILITIES
================================ */

function getInitial(name) {

    return name
        ? name.charAt(0).toUpperCase()
        : "?";
}


function scrollToBottom() {

    messages.scrollTo({

        top: messages.scrollHeight,

        behavior: "smooth"

    });
}


/* ================================
   BEFORE UNLOAD
================================ */

window.addEventListener(
    "beforeunload",
    function () {

        if (stompClient &&
            stompClient.connected) {

            stompClient.publish({

                destination:
                    "/app/chat.leave",

                body: JSON.stringify({

                    sender: username,

                    content: "",

                    type: "LEAVE"

                })

            });

            stompClient.deactivate();
        }

    }
);