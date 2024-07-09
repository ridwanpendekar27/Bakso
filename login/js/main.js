const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.login-wrap');

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

function goTo() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin@gmail.com' && password === 'admin123') {
        window.location.href = '/assets/page/admin.html';
    } else if (username === 'user@gmail.com' && password === 'user123') {
        window.location.href = '/assets/page/user.html';
    } else {
        document.getElementById('message').textContent = 'Username atau password salah!';
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah submit form yang sebenarnya
	console.log('Form submitted');
    goTo();
});