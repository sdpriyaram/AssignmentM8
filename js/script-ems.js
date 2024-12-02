// CREATE AN ARRAY OF EMPLOYEES
let empArray1 = [
    {id:1, name:'Milo Preston', extension:1111 , email:'mpreston@temp.com' , department:'Sales' },
    {id:2, name:'Hazel Lee', extension:2222 , email:'hlee@temp.com' , department:'Marketing' },
    {id:3, name:'Lucinda Friedman', extension:3333 , email:'lfreeman@temp.com' , department:'Administration' },
    {id:4, name: 'Noelle Bird', extension:4444 , email:'nbird@temp.com' , department:'Executive' },
    {id:5, name: 'Stacey Mckay', extension:5555 , email:'smckay@temp.com' , department:'Manufacturing' }
]

const $ = (id) => document.getElementById(id)

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
const empdata = localStorage.getItem('employees')
if ( empdata != null)
    {
        // IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
        empArray1 = JSON.parse(empdata)
    }
buildGrid(empArray1)

// GET DOM ELEMENTS
const form = document.getElementById('addForm');
const emptable = document.getElementById('empTable')

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault()

    // GET THE VALUES FROM THE TEXT BOXES
    let idvalue = $('id').value
    let namevalue = $('name').value;
    let extensionvalue = $('extension').value
    let emailvalue = $('email').value
    let departmentvalue = $('department').value

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newemp = {id: idvalue,name: namevalue,extension: extensionvalue,email:emailvalue,department:departmentvalue}

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    let empdata = localStorage.getItem('employees')
    let empArray = JSON.parse(empdata || {})
    empArray.push(newemp)
    localStorage.setItem('employees' , JSON.stringify(empArray))

    // BUILD THE GRID
    buildGrid(empArray)
    // RESET THE FORM
    clearFields()
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById('id').focus()
})

// DELETE EMPLOYEE
emptable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (confirm("Are you sure you want to delete this item?"))
        {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            const selrow = e.target.closest('tr')
            let ri = -1
            if (selrow)
            {
                ri = selrow.rowIndex
                //selrow.querySelector('td:first-child')
            }

            // REMOVE EMPLOYEE FROM ARRAY
            let empdata = localStorage.getItem('employees')
            let empArray = JSON.parse(empdata || {})
            
            //const index = empArray.findIndex(item => item.id === ri)

            empArray.splice(ri-1,1)
            localStorage.setItem('employees',JSON.stringify(empArray)) 
            // BUILD THE GRID
            buildGrid(empArray)
        }
    else
        {

        }

})


function clearFields()
{
    document.getElementById('id').value = ''
    document.getElementById('name').value = ''
    document.getElementById('extension').value = ''
    document.getElementById('email').value = ''
    document.getElementById('department').options[0].selected = 'selected'
}

// BUILD THE EMPLOYEES GRID
function buildGrid(empArray) {

    const tab = document.getElementById("empTable")

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    const tbody = tab.querySelector("tbody");
    tbody.innerHTML = ""

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    empArray.forEach(item => {
        const row = tbody.insertRow()
        const idcell = row.insertCell()
        const namecell = row.insertCell()
        const extensioncell = row.insertCell()
        const emailcell = row.insertCell()
        const departmentcell = row.insertCell()

        idcell.textContent = item.id
        namecell.textContent = item.name
        extensioncell.textContent = item.extension
        emailcell.textContent = item.email
        departmentcell.textContent = item.department

    })

    // UPDATE EMPLOYEE COUNT
    const empCount = document.getElementById('empCount')
    empCount.innerText = empArray.length

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees',JSON.stringify(empArray))
}




