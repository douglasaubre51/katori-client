console.log('js is working!')

fetch("http://localhost:5014/api/journal/getJournals")
    .then(response=>response.json())
    .then(data=>{
	//display fetch data
	data.forEach(function(d){
	    console.log(d.journalId)
	    console.log(d.date)
	    console.log(d.particular1)
	    console.log(d.particular2)
	    console.log(d.comment)
	    console.log(d.debit)
	    console.log(d.credit)
	})

	const table=document.getElementById('journal')

	data.forEach(function(d,index){
	    let row=document.createElement('tr')
	    table.append(row)

	    let cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'
	    cell.innerHTML=d.journalId
	    table.append(cell)

	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'
	    cell.innerHTML=d.date
	    table.append(cell)

	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'
	    cell.innerHTML=d.particular1+' to '+d.particular2
	    table.append(cell)

	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'
	    cell.innerHTML=d.journalId
	    table.append(cell)

	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'
	    cell.innerHTML=d.debit
	    table.append(cell)

	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'
	    cell.innerHTML=d.credit
	    table.append(cell)
	})
    })
