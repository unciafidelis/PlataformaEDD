const tabs = document.querySelectorAll('.tab');
            const contents = document.querySelectorAll('.content');
    
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    // Add active class to the clicked tab
                    tab.classList.add('active');
    
                    // Hide all content sections
                    contents.forEach(content => content.classList.remove('active'));
                    // Show the content corresponding to the clicked tab
                    document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
                });
            });