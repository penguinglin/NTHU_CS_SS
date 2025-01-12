let defalutRadius = 10;
$(function () {
    // canvas
    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d'); // rendering context

    // add method 'click' to clean canvas
    let clearBTN = document.getElementById('clear').addEventListener('click', change);

    let mouse = { x: 0, y: 0 };
    // radius
    let radius = 5; // 半徑
    let dragging = false;

    let minRadius = 1;
    let maxRadius = 150;

    // // radius control
    // let new_r = document.getElementById('Line');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Width:' + canvas.width + ' ' + 'Height:' + canvas.height);

    $('#clear').text('Clear');
    $('#addRad').text('+');
    $('#increaseRad').text('-');

    canvas.addEventListener('mousedown', runDo);
    canvas.addEventListener('mouseout', unDo);
    canvas.addEventListener('mousemove', startDraw);
    canvas.addEventListener('mouseup', unDo);

    let leave = document.getElementById('about').addEventListener('click', left);
    function left() {
        alert("It WON'T be SAVED, are you sure you wanna LEAVE?");
    }
    // Canvas setting function
    function startDraw(e) {
        if (dragging === true) {
            context.lineCap = 'round';
            context.lineJoin = 'miter';
            context.lineTo(e.clientX, e.clientY);
            console.log('Your line style is' + ' ' + context.lineCap + '. Step 2');
            context.stroke();
            context.beginPath();
            context.arc(0, 0, radius, 0, 2 * Math.PI / 2 ^ 2 * 5);

            context.fill();
            context.beginPath();
            context.moveTo(e.clientX, e.clientY);
            saveHistory();
        }
    }
    function runDo(e) {
        dragging = true;
        startDraw(e);
    }
    function unDo() {
        dragging = false;
        context.beginPath();
    }
    let clear = false;
    let w = canvas.width - 100;
    let h = canvas.height - 100;
    function change() {
        clear = true;
        clean();
    }
    function clean() {

        if (clear === true) {
            console.log('Erase.............');
            context.beginPath();
            context.inkAmount = 0;

            context.fillRect(0, 0, canvas.width, canvas.width);
            context.fill();
            setSample({
                target: document.getElementsByClassName('sample')[0]
            });
        }
    }

    // Clean canvas function
    function cleanCanvas() {
        var currentLineWidth = context.lineWidth;
        var currentColor = context.strokeStyle;
        // 清空畫布
        canvas.width = canvas.width;
        // 將線條寬度設置回當前保存的值
        context.lineWidth = currentLineWidth;
        context.strokeStyle = currentColor;
    }


    //pencil -not ready
    $('#pencil').click(function () {
        startDrawing();
    });


    // radius control-ok
    let inputLine = document.getElementById('Line');
    inputLine.addEventListener('input', function () {
        let newRadius = parseInt(inputLine.value);
        settingRadius(newRadius);
    });
    function settingRadius(newRadius) {
        if (newRadius < minRadius) {
            newRadius = minRadius;

        } else if (newRadius > maxRadius) {
            newRadius = maxRadius;
        }
        radius = newRadius;
        context.lineWidth = radius * 2;
    }
    settingRadius(defalutRadius);

    // color-ok
    $('#red-slider, #green-slider, #blue-slider').on('input', function () {
        var redValue = $('#red-slider').val();
        var greenValue = $('#green-slider').val();
        var blueValue = $('#blue-slider').val();
        var color = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
        setColor(color);
    });

    function setColor(color) {
        context.fillStyle = color;
        context.strokeStyle = color;
        var active = document.getElementsByClassName('active')[0];
        if (active) {
            active.className = 'sample';
        }
    }
    const redSlider = document.getElementById("red-slider");
    const greenSlider = document.getElementById("green-slider");
    const blueSlider = document.getElementById("blue-slider");
    const colorPreview = document.getElementById("color-preview");

    function updateColorPreview() {
        const redValue = redSlider.value;
        const greenValue = greenSlider.value;
        const blueValue = blueSlider.value;
        const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        colorPreview.style.backgroundColor = color;
    }

    redSlider.addEventListener("input", updateColorPreview);
    greenSlider.addEventListener("input", updateColorPreview);
    blueSlider.addEventListener("input", updateColorPreview);

    updateColorPreview(); // Initialize color preview




    // typing
    var initDraw = function (flag) {
        canvas.rectFlag = false;
        canvas.strokeRectFlag = false;
        canvas.circleFlag = false;
        canvas.strokeCircelFlag = false;
        canvas.lineFlag = false;
        canvas.arrowFlag = false;
        canvas.textFlag = false;
        canvas.eraserFlag = false;

        canvas[flag] = true;

        // 默认背景色
        defaultBtn.style.background = "#fff";
        lineBtn.style.background = "#fff";
        arrowBtn.style.background = "#fff";
        rectBtn.style.background = "#fff";
        strokeRectBtn.style.background = "#fff";
        circleBtn.style.background = "#fff";
        strokeCircleBtn.style.background = "#fff";
        textBtn.style.background = "#fff";
        eraserBtn.style.background = "#fff";

        // 默认文字色
        defaultBtn.style.color = "#000";
        lineBtn.style.color = "#000";
        arrowBtn.style.color = "#000";
        rectBtn.style.color = "#000";
        strokeRectBtn.style.color = "#000";
        circleBtn.style.color = "#000";
        strokeCircleBtn.style.color = "#000";
        textBtn.style.color = "#000";
        eraserBtn.style.color = "#000";

        // 设置鼠标样式，默认画笔，如果
        canvas.style.cursor = "url(../asset/paintbrush.png) 0 0, default";
        if (canvas.eraserFlag) {
            canvas.style.cursor = "url(../asset/eraser-20.png) 10 10, default";
        }
    };


    //todo
    let history = []; // 存储历史操作的数组
    // 将当前 canvas 状态保存到历史数组中
    function saveHistory() {
        let snapshot = canvas.toDataURL();
        history.push(snapshot);
    }

    // Undo 操作
    function undo() {
        if (history.length > 1) {
            history.pop();
            let snapshot = history[history.length - 1];
            let img = new Image();
            img.onload = function () {
                context.clearRect(0, 0, canvas.width, canvas.height); // 清空 canvas
                context.drawImage(img, 0, 0); // 绘制上一个状态的快照
            };
            img.src = snapshot;
        }
    }

    // Redo 操作
    function redo() {
        if (history.length < 2) return;
        let snapshot = history.pop();
        let nextSnapshot = history[history.length - 1];
        let img = new Image();
        img.onload = function () {
            cleanCanvas();
            context.drawImage(img, 0, 0);
        };
        img.src = nextSnapshot;
    }

    // 监听 undo 和 redo 按钮的点击事件
    $('#undo').click(function () {
        undo();
    });

    $('#redo').click(function () {
        redo();
    });

    // UPLOAD 操作-ok
    $('.action.text:contains("UPLOAD")').click(function () {
        if ($(this).parent('.action').hasClass('is-disable')) return;
        $('#file').click();
    });
    $('#file').change(function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var img = new Image();
            img.src = this.result;
            img.onload = function () {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        }
    });
    // SAVE 操作 + CLEAR 操作 -ok
    $('.action .text').click(function () {
        var actionType = $(this).text().trim().toUpperCase();
        if (actionType === 'SAVE') {
            var dataURL = canvas.toDataURL();
            $(this).parent('.action').attr('href', dataURL);
        }
        else if (actionType === 'CLEAR') {
            cleanCanvas()
        }
    });



});


// toolbar display
let toolbarVisible = false;
$('#click').click(function () {
    if (toolbarVisible) {
        $('#popUp').css('margin-left', '-850px');
        $('#click').css('margin-left', '0px');
    } else {
        $('#popUp').css('margin-left', '0px');
        $('#click').css('margin-left', '-850px');
    }
    toolbarVisible = !toolbarVisible;
});
