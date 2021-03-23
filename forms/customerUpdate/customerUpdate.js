customerUpdate.onshow=function(){
    query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=ace45611&query=" + query)
    
    if (req.status == 200) { //transit trip worked. 
        allCustomers = JSON.parse(req.responseText)
        console.log(`The results are: \n ${allCustomers}`)
        if (allCustomers.length == 0)    
           lblMessage4.value = "There are no customers in the database."
        else {        
           let message = ""
           for (i = 0; i < allCustomers.length; i++)
               message = message + allCustomers[i][1] + "\n"
           txtaCustomers4.value = message
        } // end else

    } else   // the transit didn't work - bad wifi? server turned off?
        lblMessage4.value = "Error code: " + req.status
}

btnSubmit.onclick=function(){
   let newName = inptNewName.value
    let oldName = inptOldName.value
    query = "SELECT * FROM customer WHERE `name` = '" + oldName + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=ace45611&query=" + query)
    if (req.status == 200) {
        allCustomers = JSON.parse(req.responseText)
        if (allCustomers.length > 0) {
            query = "UPDATE customer SET `name` ='" + newName + "' WHERE `name` = '" + oldName + "'"
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=ace45611&query=" + query)
            if (req.status ==  200)  
                if (req.responseText == 500)   
                    lblMessage4.value = `You have successfully updated ${oldName} to ${newName}.`
                else
                    lblMessage4.value = `There was a problem updating ${oldName} to ${newName}.`
            else   
                lblMessage4.value = `Error: ${req.status}`
        }
    }
}
