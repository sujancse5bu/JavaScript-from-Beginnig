//  Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();
    
    // Get Form Values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;
    
    if (!validateForm(siteName, siteURL)){
        return false;
    }
    
    var bookmark = {
        name: siteName,
        url: siteURL
    };
    
    document.getElementById('siteName').value = '';
    document.getElementById('siteURL').value = '';
    
    if (localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();
}






// fetching bookmarks :
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarkResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; ++i) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarkResults.innerHTML += '<div class="well"><h3><div>' + name + 
            '</div><a class="btn btn-info" target="_blank" href="' + url + 
            '"> Visit</a><a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger"> Delete</a></h3></div>';
    }
}

var bookmarkResults = document.getElementById('bookmarkResults');

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; ++i) {
        if (bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if (!siteURL.match(regex)) {
        alert('Please use a Valid URL');
        return false;
    }
    return true;
}