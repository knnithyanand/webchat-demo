(function (token) {
    const styleOptions = {
        botAvatarImage: 'https://docs.botframework.com/images/bot_icon.png',
        botAvatarInitials: 'BF',
        userAvatarImage: 'https://github.com/knnithyanand.png?size=64',
        userAvatarInitials: 'KN',
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
        directLine: window.WebChat.createDirectLine(token),
        userID: '<< PROVIDE USER ID HERE >>',
        styleOptions,
        store
    }, document.getElementById('webchat'));

    document.querySelector('#webchat > *').focus();
})({
    token: '<< ADD YOR DIRECT LINE TOKEN HERE >>'
})

function toggleBot() {
    var element = document.getElementById("chat-box");
    element.classList.toggle("min");
  } 