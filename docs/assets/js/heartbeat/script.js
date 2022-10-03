$(function() {
    
  $('#search').keyup(function() {
      $('.filter li').removeClass('active');
    
      var val = $(this).val().toLowerCase();

      // Hide those without term
      rows.show().filter(function() {
        text = $(this).text().replace(/\s+/g, ' ');
        console.log(text);
        return !text.toLowerCase().includes(val);
      }).hide();

      var visible = $('.item:visible').length;

      if(visible == 0) { 
        $('.no-result').show();
      } else { 
        $('.no-result').hide();
      }

  });
  
});
