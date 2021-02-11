
function inValidInput( error, object )
{   // Als de optie die was meegeven niet voldoet aan de juiste requirments dan runt hij deze functie
    //- Hierbij zal de text onderaan schudden en de error displayen wat er aan de hand is
    //- Hetgene dat fout is word met een rode border outgelined
    //- Daarna zal hij na 3 seconden de text weer terugzetten op normaal

    $('#form p').css('color', 'Red');
    $('#form input[name="' + object + '"]').css('box-shadow', '0 0 4px 0 Red');
    $('#form p').text(error);
    $('#form p').effect("shake");

    setTimeout(function(){
        $('#form p').css('color', 'Black');
        $('#form p').html('<p>See more of my projects on <a href="/http://mikeh.202devs.nl/">mikeh.202devs.nl</a></p>');
    }, 3000);
    return false;
};

$( "#form" ).submit(function( event ) 
{   // Zodra er op submit word geklikt zal deze functie worden gerund.
    //- Hierbij zal hij 2 dictonarys aanmaken.
    //- De req_data is de minamale requirments waaraan de text moet voldoen.
    //  De req_data heeft dus de min en max length van de data in zich op geslagen
    //  Om die later te vergelijken.
    //- De user_data haalt de data die in de input staat op een slaat die in zich op.
    //- Daarna zal er een for loop erdoor heen runnen die de requirment dict en de userdata met elkaar vergelijk.
    // Als hij niet aan de minimale eisen voldoet roept hij de functie inValidInput op en zal die de user laten zien
    // Wat er fout is gegaan.
    //- Mocht alles in orde zijn zal het script laten zien dat alles klopt en daarna vertellen waar de output te vinden is.

    var req_data =
    { // Miminale eisen van de input, [MIN_LENGTH, MAX_LENGTH] 
        'voornaam_req'   :  [3, 30],
        'achternaam_req' :  [3, 30],
        'straat_req'     :  [3, 40],
        'huisnummer_req' :  [1, 6],
        'postcode_req'   :  [6, 6],
        'stad_req'       :  [1, 30],
        'checkbox_req'   :  [0, 100]
    }

    var user_data =
    { // De userdata word hierin opgegaald en opgeslagen
        'voornaam'       :  $('#form').find('input[name="voornaam"]').val(), 
        'achternaam'     :  $('#form').find('input[name="achternaam"]').val(),
        'straat'         :  $('#form').find('input[name="straat"]').val(),
        'huisnummer'     :  $('#form').find('input[name="huisnummer"]').val(),
        'postcode'       :  $('#form').find('input[name="postcode"]').val(),
        'stad'           :  $('#form').find('input[name="stad"]').val(),
        'checkbox'       :  $('#form').find('input[name="checkbox"]').val()
    }


    for ( data in user_data )
    {   // Deze functie bekijkt de user input met de minimale eisen en zal dan 
        // een een functie oproepen als het niet klopt

        // IF statment die de minimale input eis bekijkt met het object
        if ( req_data[data + '_req'][0] > user_data[data].length )
        { 
            
            inValidInput( //-----------------------------------------------------------//-Dit is de functie die zal worden opgeroepen als het niet klopt.
                data + ' moet minimaal ' + req_data[data + '_req'][0] + ' lang zijn!', // Het bericht voor de user.
                data                                                                   // De object tag die fout is, Hier zal een red outline bij komen.
            );
            return false; // Returned false zodat het script niet door runt

        // IF statment die bekijkt of de user niet over de maximale systeem eis is gegaan
        } else if ( user_data[data].length > req_data[data + '_req'][1] ) {
            
            inValidInput( //-----------------------------------------------------------//-Dit is de functie die zal worden opgeroepen als het niet klopt.
                data + ' mag maar ' + req_data[data + '_req'][1] + ' lang zijn!',      // Het bericht voor de user.
                data                                                                   // De object tag die fout is, Hier zal een red outline bij komen.
            );
            return false; // Returned false zodat het script niet door runt

        }
    }

    for ( data in user_data )
    { // Deze for loop runt nogmaals door de dict en print dan met paarse letters de user input en object dat erbij hoort
        console.log('%c' + data + ' | ' + user_data[data], 'color: Purple');
    }

    // Laat de user weten dat het is gelukt onderaan de form
    $('#form p').css('color', 'Green');
    $('#form p').text('Account successfully created');
            
    setTimeout(function(){ // Na 5 seconden zal het de user vertellen dat de output in de console staat
        $('#form p').css('color', 'Purple');
        $('#form p').text('Kijk in de console voor de gegevens.');
    }, 5000);

        

    // Zorgt ervoor dat hij niet refreshed.
    event.preventDefault();
});

