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

function toggleTheme(target){
    var icon = target.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    console.log(icon.classList);
    document.getElementById('code-theme').href = '/css/embed/v0.4.0/highlightjs/default.dark.min.css';
    document.getElementById('asciidoc-theme').href = '/css/embed/v0.4.0/asciidoc/colony.dark.css';
}