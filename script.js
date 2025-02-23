document.addEventListener("DOMContentLoaded", () => {
    // Tạo tài khoản admin mặc định nếu chưa có
    if (!localStorage.getItem("admin")) {
        localStorage.setItem("admin", JSON.stringify({ password: "admin123", role: "admin" }));
    }
    
    // Lấy user đã đăng nhập trước đó
    currentUser = localStorage.getItem("currentUser");
    updateAuthUI();
});

function showSection(sectionId) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('products').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

// 

function showLogin() {
    showSection('login-form');
}

function showRegister() {
    showSection('register-form');
}

// đăng nhập

function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        currentUser = username;
        localStorage.setItem("currentUser", username); // Lưu tài khoản đang đăng nhập
        alert('Đăng nhập thành công!');

        if (userData.role === "admin") {
            alert("Chào mừng Admin!");
            showAdminPanel();
        } else {
            showSection('home');
        }

        updateAuthUI();
    } else {
        alert('Sai tài khoản hoặc mật khẩu!');
    }
}



// đăng ký

function register(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (localStorage.getItem(username)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    localStorage.setItem(username, JSON.stringify({ password: password, role: "customer" }));
    alert('Đăng ký thành công! Đang tự động đăng nhập...');
    localStorage.setItem("currentUser", username);
    currentUser = username;
    updateAuthUI();
    showSection('home');
}



// đăng xuất

function logout() {
    alert('Đã đăng xuất!');
    localStorage.removeItem("currentUser"); // Xóa user đang đăng nhập
    currentUser = null;
    updateAuthUI();
    showSection('home');
}



// update Admin Panel

function updateAuthUI() {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const isAdmin = userData && userData.role === "admin";

    document.getElementById('login-link').style.display = currentUser ? 'none' : 'block';
    document.getElementById('register-link').style.display = currentUser ? 'none' : 'block';
    document.getElementById('logout-link').style.display = currentUser ? 'block' : 'none';
    document.getElementById("admin-panel").style.display = isAdmin ? "block" : "none";
}

function showAdminPanel() {
    showSection('admin-panel');
}



function searchProducts() {
    let input = document.getElementById("search-box").value.toLowerCase();
    let productCards = document.getElementsByClassName("fruit-card");

    for (let i = 0; i < productCards.length; i++) {
        let productName = productCards[i].getElementsByClassName("fruit-name")[0].innerText.toLowerCase();
        if (productName.includes(input)) {
            productCards[i].style.display = "block";
        } else {
            productCards[i].style.display = "none";
        }
    }
}
// Chat support
// Mở / đóng hộp chat
function toggleChat() {
    let chatBox = document.getElementById("chat-box");
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "block";
    } else {
        chatBox.style.display = "none";
    }
}

// Xử lý gửi tin nhắn khi nhấn Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Gửi tin nhắn vào hộp chat
function sendMessage() {
    let input = document.getElementById("chat-input");
    let message = input.value.trim();

    if (message !== "") {
        let chatMessages = document.getElementById("chat-messages");

        // Tạo tin nhắn của người dùng
        let userMessage = document.createElement("div");
        userMessage.textContent = "Bạn: " + message;
        userMessage.classList.add("user-message");

        chatMessages.appendChild(userMessage);
        input.value = "";

        // Giả lập tin nhắn phản hồi từ support
        setTimeout(() => {
            let supportMessage = document.createElement("div");
            supportMessage.textContent = "Support: Chúng tôi đã nhận được tin nhắn của bạn!";
            supportMessage.classList.add("support-message");

            chatMessages.appendChild(supportMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống cuối cùng
        }, 1000);

        chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống cuối cùng
    }
}

// ẩn chat
document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chatBox");
    const toggleChat = document.getElementById("toggleChat");
    const closeChat = document.getElementById("closeChat");
  
    toggleChat.addEventListener("click", function() {
      chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
    });
  
    closeChat.addEventListener("click", function() {
      chatBox.style.display = "none";
    });
  });

