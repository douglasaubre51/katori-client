console.log('starting fetch!')

const getLedgerTitleURL='https://localhost:8000/api/ledger/getLedgerTitles'

const getLedgerByTitleURL='https://localhost:8000/api/ledger/getLedgerByTitle'

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
	.then(e=>{
	    const table=document.getElementById('ledger-table')
	    let row=document.createElement('tr')
	    table.append(row)

	    if(e.LedgerType

	    let idCell1=document.createElement('td')
	    idCell1.textContent=e.Id

	    let titleCell1=document.createElement('td')
	    titleCell1.textContent=e.Title

	    let ledgerType1Cell=document.createElement('td')
	    ledgerType1Cell.textContent=e.LedgerType

	    let debitCell=document.createElement('td')
	    debitCell.textContent=0

	    let idCell2=document.createElement('td')
	    idCell2.textContent=e.Id

	    let titleCell2=document.createElement('td')
	    titleCell2.textContent=e.Id

	    let ledgerTypeCell2=document.createElement('td')
	    ledgerTypeCell2.textContent=e.Id

	    let creditCell=document.createElement('td')
	    creditCell.textContent=e.Id
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

	    let params={ title:e }
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
