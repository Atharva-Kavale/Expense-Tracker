const nam = document.getElementById("name")
const date = document.getElementById("date")
const amt = document.getElementById("amt")
const addBtn = document.getElementById("addBtn")
const tdata = document.getElementById("tdata")

let data = []

let localLead = JSON.parse(localStorage.getItem("expense"))
if (localLead) //fetch value from localStorage to variable
{
    data = localLead
    render(0)
}
else {
    render(1)
}

addBtn.addEventListener('click', function ()  //values added by this function when submit clicked
{
    if (nam.value && date.value && amt.value) //checks if all fields are filled up or not
    {
        data.push(
            {
                name: nam.value,
                date: date.value,
                amt: amt.value
            })
        localStorage.setItem("expense", JSON.stringify(data))
        nam.value = ""
        date.value = ""
        amt.value = ""
        render(0)
    }
    else //prints error
    {
        let error = "", cnt = 0
        if(!nam.value)
        {
            error += "Name "
            cnt++
        }
        if(!date.value)
        {
            error += "Date "
            cnt++
        }
        if(!amt.value)
        {
            error += "Amount "
            cnt++
        }
        if(cnt > 1)
        {
            alert(error + "sections are empty.")
        }
        else
        {
            alert(error + "section is empty.")
        }
        
    }
})

function render(flag)   //prints values in html page
{
    if (flag == 0)  //normal render
    {
        let listElement = "", total = ""
        let sum = 0

        for (let i = 0; i < data.length; i++) //count of expenses
        {
            sum += parseInt(data[i].amt)
            listElement += `
        <tr>
            <td class="n">${data[i].name}</td>
            <td class="d">${data[i].date}</td>
            <td class="a">${data[i].amt}</td>
            <td><button onclick="del(${i})"><i class="fa fa-trash"></i></button></td>
        </tr>`
        }
        total = `
        <tr class="total">
            <td colspan="2">Total</td>
            <td colspan="2">${sum}</td>
        </tr>`

        tdata.innerHTML = listElement + total
    }
    else //if localStorage is empty
    {
        tdata.innerHTML = `
        <tr>
            <td colspan="4" class="emp">No expenses added yet!</td>
        </tr>`
    }
}

function del(indx) //delete data from table
{
    if (data.length == 1) //if there is only data in table
    {
        data = []
        localStorage.clear()
        render(1)
    }
    else //if there is more than 1 data in table
    {
        data.splice(indx, 1)
        localStorage.setItem("expense", JSON.stringify(data))
        render(0)
    }
}