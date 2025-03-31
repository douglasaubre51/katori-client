console.log('js is working!')

fetch("http://localhost:5014/api/journal/getJournals")
    .then(response=>response.json())
    .then(data=>{
	//display fetch data
	//get table object
	const table=document.getElementById('journal')

	data.forEach(function(d,index){
	    //create new row for each record
	    let row=document.createElement('tr')
	    table.append(row)

	    //journal id
	    //create new cell
	    let cell=document.createElement('td')
	    //alternative row background-color changes
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'
	    //create new div
	    let container=document.createElement('div')
	    container.setAttribute('class','cell-container')
	    //create new span element
	    let span=document.createElement('span')
	    span.innerHTML=d.journalId
	    //now add
	    container.append(span)
	    cell.append(container)
	    table.append(cell)

	    //date
	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'

	    container=document.createElement('div')
	    container.setAttribute('class','cell-container')

	    span=document.createElement('span')
	    span.innerHTML=d.date

	    container.append(span)
	    cell.append(container)
	    table.append(cell)

	    //paticulars
	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'

	    container=document.createElement('div')
	    container.setAttribute('class','cell-container')

	    //particular 1
	    let particular1=document.createElement('span')
	    particular1.innerHTML=d.particular1
	    container.append(particular1)

	    //word 'to'
	    let to=document.createElement('span')
	    to.innerHTML='to'
	    container.append(to)

	    //particular 2
	    let particular2=document.createElement('span')
	    particular2.innerHTML=d.particular2
	    container.append(particular2)

	    cell.append(container)
	    table.append(cell)

	    //LF
	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'

	    container=document.createElement('div')
	    container.setAttribute('class','cell-container')

	    span=document.createElement('span')
	    span.innerHTML=d.journalId

	    container.append(span)
	    cell.append(container)
	    table.append(cell)

	    //debit
	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'

	    container=document.createElement('div')
	    container.setAttribute('class','debit-container')

	    span=document.createElement('span')
	    span.innerHTML=d.debit

	    container.append(span)
	    cell.append(container)
	    table.append(cell)

	    //credit
	    cell=document.createElement('td')
	    cell.style.backgroundColor = index % 2 == 0 ? '606060' : '4d4d4d'

	    container=document.createElement('div')
	    container.setAttribute('class','credit-container')

	    span=document.createElement('span')
	    span.innerHTML=d.credit

	    container.append(span)
	    cell.append(container)
	    table.append(cell)
	})
    })
