(function() {
    // The addEvent function is a cross-browser way to add event listeners to elements. It checks if the browser supports addEventListener (modern browsers) and uses it if available. If not, it falls back to attachEvent (older versions of Internet Explorer). This ensures that the event handling works across different browsers.
    function addEvent(el, event, handler) {
        if (el.addEventListener) {
            el.addEventListener(event, handler);
        } else if (el.attachEvent) {
            el.attachEvent('on' + event, handler);
        }
    }

    // Handle menu toggle clicks
    var menuToggleElement = document.getElementById('menu-toggle');
    if (menuToggleElement !== null) {
        addEvent(menuToggleElement, 'click', function(e) {
            e = e || window.event;
            if (document.body.className.indexOf('menu-open') >= 0) {
                document.body.className = document.body.className.replace(/\s*menu-open\s*/g, ' ').replace(/^\s+|\s+$/g, ''); // .replace(/^\s+|\s+$/g, '') works the same as .trim() but is more widely supported by older browsers
                menuToggleElement.setAttribute('aria-expanded', 'false');
            } else {
                document.body.className = (document.body.className + ' menu-open').replace(/^\s+|\s+$/g, ''); // .replace(/^\s+|\s+$/g, '') works the same as .trim() but is more widely supported by older browsers
                menuToggleElement.setAttribute('aria-expanded', 'true');
            }
            if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
            if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
        });

        // <span role='button'> doesn’t synthesize click on Space like native <a>/<button> elements do
        if (menuToggleElement.tagName !== 'A') {
            addEvent(menuToggleElement, 'keydown', function(e) {
                e = e || window.event;
                if (e.key === ' ' || e.key === 'Enter' || e.keyCode === 32 || e.keyCode === 13) {
                    if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
                    menuToggleElement.click();
                }
            });
        }
    }

    // Inject <span class='copy-code'> elements into code blocks
    if (document.querySelectorAll) { // Only inject the elements if the browser supports querySelectorAll (IE8+) otherwise we skip them
        document.addEventListener('DOMContentLoaded', function() {
            var codeBlocks = document.querySelectorAll('pre code');

            Array.prototype.forEach.call(codeBlocks, function(codeBlock) {
                var span = document.createElement('span');
                span.innerHTML = '<i class="fa-solid fa-copy"></i>Copy';
                span.className = 'copy-code';
                span.title = 'Copy';
                span.addEventListener('click', function() {
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                            span.innerHTML = 'Copied &#10003;';
                        });
                    } else {
                        var range = document.createRange();
                        range.selectNodeContents(codeBlock);
                        var selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);

                        try {
                            document.execCommand('copy');
                            span.innerHTML = 'Copied &#10003;';
                        } catch(e) {
                        }

                        selection.removeAllRanges();
                    }

                    setTimeout(function() {
                        span.innerHTML = '<i class="fa-solid fa-copy"></i>Copy';
                    }, 5000); // Reset the button text after 5 seconds
                });

                var pre = codeBlock.parentNode;
                pre.parentNode.insertBefore(span, pre);
            });
        });
    }
})();
