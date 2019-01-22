# Default Sample

## Getting Started

### Prerequisite

- Build & deploy a bot using Microsoft Bot Framework
- Add Direct line channel to bot service
- Copy the channel secret (you'll need to run this sample)

### Running the Sample

First replace your bot channel secret inside the javascript file at the section shown below:

``` js
({
    token: '<< ADD YOR DIRECT LINE TOKEN HERE >>'
})
```

In order to run this sample, run the following commands:

``` sh
npx serve
```

Visit [http://localhost:5000](http://localhost:5000)

### IE Support

The sample here uses newer Javascript syntax such as arrow (=>) functions that do not work well on older browsers. In order to support older browsers such as IE we need to polyfill the features and generate ES5 (or compatible) javascript.

In order to polyfill functions core-js has already been added to the HTML. Below script detects browser and adds respective script references onto the page.

``` html
<script type="text/javascript">
    if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {

        // Add Core-JS polyfill
        document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.2/core.min.js"><\/script>');

        // Add ES5 version of webchat control
        document.write('<script src="https://cdn.botframework.com/botframework-webchat/master/webchat-es5.js"><\/script>');

        // Add ES5 version of bot initialization script
        document.write('<script src="chat-bot.es5.js"><\/script>');
    } else {

        // Add full-version of webchat control
        document.write('<script src="https://cdn.botframework.com/botframework-webchat/master/webchat.js"><\/script>');

        // Add bot initialization script
        document.write('<script src="chat-bot.js"><\/script>');
    }
</script>
```

As you can see for IE we have added chat-bot.es5.js, we can compile our script using babel to generate this file.

To run Babel from `src/default` directory run:

``` sh
npm install
npm run-script build

# Launch Page
npm run-script run
```