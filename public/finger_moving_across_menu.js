
//document.addEventListener("touchstart", function(){}, true);

/* tried to enable finger moving across menu items but didnt work
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.dropdown-item');
  //alert("Hello! I am an alert box!"); 
    menuItems.forEach(item => {
        item.addEventListener('touchstart', () => {
            item.classList.add('active');
        });
  
        item.addEventListener('touchend', () => {
            item.classList.remove('active');
        });
  
        item.addEventListener('touchmove', (event) => {
          event.preventDefault(); // Prevent default scrolling behavior
            item.classList.remove('active');
        });
    });
  });
  */