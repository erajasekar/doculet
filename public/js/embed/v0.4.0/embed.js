(function() {
    var clip = new ClipboardJS('.copy-btn', {
        target: function(trigger) {
        return trigger.parentNode.nextElementSibling;
        }
    });

    clip.on('success', function(event) {
        event.clearSelection();
        event.trigger.attributes['tooltip'].value = "Copied";
        window.setTimeout(function() {
            event.trigger.attributes['tooltip'].value = "Copy";
        }, 5000);
    });

    var embedContainer = document.getElementById('embed-container');

    // To support embedly auto height adjustment https://docs.embed.ly/v1.0/docs/provider-height-resizing
    window.addEventListener('DOMContentLoaded', function(){
        window.parent.postMessage(getIframeResizeMessage(), '*')
    })

    window.addEventListener('resize', function(){
        window.parent.postMessage(getIframeResizeMessage(), '*')
    })

    var toggleThemeBtn = document.getElementById("toggle-theme-btn");
    toggleThemeBtn.addEventListener("click", toggleTheme);
    var primaryTheme = toggleThemeBtn.dataset.theme;
    var secondaryTheme = primaryTheme == "light" ? "dark" : "light";

    var codeStyleElement = document.getElementById("code-theme");
    var codeStylePrimary = codeStyleElement.getAttribute("href");
    var codeStyleSecondary = getSecondaryHref(codeStylePrimary, true);

    var themeStyleElement = document.getElementById("theme-selector");
    var themeStylePrimary = themeStyleElement.getAttribute("href");
    var themeStyleSecondary = getSecondaryHref(themeStylePrimary, false);

    function toggleTheme(){
        // TODO update tooltip text
        var newTheme = toggleThemeBtn.dataset.theme == primaryTheme? secondaryTheme : primaryTheme ;
        toggleThemeBtn.dataset.theme = newTheme;
        var isLight = newTheme == "light";
        toggleThemeBtn.setAttribute("tooltip", isLight ? "Dark code theme" : "Light code theme");

        updateIcon(isLight);
        updateStyle(newTheme);

    }

    function updateIcon(isLight) {
        var icon = toggleThemeBtn.querySelector("i");
        var isDark = !isLight;
        icon.classList.toggle("fa-moon", isLight);
        icon.classList.toggle("fa", isLight);
        icon.classList.toggle("fa-sun", isDark);
        icon.classList.toggle("far", isDark);
    }

    function updateStyle(newTheme) {
        var isPrimary = newTheme == primaryTheme;
        codeStyleElement.href = isPrimary ? codeStylePrimary : codeStyleSecondary;
        themeStyleElement.href = isPrimary ? themeStylePrimary : themeStyleSecondary ;
    }

    function getSecondaryHref(primaryHref, useDefault){
        var lastSlashIndex = primaryHref.lastIndexOf("/") + 1;
        var pathLastSegment = primaryHref.substr(lastSlashIndex);
        var basePath =  primaryHref.substr(0, lastSlashIndex);
        var replaced;

        if (useDefault) {
            var dotFirstIndex = pathLastSegment.indexOf(".");
            var themeName = pathLastSegment.substr(0, dotFirstIndex);
            replaced =  pathLastSegment.replace(themeName, "default").replace(primaryTheme, secondaryTheme)
        } else {
            replaced =  pathLastSegment.replace(primaryTheme, secondaryTheme);
        }
        var secondaryHref = basePath + replaced;
        return secondaryHref;
    }

    function getIframeResizeMessage() {
        return JSON.stringify({
            src: window.location.toString(),
            context: 'iframe.resize',
            height: embedContainer.scrollHeight // pixels
        });
    }
})();