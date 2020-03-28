  $(document).ready(function(){
      var dom = $('#questionAdd_div');
      $(dom).find('#selectquestionType').on('change',this, function(e) {
        var id  = $(this).val();
        $(dom).find('.tab-content').find('.tab-pane').removeClass('active in')
        $(dom).find('.tab-content').find('.tab-pane'+'.'+id).addClass("active in");
      });
      $(dom).find('.js_moreoptions').unbind().bind('click',this,function(e){
        e.preventDefault();
        var count = $(dom).find('.mcqoptions .optiondiv').length +1;

        var optiondiv_html = '<div class="optiondiv col-sm-12">'+
                                '<label for="exampleInputEmail1">Option '+count+':</label>'+
                                '<div><input class="js_option option_css" type="text" placeholder="Option '+count+'"></div>'+
                                '<button class="js_canceloption">Cancel</button>'+
                             '</div>';
        $(dom).find('.mcqoptions').append(optiondiv_html);
        $(dom).find('.js_canceloption').unbind().bind('click',this,function(){
            $(this).closest('.optiondiv').remove();
        });
      });
      $(dom).find('.js_back_button').unbind().bind('click',this,function(e){
            window.location.replace("/");
      });
      $(dom).find('.js_savequestion_button').unbind().bind('click',this,function(e){
        e.preventDefault();
        var questiontype = $(dom).find('#selectquestionType').val();
        var subject      = $(dom).find('#selectSubject').val();
        var Question     = $(dom).find('.questiontext').val();
        var Ans          = parseInt($(dom).find('.js_ans').val());

        if(Ans > $(dom).find('.mcqoptions .optiondiv').length || Ans <= 0)
        {
            alert('enter a valid option a Answer')
            return;
        }

        var options = [];
        $(dom).find('.mcqoptions .optiondiv').each(function( index ) {
          options[index] = $( this ).find('.js_option').val();
        });
        $.ajax({
                type    : "POST",
                url     : '/ajax/request',
                dataType: 'json',
                data: {
                  'mode'             :'testsetup',
                  'ack'              :'savequestion',
                  'subjectid'        : subject,
                  'questiontype'     : questiontype,
                  'Question'         : Question,
                      'options'          : JSON.stringify(options),
                  'Ans'              : Ans,
                  csrfmiddlewaretoken:$(dom).find('input[name=csrfmiddlewaretoken]').val()
                },
                success: function (data) {
                  if(data.status == "success")
                  {
                       alert("Question Got Saved !");
//                       window.location.replace("/");
                  }
                  else
                  {
                    alert(data);
                  }
                }
            });
      });

  });
