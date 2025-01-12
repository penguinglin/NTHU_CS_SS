// 提供的名字列表
const first_name_list = ['Adam', 'Eric', 'Peter'];

// 提供的姓氏列表
const last_name_list = ['Jones', 'Smith', 'Johnson'];

// 提供的用戶名列表
const username_list = ['Zeus', 'Faker', 'Keria'];

// 提供的電子郵件列表
const email_list = ['asdf@google.com', 'qwer@microsoft.com', 'zxcv@cs.nthu.edu.tw'];

// 提供的地址列表
const address_list = ['1027 Alpha Avenue', '3132 Kidd Avenue', '876 Jefferson Street'];

function get_info() {
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.1) {
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

function get_firstname() {
    return new Promise((resolve, reject) => {
        let timer = Math.floor(Math.random() * 1000 + 500);
        let success_rate = Math.random();
        if (success_rate > 0.1) { // 90% success rate
            setTimeout(() => {
                let firstName = first_name_list[Math.floor(Math.random() * first_name_list.length)];
                resolve(firstName);
            }, timer);
        } else {
            setTimeout(() => {
                reject('get_firstname Failed');
            }, timer);
        }
    });
}

function get_lastname() {
    return new Promise((resolve, reject) => {
        let timer = Math.floor(Math.random() * 1000 + 500);
        let success_rate = Math.random();
        if (success_rate > 0.1) { // 90% success rate
            setTimeout(() => {
                let lastName = last_name_list[Math.floor(Math.random() * last_name_list.length)];
                resolve(lastName);
            }, timer);
        } else {
            setTimeout(() => {
                reject('get_lastname Failed');
            }, timer);
        }
    });
}

function get_username() {
    return new Promise((resolve, reject) => {
        let timer = Math.floor(Math.random() * 1000 + 500);
        let success_rate = Math.random();
        if (success_rate > 0.1) { // 90% success rate
            setTimeout(() => {
                let username = username_list[Math.floor(Math.random() * username_list.length)];
                resolve(username);
            }, timer);
        } else {
            setTimeout(() => {
                reject('get_username Failed');
            }, timer);
        }
    });
}

function get_email() {
    return new Promise((resolve, reject) => {
        let timer = Math.floor(Math.random() * 1000 + 500);
        let success_rate = Math.random();
        if (success_rate > 0.1) { // 90% success rate
            setTimeout(() => {
                let email = email_list[Math.floor(Math.random() * email_list.length)];
                resolve(email);
            }, timer);
        } else {
            setTimeout(() => {
                reject('get_email Failed');
            }, timer);

        }
    });
}

function get_address() {
    return new Promise((resolve, reject) => {
        let timer = Math.floor(Math.random() * 1000 + 500);
        let success_rate = Math.random();
        if (success_rate > 0.1) { // 90% success rate
            setTimeout(() => {
                let address = address_list[Math.floor(Math.random() * address_list.length)];
                resolve(address);
            }, timer);
        } else {
            setTimeout(() => {
                reject('get_address Failed');
            }, timer);
        }
    });
}

const initApp = () => {
    const reSamplebtn = document.getElementById('resamplebtn');
    reSamplebtn.addEventListener('click', retrieve_data);
}

async function retrieve_data() {
    const txtInfoName = document.getElementById('user-info-name');
    const txtFirstName = document.getElementById('firstName');
    const txtLastName = document.getElementById('lastName');
    const txtUserName = document.getElementById('username');
    const txtEmail = document.getElementById('email');
    const txtAddress = document.getElementById('address');
    const boxReSample = document.getElementById('re-sample');
    txtInfoName.innerText = '-';
    txtFirstName.value = '-';
    txtLastName.value = '-';
    txtUserName.value = '-';
    txtEmail.value = '-';
    txtAddress.value = '-';
    try {
        txtInfoName.innerText = await get_info() + '\'s Information';
        data = await Promise.all([get_firstname(), get_lastname(), get_username(), get_email(), get_address()]);

        // Update the UI with retrieved data
        txtFirstName.value = data[0];
        txtLastName.value = data[1];
        txtUserName.value = data[2];
        txtEmail.value = data[3];
        txtAddress.value = data[4];

    } catch (e) {
        console.log(e);
        txtInfoName.innerText = 'Failed';
        if (boxReSample.checked) {
            retrieve_data();
        }
    }
}


window.onload = function () {
    initApp();
}
