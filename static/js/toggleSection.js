function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.icon');
    
    // Toggle content display
    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.textContent = '+'; // Change icon to +
    } else {
        content.style.display = 'block';
        icon.textContent = '−'; // Change icon to -
    }
}