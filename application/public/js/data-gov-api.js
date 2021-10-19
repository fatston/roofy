function getRecentSaleByRoom(room, town) {
    let q = {
      "flat_type": room,
      "town": town
    }
    let url = "https://data.gov.sg/api/action/datastore_search"
    url += "?resource_id=f1765b54-a209-4718-8d38-a39237f502b3"
    url += "&q=" + JSON.stringify(q)
    url += "&sort=month desc"
    url += "&limit=15"
    fetchJsonp(url)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        let transactions = ""
        let records = json.result.records
        records.forEach(record => {
            transactions += generateTransaction(record.floor_area_sqm, record.flat_model, record.resale_price, record.block, record.street_name, record.remaining_lease, record.storey_range)
        });
        document.getElementById('sale-transactions').innerHTML = transactions == "" ? "No recent transactions" : transactions;
      }).catch(function(ex) {
        console.log('parsing failed', ex)
        document.getElementById('sale-transactions').innerHTML = "No recent transactions";
      })
}

function generateTransaction(floorsize, flatmodel, price, block, street, remaining_lease, storey_range) {
    let transaction = 
    '<div class="col-4">' +
        '<div class="card h-100">' +
            '<div class="card-body">' +
                '<p>'+
                    '<b>Address</b><br/>' +
                    '<i class="bi-house"></i>'+block+' '+street+'<br/>' +
                    '<b>Resale Price</b><br/>' +
                    '<i class="bi-currency-dollar"></i>'+price+'<br/>'+
                    flatmodel+' ('+floorsize+'sqm)'+'<br/>'+
                    '<b>Lease Term</b><br/>' +
                    remaining_lease+'<br/>'+
                    '<b>Storey Range</b><br/>'+
                    storey_range+'<br/>'+
                '</p>' +
            '</div>' +
        '</div>' +
    '</div>' 
    return transaction
}