function redirectToAnotherPage() {
    // 導航到另一個 HTML 頁面
    window.location.href = 'index.html';
}

// 監聽鍵盤按下事件
document.addEventListener('keydown', function (event) {
    redirectToAnotherPage();
});

// 監聽滑鼠左鍵點擊事件
document.addEventListener('click', function (event) {
    redirectToAnotherPage();
});

