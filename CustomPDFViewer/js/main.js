const url = '../docs/pdf.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageIsPending = null;

const scale = 1.5,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

// Render the page
const renderPage = num => {
    pageIsPending = true;
    
    // Get page
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderCtx = {
            canvasContext: ctx,
            viewport
        }
        
        page.render(renderCtx).promise.then( () => {
            pageIsRendering = false;
            if (pageIsPending !== null) {
                renderPage(pageIsPending);
                pageIsPending = null;
            }
        });
        document.getElementById('page-num').textContent = num;
    });
};

// Check for page rendering
const queueRenderPage = num => {
    if (pageIsRendering) {
        pageIsRendering = num;
    } else {
        renderPage(num);
    }
}

// show prev page
const showPrevPage = () => {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

// show Next page
const showNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

// Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    document.getElementById('page-count').textContent = pdfDoc.numPages;
    
    renderPage(pageNum);
}).catch(err => {
    // Display error
    const div = document.createElement('div');
    div.className = 'error';
    div.appendChild(document.createTextNode(err.message));
    document.querySelector('body').insertBefore(div, canvas);
    // Remove top var 
    document.querySelector('.top-bar').style.display = 'none';
    
});

// button events 

document.getElementById('prev-page').addEventListener('click', showPrevPage);
document.getElementById('next-page').addEventListener('click', showNextPage);
