//function for take the data from search box and sarch it
$(function() {
    $('#previous').hide();
     $('#next').hide();

    var temp = $('#addtempl').html();
    function add(newstudent) {
        $('#loadall').append(Mustache.render(temp, newstudent));
    }

    $('#searchbtn').on('click', function() {
        $('#previous').hide();
     $('#next').hide();

        var searchvalue = $('#searchinput').val();
        if(searchvalue=="")
        {
            alert('Enter the text that you want to search');
        }else{
            
            $.ajax({
                 type: 'GET',
                dataType: 'json',
                url: "http://localhost:8080/students?q=" + searchvalue,
                data: searchvalue,
                success: function(data) {
                    if (data.length != 0) {
                        $('#loadall').html('<tr bgcolor="orange"> <th>id</th> <th>sname</th><th>fname</th><th>dob</th><th>age</th><th>gender</th><th>email</th><th>phone</th><th>hobbies</th><th>address</th><th>operations</th></tr>');
                        $.each(data, function(i, data) {
                        add(data);
                    });
                    } else {
                     alert('No Records found for your search');
                    }
                },
                error: function() {
                    alert('Data not found');
                }
            });
        }
    });


    //function for add the details(post) 
    var $sname = $('#sname');
    var $fname = $('#fname');
    var $dob = $('#dob');
    var $age = $('#age');
    var $gender = $('#gender');
    var $email = $('#email');
    var $phone = $('#phone');
    var $hobbies = $('#hobbies');
    var $address = $('#address');
    $('#addbtn').on('click', function() {
        $('#previous').hide();
     $('#next').hide();
        var details = {
            sname: $sname.val(),
            fathersname: $fname.val(),
            dob: $dob.val(),
            age: $age.val(),
            gender: $gender.val(),
            email: $email.val(),
            phone: $phone.val(),
            hobbies: $hobbies.val(),
            address: $address.val()
        };
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/students',
            data: details,
            success: function(detail) {
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: "http://localhost:8080/students/" + detail.id,
                    data: detail,
                    success: function(data) {
                        $('#loadall').html('<tr><th>id</th><th>sname</th><th>fname</th><th>dob</th><th>age</th><th>gender</th><th>email</th><th>phone</th><th>hobbies</th><th>address</th><th></th></tr>');
                        add(data);
                    },
                    error: function() {
                        alert('error to retrieve data');
                    }
                });
            },
            error: function() {
                alert('Error to post the data');
            }
        });
    });


    //function for load all the data
    var page = 0;
    $('#load').on('click', function() {
        if (page == 0) {
             $("#previous").prop('disabled', true);
         }
        $('#loadall').html('<tr><th>id</th><th>sname</th><th>fname</th><th>dob</th><th>age</th><th>gender</th><th>email</th><th>phone</th><th>hobbies</th><th>address</th><th></th></tr>');
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "http://localhost:8080/students?_start=" + page + " &_limit=10",

            success: function(data) {
                $('#previous').show();
                 $('#next').show();
                $.each(data, function(i, data) {
                    add(data);
                });
            },
            error: function() {
                alert('Data not found');
            }
        });
    });

    $('#next').on('click', function() {
         page = page + 10;
         if (page > 0) {
             $("#previous").prop('disabled', false);
         }
         $.ajax({

             dataType: 'json',
             url: "http://localhost:8080/students?_start=" + page + "&_limit=10&_sort=id&_order=ASC  ",
             success: function(data) {

                 $('#loadall').html('<tr><th>id</th><th>sname</th><th>fname</th><th>dob</th><th>age</th><th>gender</th><th>email</th><th>phone</th><th>hobbies</th><th>address</th><th></th></tr>');
                 $.each(data, function(i, obj) {
                     add(obj);
                 });
             },
             error: function() {
                 console.log("error message");
             }

         });
     });
     $('#previous').on('click', function() {
        page = page - 10;
         $('#loadall').html('<tr><th>id</th><th>sname</th><th>fname</th><th>dob</th><th>age</th><th>gender</th><th>email</th><th>phone</th><th>hobbies</th><th>address</th><th></th></tr>');
         if (page <=0) {
             $("#previous").prop('disabled', true);
         }
         

         $.ajax({

             dataType: 'json',
             url: "http://localhost:8080/students?_start=" + page + " &_limit=10&_sort=id&_order=ASC  ",
             success: function(data) {

                 $.each(data, function(i, obj) {
                     add(obj);
                 });
             },
             error: function() {
                 console.log("error message");
             }

         });
     });


    //function for remove the data
    $('#loadall').delegate('.remove', 'click', function() {
        var $tr = $(this).closest('tr');
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/students/' + id,
            success: function() {
                $tr.fadeOut(300, function() {
                    $(this).remove();
                });
                alert('Deleted successfully');
            },
            error: function() {
                alert('error found data');
            }
        });
    });


    //function for update the data
    $('#loadall').delegate('.editStudent', 'click', function(){
        var $tr=$(this).closest('tr');
        $tr.find('input.id').val($tr.find('span.id').html());
        $tr.find('input.sname').val($tr.find('span.sname').html());
        $tr.find('input.fname').val($tr.find('span.fname').html());
        $tr.find('input.dob').val($tr.find('span.dob').html());
        $tr.find('input.age').val($tr.find('span.age').html());
        $tr.find('input.gender').val($tr.find('span.gender').html());
        $tr.find('input.email').val($tr.find('span.email').html());
        $tr.find('input.phone').val($tr.find('span.phone').html());
        $tr.find('input.hobbies').val($tr.find('span.hobbies').html());
        $tr.find('input.address').val($tr.find('span.address').html());
        $tr.find('td').addClass('edit');
    });
    $('#loadall').delegate('.cancelEdit', 'click', function(){
        var $tr=$(this).closest('tr');
        $tr.find('td').removeClass('edit');
    });
    $('#loadall').delegate('.saveEdit', 'click',function(){
        var $tr=$(this).closest('tr');
        var id=$(this).attr('data-id');
        var student={
            id:$tr.find('input.id').val(),
            sname:$tr.find('input.sname').val(),
            fathersname:$tr.find('input.fname').val(),
            dob:$tr.find('input.dob').val(),
            age:$tr.find('input.age').val(),
            gender:$tr.find('input.gender').val(),
            email:$tr.find('input.email').val(),
            phone:$tr.find('input.phone').val(),
            hobbies:$tr.find('input.hobbies').val(),
            address:$tr.find('input.address').val(),
        };
        $.ajax({
            type:'PUT',
            url:'http://localhost:8080/students/' +id,
            data:student,
            success:function(newStudent){
                $tr.find('span.id').html(student.id);
                $tr.find('span.sname').html(student.sname);
                $tr.find('span.fname').html(student.fathersname);
                $tr.find('span.dob').html(student.dob);
                $tr.find('span.age').html(student.age);
                $tr.find('span.gender').html(student.gender);
                $tr.find('span.email').html(student.email);
                $tr.find('span.phone').html(student.phone);
                $tr.find('span.hobbies').html(student.hobbies);
                $tr.find('span.address').html(student.address);
                $tr.find('td').removeClass('edit');
                alert('Updated successfully');
            },
            error:function(){
                alert('Error to update the data');
            }
        });
    });

});
