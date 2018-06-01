var APP = (function() {

    var _init = function() {
        _bindEvents();
    };
    $(document).ready(function() {
        var max_fields = 10; //maximum input boxes allowed
        var wrapper = $("#form_shorten"); //Fields wrapper
        var add_button = $(".add_field_button"); //Add button ID
         
        var x = 1; //initlal text box count
        $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
        x++; //text box increment
        $(wrapper).append(`<form id="form_shorten" role="form">
        <div class="input-group">
            <input type="url" class="form-control text-url" placeholder="Enter a URL to shorten..." value="https://google.com" />
            <span class="input-group-btn">
                <button type="submit" class="btn btn-success btn-shorten">Shorten</button>
            </span>
        </div>
    </form><br />
    
    <div id="shorten_area" class="hide">Shortened URL: <span class="shortened-url"></span></div>`); //add input box
        }
        });
         
        $(wrapper).on("click",".remove_field", function(e){ //user click on remove field
        e.preventDefault(); $(this).parent('div').remove(); x--;
        })
        });
    


    var _bindEvents = function() {
        $('#form_shorten').on('submit', function(e) {
            e.preventDefault();
            var url = $.trim($('.text-url').val());
            console.log(url);
            $.ajax({
                url: '/shorten',
                type: 'POST',
                data: {
                    url: url
                },
                success: function(data) {
                    console.log(data);
                    var _buildUrl = window.location.origin + '/' + data.hash;
                    $('.shortened-url').html('<a href="' + _buildUrl + '" target="_blank">' + _buildUrl + '</a>');
                    $('#shorten_area').removeClass('hide').show();
                }
            })
        });
    };

    return {
        init: _init
    };

})();

$(function() {
    APP.init();
});


