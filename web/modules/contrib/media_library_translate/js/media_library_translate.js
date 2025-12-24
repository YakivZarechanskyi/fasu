(function ($, Drupal) {

    // Define the behavior
    Drupal.behaviors.mediaLibraryTranslate = {
      attach: function (context, settings) {
  
        // Use noConflict to avoid conflicts with other libraries
        var $ = jQuery.noConflict();
  
        // Now you can use $ within this scope
        $(context).ready(function () {
  
          // Attach click event to the anchor tag with class "media-library-translate__link"
          var anchorTag = $('.media-library-translate__link', context);
  
          anchorTag.on('click', function () {
  
            // Attach AJAX success event listener
            $(document).ajaxSuccess(function (event, xhr, settings) {
  
              // Check if the opened modal contains an element with class "media-library-translate__modal"
              var modalContent = $('.media-library-translate__modal', context);
  
              if (modalContent.length) {
  
                // Select all anchor tags within the modal that are wrapped in specified <li> elements
                var anchorTags = modalContent.find('li.dropbutton-action a');
  
                // Add attributes and query parameter to each selected anchor tag
                anchorTags.each(function () {
                  var anchor = $(this);
                  anchor.attr('target', '_blank');
  
                  // Get the current href value
                  var href = anchor.attr('href');
  
                  // Extract the path from the current window location
                  var currentPath = window.location.pathname;
  
                  // Add the Drupal query parameter to the href
                  var updatedHref = addQueryParam(href, 'destination', currentPath);
  
                  // Update the href attribute with the new value
                  anchor.attr('href', updatedHref);
                });
              } else {
                // Do nothing.
              }
            });
          });
  
          // Function to add a query parameter to a URL
          function addQueryParam(url, key, value) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            return url + separator + encodeURIComponent(key) + '=' + encodeURIComponent(value);
          }
        });
      }
    };
  
  })(jQuery, Drupal);
  