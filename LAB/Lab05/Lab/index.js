// 


// Helper function to simulate data retrieval with success rate and timer
function generateData(list) {
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500); // Simulate a random response time
        if (success_rate > 0.1) { // Success rate of 90%
            let randomIndex = Math.floor(Math.random() * list.length);
            setTimeout(() => {
                resolve(list[randomIndex]);
            }, timer);
        } else {
            setTimeout(() => {
                reject('Data generation failed');
            }, timer);
        }
    });
}

async function get_firstname() {
    const first_name_list = ['Adam', 'Eric', 'Peter'];
    return await generateData(first_name_list);
}

async function get_lastname() {
    const last_name_list = ['Jones', 'Smith', 'Johnson'];
    return await generateData(last_name_list);
}

async function get_username() {
    const username_list = ['Zeus', 'Faker', 'Keria'];
    return await generateData(username_list);
}

async function get_email() {
    const email_list = ['asdf@google.com', 'qwer@microsoft.com', 'zxcv@cs.nthu.edu.tw'];
    return await generateData(email_list);
}

async function get_address() {
    const address_list = ['1027 Alpha Avenue', '3132 Kidd Avenue', '876 Jefferson Street'];
    return await generateData(address_list);
}

async function get_info() {
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.5) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        } else {
            setTimeout(() => {
                reject('get_info Failed');
            }, timer);
        }
    });
}

// Main function to retrieve data
async function retrieve_data() {
    const txtInfoName = document.getElementById('user-info-name');
    const txtFirstName = document.getElementById('firstName');
    const txtLastName = document.getElementById('lastName');
    const txtUserName = document.getElementById('username');
    const txtEmail = document.getElementById('email');
    const txtAddress = document.getElementById('address');
    const boxReSample = document.getElementById('re-sample');

    // Reset all fields
    txtInfoName.innerText = '-';
    txtFirstName.value = '-';
    txtLastName.value = '-';
    txtUserName.value = '-';
    txtEmail.value = '-';
    txtAddress.value = '-';

    try {
        // Step 1: Get info ID
        const infoId = await get_info();
        txtInfoName.innerText = `User ID: ${infoId}`;

        // Step 2: Retrieve other data asynchronously
        const firstName = await get_firstname();
        const lastName = await get_lastname();
        const username = await get_username();
        const email = await get_email();
        const address = await get_address();

        // Step 3: Display data on the screen
        txtFirstName.value = firstName;
        txtLastName.value = lastName;
        txtUserName.value = username;
        txtEmail.value = email;
        txtAddress.value = address;

    } catch (error) {
        txtInfoName.innerText = "Failed to retrieve data";
        console.error(error);
    }
}

// Function to handle re-sample button click
function initApp() {
    const reSamplebtn = document.getElementById('resamplebtn');
    reSamplebtn.addEventListener('click', retrieve_data);
}

window.onload = function () {
    initApp();
}