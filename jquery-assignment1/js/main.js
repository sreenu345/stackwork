    //function for take the data from search box and sarch it
    $(function() {
        $('#f1').submit(function() {
            // $('#movie').empty();

            var title = $('#s').val();

            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: "http://www.omdbapi.com/?s=" + title,
                data: title,

                success: function(data) {

                    var temp = '';
                    for (i = 0; i < data.Search.length; i++) {
                        temp += '<tr><td>' + data.Search[i].Title + '</td><td>' + data.Search[i].Year + '</td><td>' + data.Search[i].imdbID + '</td><td> <img src=" ' + data.Search[i].Poster + ' " alt="Poster not displayed" widt="100" height="100"</td></tr>';
                    }
                    $('#movie').append(temp);
                }
            });
        });
    });
