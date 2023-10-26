document.addEventListener('DOMContentLoaded', () => {
        
    const contactsTable = document.getElementById('contacts-table');
    
    const fetchContacts = async () => {
        try {
            const response = await fetch('/contacts');
            const contacts = await response.json();
            renderContacts(contacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    const renderContacts = contacts => {
        contactsTable.innerHTML = '';  
       
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Namn</th>
                    <th scope="col">Epost</th>
                    <th scope="col">Kommando</th>
                </tr>
             </thead>
        `;

        contactsTable.appendChild(thead);

        contacts.forEach((contact, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editContact(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteContact('${contact.id}')">Delete</button>
                </td>
            `;
            contactsTable.appendChild(row);
        });
    }

    const deleteContact = async (id) => {
        console.log('delete called for: ' + id);
        try {
            const response = await fetch(`/contacts/${id}`, {
                method: 'DELETE'
            });
            await fetchContacts();  
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    }
    
    window.deleteContact = deleteContact;
    fetchContacts();
});

    


/*
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const p = document.createElement('p');
    p.textContent = 'Hello from client js';
    app.appendChild(p);

    const btn = document.createElement('button');
    btn.textContent = 'Load data';
    btn.addEventListener('click', loadData);
    app.appendChild(btn);

    const btnAddContact = document.createElement('button');
    btnAddContact.textContent = 'Add Contact';
    btnAddContact.addEventListener('click', addContact);
    app.appendChild(btnAddContact);

    const datalist = document.createElement('div');
    datalist.id = 'datalist';
    app.appendChild(datalist);
});

const loadData = () => {
    fetch('/contacts')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('contacts', JSON.stringify(data));
            populateData(data);
        })
};

const populateData = (data) => {
    const datalist = document.getElementById('datalist');
    datalist.innerHTML = '';
    const ul = document.createElement('ul');
    data.forEach(contact => {
        const li = document.createElement('li');
        li.innerText = `${contact.name} (${contact.email})`;
        ul.appendChild(li);
    })
    datalist.appendChild(ul);
};

const addContact = () => {
    let name = prompt('Ange namn');
    let email = prompt('Ange epost');
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let newContact = {name: name, email: email};
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    populateData(contacts);
    updateData(newContact);
};

const updateData = (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('/contacts', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(data)});
}

*/