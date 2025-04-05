console.log('js is working!')

//scroll window to the top
let scrollBtn=document.getElementById('scroll-up')
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
	top:350
    })
})

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

    return flag
}

//validate date box
function isDateValid(){
    return isNaN(new Date(date)) 
}

//clear all fields
function clearFields(){
    document.getElementById('date').value=''
    document.getElementById('particular1').value=''
    document.getElementById('particular2').value=''
    document.getElementById('comment').value=''
    document.getElementById('debit').value=''
    document.getElementById('credit').value=''
}

//to post data to katori web-api
const getJournalsURL="https://localhost:8000/api/journal/getJournals";
const setJournalURL="https://localhost:8000/api/journal/setJournal";

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

	//add new journal to JOURNALS
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
	}).then(response=>{
	    //handle bad request response
	    if(response.status==400){
		console.log('bad request!')
		let span=document.getElementById('validation-message')
		span.style.color='red'
		span.innerHTML='given ledgers doesnot exists!'
	    }
	    else if(response.status==201){
		console.log('journal created!')
		let span=document.getElementById('validation-message')
		span.style.color='green'
		span.innerHTML='added new journal record!<br>refresh the page to see changes!'
	    }
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
