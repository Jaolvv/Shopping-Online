<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>弹框</title>
    <link rel="Icon" href="../imagess/icon.png" type="image/x-icon"/><!-- icon图标 -->
    <style>
        body {
            font-family: "HarmonyOS Sans SC";
            font-size: 17px;
            line-height: 1.6;
        }

        .button {
            border: 0;
            background-color: coral;
            color: #fff;
            padding: 1em 2em;
        }

        .button:hover {
            background-color: #333;
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: #f4f4f4;
            margin: 15% auto;
            width: 80%;
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
            animation-name: modalopen;
            animation-duration: 1s;
        }

        .modal-header h2, .modal-footer h3 {
            margin: 0;
        }

        .modal-header {
            background-color: coral;
            padding: 15px;
            color: #fff;
        }

        .closeBtn {
            color: #fff;
            float: right;
            font-size: 30px;
        }

        .closeBtn:hover, .closeBtn:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

        .modal-body {
            padding: 10px 20px;
        }

        .modal-footer {
            color: #fff;
            background-color: coral;
            padding: 10px;
            text-align: center;
        }

        @keyframes modalopen {
            from {
                opacity: 0
            }
            to {
                opacity: 1
            }
        }
    </style>
</head>
<body>
<button id="modalBtn" class="button">弹窗</button>
<!-- 弹框部分 -->
<div id="simpleModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <span class="closeBtn">&times;</span>
            <h2>Head</h2>
        </div>
        <div class="modal-body">
            <p>Test</p>
            <p>Nothing here</p>
        </div>
        <div class="modal-footer">
            <h3>Footer</h3>
        </div>
    </div>
</div>
<script>
    // 获取弹窗元素
    var modal = document.getElementById("simpleModal");

    // 获取按钮元素
    var modalBtn = document.getElementById("modalBtn");

    // 获取关闭弹窗按钮元素
    var closeBtn = document.getElementsByClassName("closeBtn")[0];

    // 监听打开弹窗事件
    modalBtn.addEventListener("click", openModal);

    // 监听关闭弹窗事件
    closeBtn.addEventListener("click", closeModal);

    // 监听window关闭弹窗事件
    window.addEventListener("click", outsideClick);

    // 弹窗事件
    function openModal() {
        modal.style.display = "block";
    }

    // 关闭弹框事件
    function closeModal() {
        modal.style.display = "none";
    }

    // outsideClick
    function outsideClick(e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }
</script>
</body>
</html>
