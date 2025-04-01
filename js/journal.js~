console.log('js is working!')

let date;
let particular1;
let particular2;
let comment;
let debit;
let credit;

//validate fields
function isValid(){
    let flag=(particular1!='' && particular2!='' && comment!='' && debit!='' && credit!='' && isDateValid()===false) 
    console.log(flag)

    //validation message here!
    span=document.getElementById('validation-message')

    if(flag==false){
	span.style.color='red'
	span.innerHTML='please enter all fields!'
    }
    else{
	span.style.color='green'
	span.innerHTML='added new record!'
    }

    return flag
}

//validate date box
function isDateValid(){
    return isNaN(new Date(date)) 
}

//to post data to katori web-api
const getJournalsURL="http://localhost:5014/api/journal/getJournals";
const setJournalURL="http://localhost:5014/api/journal/setJournal";

let submitBtn=document.getElementById('submit-btn')

submitBtn.addEventListener('click',function(){
    console.log('clicked me!')

    date=document.getElementById('date').value
    particular1=document.getElementById('particular1').value
    particular2=document.getElementById('particular2').value
    comment=document.getElementById('comment').value
    debit=document.getElementById('debit').value
    credit=document.getElementById('credit').value

    if(isValid()==true){
	console.log(date,particular1,particular2,comment,debit,credit)

	fetch(setJournalURL,{
	    method:'POST',

	    headers:{
		'Content-Type':'application/json'
	    },

	    body:JSON.stringify({
		"particular1":particular1,
		"particular2":particular2,
		"comment":comment,
		"debit":debit,
		"credit":credit,
		"date":date
	    })
	})
    }
})

//to get data from katori web-api
fetch(getJournalsURL)
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

	    //comment
	    let comment=document.createElement('span')
	    comment.innerHTML='comment: '+d.comment
	    container.append(comment)

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
