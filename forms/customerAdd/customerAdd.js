customerAdd.onshow=function(){
    query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=ace45611&query=" + query)
    
    if (req.status == 200) { //transit trip worked. 
        allCustomers = JSON.parse(req.responseText)
        console.log(`The results are: \n ${allCustomers}`)
        if (allCustomers.length == 0)    
           lblMessage3.value = "There are no customers in the database."
        else {        
           let message = ""
           for (i = 0; i < allCustomers.length; i++)
               message = message + allCustomers[i][1] + "\n"
           txtaCustomers3.value = message
        } // end else

    } else   // the transit didn't work - bad wifi? server turned off?
        lblMessage3.value = "Error code: " + req.status
}
btnAdd.onclick=function(){
    let name = inptName.value
    let street = inptStreet.value
    let city = inptCity.value
    let state = inptState.value
    let zipcode = inptZipCode.value
    let query = "INSERT INTO customer (`name`,`street`, `city`, `state`, `zipcode`) VALUES ('" + name + "', '" + street + "', '" + city + "', '" + state + "', '" + zipcode + "')"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=ace45611&query=" + query)
    if (req.status == 200) { 
        if (req.responseText == 500)    
            lblMessage3.value = "You have successfully added the customer!"
        else
            lblMessage3.value = "There was a problem with adding the customer to the database."
    } else 
        lblMessage3.value = "Error: " + req.status
}
