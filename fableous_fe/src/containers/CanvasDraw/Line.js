import Konva from "konva";

export const addLine = (stage, layer, image, context, color, mode) => {
    let isPaint = false;
    let pos;
    stage.on("mousedown touchstart", function(e) {
        isPaint = true;
        context.strokeStyle = color;
        context.lineJoin = "round";
        context.lineCap = 'round';
        context.lineWidth = 5;
        context.globalCompositeOperation = "source-over";
        pos = image.getStage().getPointerPosition();

    });
    stage.on("mouseup touchend", function() {
        isPaint = false;
    });
    stage.on("mousemove touchmove", function() {
        if (!isPaint) {
            return;
        }
        context.beginPath();
        context.moveTo(pos.x, pos.y);
        pos = image.getStage().getPointerPosition();
        context.lineTo(pos.x, pos.y);
        context.closePath();
        context.stroke();
        image.draw();
    });
};
