let counter = 0;
let items = {};
let cps = 0;

// Fetch the config.json file
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        items = data.items;
        createItemTable(items);
        // console.log(items);
    })
    .catch(error => console.error('Error fetching config:', error));

document.getElementById('incrementButton').addEventListener('click', function () {
    counter++;
    updateCounter();
});

function createItemTable(items) {
    const table = document.getElementById('itemTable');

    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            items[key].count = 0;

            let row = table.insertRow();
            let cellAction = row.insertCell(0);
            let cellCost = row.insertCell(1);
            let cellCps = row.insertCell(2);
            let cellCount = row.insertCell(3);

            cellCost.textContent = items[key].cost;
            cellCps.textContent = items[key].cps;
            cellCount.textContent = items[key].count;

            let button = document.createElement('button');
            button.textContent = key;
            button.addEventListener('click', function () {
                if (counter >= items[key].cost) {
                    counter -= items[key].cost;
                    items[key].count++;
                    cellCount.textContent = items[key].count;
                    items[key].cost = items[key].cost * 1.5 ^ items[key].count;
                    cellCost.textContent = items[key].cost;
                    // console.log(items);
                    updateCounter();
                    // setInterval(function () {
                    //     counter += items[key].cps;
                    //     updateCounter();
                    // }, 1000);
                    cps += items[key].cps;
                }
            });
            cellAction.appendChild(button);
            button.disabled = false;
            items[key].button = button; // Store reference to button
        }
    }
    updateCounter();
}

function updateCounter() {
    console.log('updateCounter');
    document.getElementById('counter').textContent = Math.round(counter);

    // Enable/disable buttons based on counter value
    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            items[key].button.disabled = counter < items[key].cost;
        }
    }
}

// 初始化項目表
createItemTable(items);

setInterval(function () {
    counter += cps / 10;

    updateCounter();
}, 100);