// Đảm bảo chat-box luôn hiển thị trên tất cả các phần tử khác
const chatBox = document.getElementById("chat-box");
if (chatBox) {
    chatBox.style.position = "fixed";
    chatBox.style.zIndex = "9999"; // Luôn hiển thị trên cùng
}

// Đảm bảo chat-box luôn hiển thị trên tất cả các phần tử khác
const chatbutton = document.getElementById("chat-button");
if (chatbutton) {
    chatbutton.style.position = "fixed";
    chatbutton.style.zIndex = "9999"; // Luôn hiển thị trên cùng
}

// mua hàng
function showProducts() {
    document.getElementById("products").style.display = "block";
    document.getElementById("home").style.display = "none";
    document.getElementById("contact").style.display = "none";
    
    const fruits = [
    { name: "Thanh Long", price: "35.000đ/kg", image: "thanhlong.jpg " },
    { name: "Táo Xanh", price: "50.000đ/kg", image: "tao.png" },
    { name: "Dứa Đồng Giao", price: "20.000đ/kg", image: "dua.jpg" },
    { name: "Chanh Không Hạt", price: "25.000đ/kg", image: "chanh.jpg" },
    { name: "Mít Nghệ", price: "40.000đ/kg", image: "mit.jpg" },
    { name: " Măng cụt Huế", price: "45.000đ/kg", image: "mangcut.jpg" },
    { name: " Vải thiều Nghệ An", price: "70.000đ/kg", image: "vai.jpg" },
    { name: " Nho Ninh Thuận", price: "80.000đ/kg", image: "nho.jpg" },
    { name: " Dừa ", price: "30.000đ/kg", image: "duav1.jpg" },
    { name: " Sầu Riêng", price: "120.000đ/kg", image: "saurieng.jpg" },
    { name: " Bơ", price: "90.000đ/kg", image: "bo.webp" },
    { name: " Mận An Phước ", price: "90.000đ/kg", image: "man.webp" }
                    ]

    const fruitList = document.getElementById("fruit-list");
    fruitList.innerHTML = ""; // Xóa nội dung cũ trước khi tải
    
    fruits.forEach(fruit => {
        const fruitCard = document.createElement("div");
        fruitCard.classList.add("fruit-card");
        fruitCard.innerHTML = `
            <img src="${fruit.image}" alt="${fruit.name}">
            <div class="fruit-name">${fruit.name}</div>
            <div class="fruit-price">${fruit.price}</div>
        `;
        fruitList.appendChild(fruitCard);
    });
}

function showHome() {
    document.getElementById("products").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("contact").style.display = "none";
}

function showContact() {
    document.getElementById("products").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("contact").style.display = "block";
}




document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("view-products-btn").addEventListener("click", () => {
        showProducts(); // Gọi hàm hiển thị sản phẩm
    });
});

// tài khoản admin


document.addEventListener("DOMContentLoaded", () => {
    // Tạo tài khoản admin nếu chưa có
    if (!localStorage.getItem("admin")) {
        localStorage.setItem("admin", JSON.stringify({ password: "admin123", role: "admin" }));
    }
    updateAuthUI();
});


function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (localStorage.getItem(username) === password) {
        currentUser = username;
        alert('Đăng nhập thành công!');

        if (username === "admin") {
            alert("Chào mừng Admin!"); // Hiển thị thông báo đặc biệt cho Admin
            showAdminPanel(); // Nếu là admin, hiển thị giao diện quản trị (tùy chỉnh)
        } else {
            showSection('home');
        }

        updateAuthUI();
    } else {
        alert('Sai tài khoản hoặc mật khẩu!');
    }
}

function showAdminPanel() {
    document.getElementById("admin-panel").style.display = "block";
    document.getElementById("home").style.display = "none";
}

// lưu dữ liệu khi đăng xuất

document.addEventListener("DOMContentLoaded", () => {
    currentUser = localStorage.getItem("currentUser");
    updateAuthUI();
});



