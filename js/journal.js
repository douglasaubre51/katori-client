console.log('js is working!')

fetch("http://localhost:5014/api/journal/getJournals")
.then(response=>response.json())
.then(data=>{
    data.forEach(function(d){
	console.log(d.id)
	console.log(d.date)
	console.log(d.particular1)
	console.log(d.particular2)
	console.log(d.comment)
	console.log(d.debit)
	console.log(d.credit)
    })
})
