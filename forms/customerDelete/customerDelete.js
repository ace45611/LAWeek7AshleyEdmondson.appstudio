let allCustomers = []

customerDelete.onshow=function(){
    query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=ace45611&query=" + query)
    
    if (req.status == 200) { //transit trip worked. 
        allCustomers = JSON.parse(req.responseText)
        console.log(`The results are: \n ${allCustomers}`)
        if (allCustomers.length == 0)    
           lblMessage2.value = "There are no customers in the database."
        else {        
           let message = ""
           for (i = 0; i < allCustomers.length; i++)
               message = message + allCustomers[i][1] + "\n"
           txtaCustomers2.value = message
        } // end else

    } else   // the transit didn't work - bad wifi? server turned off?
        lblMessage2.value = "Error code: " + req.status
}

btnDelete.onclick=function(){
    let customerNameDel = inptCustomerDel.value
    let found = false
    for (i = 0; i < allCustomers.length; i++) {
        if (customerNameDel == allCustomers[i][1])  {
            found = true
            break 
        }
    }
    if (found == false) 
       lblMessage2.value = "That customer name is not in the database."
    else if (found == true)
      query = "DELETE FROM customer WHERE name = '" + customerNameDel + "'"      
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=ace45611&query=" + query)
      if (req.status == 200) //transit worked.
            if (req.responseText == 500)    
                lblMessage2.value = `You have successfully deleted the customer named ${customerNameDel}`
            else
                lblMessage2.value = `There was a problem deleting ${customerNameDel} from the database.`
      else
        lblMessage2.value = `Error: ${req.status}`
      }



