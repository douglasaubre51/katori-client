console.log('fetch ledger running!')

const getLedgerTitlesURL='https://localhost:8000/api/ledger/getledgertitles'
const setLedgerURL='https://localhost:8000/api/ledger/setledger'

const titleWidgetContainer=document.getElementById('title-widget-container')

const validationMessage=document.getElementById('validation-message')

// get title's of all ledgers
fetch(getLedgerTitlesURL)
    .then(response=>response.json())
    .then(data=>{
	data.forEach((e)=>{
	    let span=document.createElement('span')
	    span.innerHTML=e

	    titleWidgetContainer.append(span)
	})
    })

// create new ledger
function createLedger(){
    const title=document.getElementById('title').value
    const ledgerType=document.getElementById('ledger-type').value

    if(validateFields(title,ledgerType)==true){
	console.log(title)
	console.log(ledgerType)

	fetch(setLedgerURL,{
	    method:'POST',

	    headers:
	    {
		'content-type':'application/json'
	    },

	    body:JSON.stringify({
		"title":title,
		"ledgertype":ledgerType
	    })
	})
	    .then(response=>{
		if(response.status==400){
		    console.log("ledger already exists or ledger can't be created!")
		    validationMessage.style.color='red'
		    validationMessage.innerHTML='ledger already exists!'
		}
		else if(response.status==201){
		    console.log("new ledger created!")

		    validationMessage.style.color='green'
		    validationMessage.innerHTML='new ledger created!<br>reload page to see changes!'
		}
	    })
    }
}

//validate fields
function validateFields(title,ledgerType){
    if(title=='' || ledgerType==''){

	validationMessage.style.color='red'
	validationMessage.textContent='enter all fields!'

	return false
    }
    else
	return true
}

