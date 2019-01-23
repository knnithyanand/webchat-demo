(async function (configUri) {
    // Fetch bot configuration from JSON file
    const res = await fetch(configUri, { method: 'GET' });
    const botConfig = await res.json();
    const { token } = botConfig;

    const styleOptions = {
        botAvatarImage: botConfig.botAvatarImage,
        botAvatarInitials: botConfig.botAvatarInitials,
        userAvatarImage: botConfig.userAvatarImage,
        userAvatarInitials: botConfig.userAvatarInitials,
        hideUploadButton: true,
        bubbleBackground: 'rgba(0, 0, 255, .1)',
        bubbleFromUserBackground: 'rgba(0, 255, 0, .1)'
    };

    // We are using a customized store to add hooks to connect event
    const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
            // When we receive DIRECT_LINE/CONNECT_FULFILLED action, we will send an event activity using WEB_CHAT/SEND_EVENT
            dispatch({
                type: 'WEB_CHAT/SEND_EVENT',
                payload: {
                    name: 'webchat/join',
                    value: { language: window.navigator.language }
                }
            });
        }
        return next(action);
    });

    window.WebChat.renderWebChat({
        directLine: window.WebChat.createDirectLine({ token }),
        userID: botConfig.userID,
        styleOptions,
        store
    }, document.getElementById('webchat'));

    document.querySelector('#webchat > *').focus();
})('./bot-config.json')

function toggleBot() {
    var element = document.getElementById("chat-box");
    element.classList.toggle("min");
} 