function startMockTest() {
    alert("🚀 Welcome to TNPSC Topper Academy!\n\nMock Test feature is coming in the next update.");
}

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("startBtn");
    if (btn) {
        btn.addEventListener("click", startMockTest);
    }
});
