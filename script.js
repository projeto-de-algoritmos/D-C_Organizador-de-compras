// Função para adicionar um item à lista
function addItem() {
    var itemInput = document.getElementById("itemInput");
    var itemText = itemInput.value.trim();
    
    if (itemText !== "") {
        var itemList = document.getElementById("itemList");
        var li = document.createElement("li");
        const btnRemoveItem = document.createElement("button");
        btnRemoveItem.innerHTML = "X";
        var currentIndex = itemList.getElementsByTagName("li").length;
        li.setAttribute("data-index", currentIndex);
        btnRemoveItem.addEventListener("click", function() {
            var index = parseInt(this.parentNode.getAttribute("data-index"));
            removeItem(index);
          });
        btnRemoveItem.className = "custom-button";
        li.appendChild(document.createTextNode(itemText));
        li.appendChild(btnRemoveItem);
        itemList.appendChild(li);
        
        itemInput.value = "";
        
        sortItemList();
    }
}

// Função para remover um item da lista de compras
function removeItem(index) {
    var itemList = document.getElementById("itemList");
    var itemToRemove = itemList.querySelector('li[data-index="' + index + '"]');
    if (itemToRemove) {
      itemList.removeChild(itemToRemove);
    }
  }
module.exports = removeItem



// Função para ordenar a lista de compras
function sortItemList() {
    //var itemList = document.getElementById("itemList");
    var items = itemList.getElementsByTagName("li");
    var sortedItems = mergeSort(Array.from(items), compareItems);
    
    // Remover todos os itens da lista
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    
    // Adicionar os itens ordenados à lista
    sortedItems.forEach(function(item) {
        itemList.appendChild(item);
    });
}

// Função de comparação para o Merge Sort
function compareItems(a, b) {
    var textA = a.textContent.toUpperCase();
    var textB = b.textContent.toUpperCase();
    
    if (textA < textB) {
        return -1;
    }
    
    if (textA > textB) {
        return 1;
    }
    
    return 0;
}

// Implementação do Merge Sort
function mergeSort(arr, compareFunc) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    return merge(
        mergeSort(left, compareFunc),
        mergeSort(right, compareFunc),
        compareFunc
    );
}

function merge(left, right, compareFunc) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (compareFunc(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}