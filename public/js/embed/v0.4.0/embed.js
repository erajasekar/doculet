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