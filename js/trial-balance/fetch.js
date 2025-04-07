console.log('starting fetch!')

const getLedgerTitleURL='https://localhost:8000/api/ledger/getLedgerTitles'

const getLedgerByTitleURL='https://localhost:8000/api/particular/getParticularsOfLedger'

const widgetContainer=document.getElementById('title-widget-container')
const selectedLedgerTableContainer=document.getElementById('selected-ledger-table-container')

//create ledger table in the shadows
function createLedgerTable(){
    let table=document.createElement('table')
    table.setAttribute('id','ledger-table')
    selectedLedgerTableContainer.append(table)

    let headerRow=document.createElement('tr')
    table.append(headerRow)

    let headingArray=new Array(8)

    for(let i=0;i<8;i++){
	headingArray[i]=document.createElement('th')
	headerRow.append(headingArray[i])
    }

    headingArray[0].textContent='Id'
    headingArray[1].textContent='Title'
    headingArray[2].textContent='Ledger Type'
    headingArray[3].textContent='Dr'
    headingArray[4].textContent='Id'
    headingArray[5].textContent='Title'
    headingArray[6].textContent='Ledger Type'
    headingArray[7].textContent='Cr'
}

//get selected ledger
function getLedgerByTitle(url){
    fetch(url)
	.then(response=>response.json())
	.then(data=>{
	    const table=document.getElementById('ledger-table')
	    let row=document.createElement('tr')
	    table.append(row)

	    // debit side
	    data.DebitParticulars.forEach((d)=>{
		let cell=document.createElement('td')

		if(d===0)
		    cell.textContent='debit'
		else
		    cell.textContent=d

		console.log(d.Date)

		row.append(cell)
	    })

	    // credit side
	    data.DebitParticulars.forEach((c)=>{
		let cell=document.createElement('td')

		if(d===1)
		    cell.textContent='credit'
		else
		    cell.textContent=c


		row.append(cell)
	    })

	})
}

//update dom from the shadows
function domUpdate(data){
    data.forEach((e)=>{
	let title=document.createElement('span')
	title.innerHTML=e

	widgetContainer.append(title)

	title.addEventListener('click',function(){
	    //add code to execute on click event
	    document.getElementById('ledger-table')?.remove()
	    createLedgerTable()

	    let params={ ledgerName:e }
	    let payload=new URLSearchParams(params).toString()
	    let url=`${getLedgerByTitleURL}?${payload}`
	    getLedgerByTitle(url)
	})
    })
}

//update cycle starts here!
//to get content for title widget container
function getLedgerTitles(){
    fetch(getLedgerTitleURL)
	.then(response=>response.json())
	.then(data=>{
	    domUpdate(data)
	})
}

//for full page refresh
getLedgerTitles()
