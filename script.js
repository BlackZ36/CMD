document.addEventListener("DOMContentLoaded", function () {
  const output = document.querySelector(".output");
  const input = document.querySelector(".input-right input");
  const executeButton = document.querySelector(".input-left button");
  const progressBar = document.querySelector(".progress-bar");
  const Bar = document.querySelector(".bar");
  const progressLabel = document.querySelector(".progress-label");
  const status = document.querySelector(".status");

  const commandList = [
    { command: "command1", time: 1000 },
    { command: "command2", time: 1000 },
    { command: "command3", time: 1000 },
    { command: "help", time: 1000 },
  ];

  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      if (input.value.trim() === "") {
        status.textContent = "ERROR !!!";
        status.className = "status";
        status.classList.add("red-bg");
      } else {
        executeCommand();
      }
    }
  });

  executeButton.addEventListener("click", function () {
    if (input.value.trim() === "") {
      status.textContent = "ERROR !!!";
      status.className = "status";
      status.classList.add("red-bg");
    } else {
      executeCommand();
    }
  });

  function executeCommand() {
    const command = input.value.trim();
    input.value = ""; // Xóa nội dung trong ô input sau khi thực thi lệnh

    // Kiểm tra xem lệnh có tồn tại trong danh sách không
    if (commandList.some((cmd) => cmd.command === command)) {
      const selectedCommand = commandList.find((cmd) => cmd.command === command);
      output.innerHTML += `<div class="output-log"> > Executing command: ${command}</div>`;

      switch (command) {
        case "help":
          // Khởi chạy progress bar
          startProgressBar(() => {
            output.innerHTML += `<div class="output-log"> > Executed command: ${command}</div>`;
            scrollConsoleToBottom();
          }, selectedCommand.time);
          break;
        case "command1":
          // Khởi chạy progress bar
          startProgressBar(() => {
            output.innerHTML += `<div class="output-log"> > Executed command: ${command}</div>`;
            scrollConsoleToBottom();
          }, 1000);
          break;
        case "command2":
          // Khởi chạy progress bar
          startProgressBar(() => {
            output.innerHTML += `<div class="output-log"> > Executed command: ${command}</div>`;
            scrollConsoleToBottom();
          }, 1000);
          break;
        case "command3":
          // Khởi chạy progress bar
          startProgressBar(() => {
            output.innerHTML += `<div class="output-log"> > Executed command: ${command}</div>`;
            scrollConsoleToBottom();
          }, 1000);
          break;
        default:
          break;
      }
    } else {
      output.innerHTML += `<div class="output-log" > > Invalid command: ${command}</div>`;
      status.textContent = "INVALID !!!";
      status.className = "status";
      status.classList.add("red-bg");
    }
  }

  function startProgressBar(callback, duration) {
    progressBar.querySelector(".bar").classList.remove("hidden");
    let progress = 0;

    status.textContent = "EXECUTING";
    status.className = "status";
    status.classList.add("normal-bg");

    input.disabled = true;

    const totalIterations = Math.floor(duration / 50); // Số lần lặp cần thiết để đạt được thời gian mong muốn
    const increment = 100 / totalIterations; // Mức tăng tỉ lệ phần trăm cho mỗi lần lặp

    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        progressBar.querySelector(".bar").classList.add("hidden");
        if (typeof callback === "function") {
          callback(); // Gọi hàm callback sau khi thanh tiến trình đã hoàn thành
        }

        status.textContent = "DONE";
        status.className = "status";
        status.classList.add("green-bg");

        input.disabled = false;
        input.focus();
        input.scrollIntoView();
      } else {
        progress += increment;
        progressBar.querySelector(".bar").style.width = `${progress}%`;
        progressLabel.textContent = `${Math.round(progress)}%`;
      }
    }, 50);
  }

  function scrollConsoleToBottom() {
    const consoleElement = document.querySelector(".console");
    consoleElement.scrollTop = consoleElement.scrollHeight;
  }
});
