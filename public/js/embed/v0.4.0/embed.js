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

    var toggleThemeBtn = document.getElementById("toggle-theme-btn");
    toggleThemeBtn.addEventListener("click", toggleTheme);
    var primaryTheme = toggleThemeBtn.dataset.theme;
    var secondaryTheme = primaryTheme == "light" ? "dark" : "light";

    var codeStyleElement = document.getElementById("code-theme");
    var codeStylePrimary = codeStyleElement.getAttribute("href");
    var codeStyleSecondary = getSecondaryHref(codeStylePrimary, true);
    console.log(codeStylePrimary, codeStyleSecondary);

    var asciidocStyleElement = document.getElementById("asciidoc-theme");
    var asciidocStylePrimary = asciidocStyleElement.getAttribute("href");
    var asciidocStyleSecondary = getSecondaryHref(asciidocStylePrimary, false);
    console.log(asciidocStylePrimary, asciidocStyleSecondary);
  
    function toggleTheme(){
        // TODO update tooltip text
        var icon = toggleThemeBtn.querySelector("i");
        var newTheme = toggleThemeBtn.dataset.theme == primaryTheme? secondaryTheme : primaryTheme ;
        toggleThemeBtn.dataset.theme = newTheme;
        icon.classList.toggle("fa-moon", newTheme == "light");
        icon.classList.toggle("fa-sun", newTheme == "dark");
        var isPrimary = newTheme == primaryTheme;
        codeStyleElement.href = isPrimary ? codeStylePrimary : codeStyleSecondary;
        asciidocStyleElement.href = isPrimary ? asciidocStylePrimary : asciidocStyleSecondary ;
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
})();