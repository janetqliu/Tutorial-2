var globalData = [];
d3.csv("/ExampleData.csv", function(data) {
    globalData.push(data);
});

// New JS Below

function modularAddD3VisToPage(elementID){
    //PRE: Pass the string of the ID we want to append the new D3 Vis to
    //POST: Updated the web page to include the D3 vis as a child of the element whose ID we pass


}

function staticAddD3VisToPage(){
    //PRE: When a D3 Function you pass needs to be stapled to a specific ID to make it work, put that code here and update the HTML accordingly

    //EXAMPLE:  This link (https://d3-graph-gallery.com/graph/choropleth_basic.html) requires you to add some scripts to the HTML and
    //          already have an SVG element in your HTML with an id of "my_dataviz"

}

function processD3Vis(){
    //PRE: Nothing needed to be passed to this function when called
    //POST: Parses the code provided below and returns an SVG that includes information about the data to be visualized

    //Example:  We pass the code from this link (https://observablehq.com/@d3/bar-chart/2) which returns the SVG node as opposed to 
    //          building the vis and attaching it to a pre-existing SVG element

    return;
}

// Old JS Below


function sort(compareObject,display) {
    var table = document.getElementById("recordsTable"),
    tbody = table.getElementsByTagName("tbody")[0];
    
    if(display)
        tbody.innerHTML = "";

    let tempArray = globalData.slice();

    if(compareObject == "Date"){
        tempArray.sort(compareDate);
    } else if(compareObject == "Amount"){
        tempArray.sort(compareAmount);
    } else if(compareObject == "Name"){
        tempArray.sort(compareName);
    }



    if(display==true){
        for (var i=0;i<tempArray.length;i++) {
            var row = document.createElement("tr");
            row.id = tempArray[i].ID
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            cell1.innerHTML = tempArray[i].Customer
            cell2.innerHTML = tempArray[i].PurchaseDate
            cell3.innerHTML = tempArray[i].PurchaseAmount
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            tbody.appendChild(row);  
        }
    } else {
        return tempArray;
    }
}

function highlightHighest(compareObject){
    let id = sort(compareObject,false)[0].ID;
    possibleCurrentHighlight = document.getElementsByClassName("highlighter")[0]
    if(possibleCurrentHighlight != undefined)
        possibleCurrentHighlight.classList.remove("highlighter")

    document.getElementById(id).classList.add("highlighter")
}

function dropLowest(compareObject){
    let id = sort(compareObject,false)[globalData.length-1].ID;
    var idColumn = globalData.map(function(value,index) { return value.ID; });
    globalData.splice(idColumn.indexOf(id),1)
    document.getElementById(id).remove();
}


function compareDate(a, b){
    var aDate = new Date(a.PurchaseDate)
    var bDate = new Date(b.PurchaseDate)

    if (aDate < bDate) {
        return -1;
    } else if (aDate > bDate) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

function compareAmount(a,b){
    var aAmount = parseFloat(a.PurchaseAmount.replace("$", ""))
    var bAmount = parseFloat(b.PurchaseAmount.replace("$", "")) 
    if (aAmount < bAmount) {
        return -1;
    } else if (aAmount > bAmount) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

function compareName(a,b){
    if (a.Customer < b.Customer) {
        return -1;
    } else if (a.Customer > b.Customer) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

