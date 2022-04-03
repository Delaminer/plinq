var iframe = document.createElement('iframe'); 
iframe.style.background = '#EEEEEE';
iframe.style.height = '100%';
iframe.style.width = '400px';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.right = '0px';
iframe.style.zIndex = '9000000000000000000';
iframe.style.border = '0px';
iframe.style.fontFamily = 'Montserrat';
iframe.style.borderColor = '#EEEEEE'
iframe.style.borderWidth = '1px'

// let base = document.createElement('p');
// base.textContent = ' hey.'

// iframe.appendChild(base);
document.body.style.paddingRight = '400px';
document.body.appendChild(iframe);
iframe.contentDocument.body.textContent = 'Add Contact to Plinq'