//console.log('frontend javascript')

const exchangeForm = document.querySelector('form')
exchangeForm.addEventListener('submit', (event) => {
    $('#name').html('Searching...')
    event.preventDefault()
    var asset = $('input').val();    
    $('#symbol').empty()
    $('#price_open').empty()
    $('#price').empty()
    $('#day_high').empty()
    $('#day_low').empty()
    if (!asset) {
        $('#name').html('<strong>You must declare an asset!</strong>')
        return;
    }

    fetch(`/exchange?asset=${asset}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                $('#name').html(`Something wrong is not right! <strong>${data.error.message}, ${data.error.code}</strong>`)
            } else {
                
                $('#name').html(`Name: ${data.name}`)
                $('#symbol').html(` Symbol: ${data.symbol}`)
                $('#price_open').html(`Price Open: ${data.price_open}`)
                $('#price').html(`Price: ${data.price}`)
                $('#day_high').html(`Day High: ${data.day_high}`)
                $('#day_low').html(`Day Low: ${data.day_low}`)
            }
        })
    })


})