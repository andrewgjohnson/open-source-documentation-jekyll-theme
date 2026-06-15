(function() {
    // Handle menu toggle clicks
    var menuToggleElement = document.getElementById('menu-toggle');
    if (menuToggleElement !== null) {
        menuToggleElement.addEventListener('click', function(e) {
            if (document.body.className.indexOf('menu-open') >= 0) {
                document.body.className = document.body.className.replace(/\s*menu-open\s*/g, ' ').trim();
                menuToggleElement.setAttribute('aria-expanded', 'false');
            } else {
                document.body.className = (document.body.className + ' menu-open').trim();
                menuToggleElement.setAttribute('aria-expanded', 'true');
            }
            e.preventDefault();
            e.stopPropagation();
        });

        // <span role='button'> doesn’t synthesize click on Space like native <a>/<button> elements do
        if (menuToggleElement.tagName !== 'A') {
            menuToggleElement.addEventListener('keydown', function(e) {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    menuToggleElement.click();
                }
            });
        }
    }

    // Inject <span class='copy-code'> elements into code blocks
    if (document.querySelectorAll) {
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
