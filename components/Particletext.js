import React, { useEffect, useRef } from "react";

function ParticleText() {
  const canvasRef = useRef(null);
  useEffect(() => {
    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          let dx = particleArray[a].x - particleArray[b].x;
          let dy = particleArray[a].y - particleArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let PD = 45;
          if (distance < PD) {
            opacityValue = 1 - distance / PD;
            context.strokeStyle = "rgba(255,255,255," + opacityValue + ")";
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(particleArray[a].x, particleArray[a].y);
            context.lineTo(particleArray[b].x, particleArray[b].y);
            context.stroke();
          }
        }
      }
    }

    // window.addEventListener("resize", function () {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    // });

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth + 300;
    canvas.height = window.innerHeight - 500;
    let adjustX = 0;
    let adjustY = 0;
    //Our first draw
    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, canvas.width, canvas.height);

    //resize event
    // window.addEventListener("resize", function () {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    //   adjustX = canvas.width / 2;
    //   adjustY = canvas.height / 2;
    // });

    let particleArray = [];

    const mouse = {
      x: null,
      y: null,
      radius: 130,
    };

    let canvasPosition = canvas.getBoundingClientRect();
    window.addEventListener("mousemove", function (e) {
      mouse.x = e.x + 150;
      mouse.y = e.y - 50;
    });
    context.fillStyle = "#000000";
    context.font = "bold 13px AvenirBook";
    context.fillText("Zach Rizzo", 3, 15);
    const textCoordinates = context.getImageData(0, 0, 100, 100);
    class Particle {
      constructor(x, y) {
        this.x = x + 200;
        this.y = y - 100;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 80 + 5;
      }
      draw() {
        context.fillStyle = "#D5C9C9";
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirtectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirtectionY * force * this.density;
        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          //this returns particle to orginal position
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    function init() {
      particleArray = [];
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (
            textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] >
            128
          ) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            // let positionX = x;
            // let positionY = y;
            particleArray.push(new Particle(positionX * 20, positionY * 20));
          }
        }
      }
      // for (let i = 0; i < 100; i++) {
      //   let x = Math.random() * context.canvas.width;
      //   let y = Math.random() * context.canvas.height;
      //   particleArray.push(new Particle(x, y));
      // }

      // particleArray.push(new Particle(50, 50));
      // particleArray.push(new Particle(80, 50));
    }

    console.log(particleArray);
    function animate() {
      context.fillStyle = "#D5C9C9";
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      connect();
      requestAnimationFrame(animate);
    }

    init();
    animate();
  }, []);

  return (
    <div className=" flex justify-self-center items-center  justify-center ">
      <canvas className=" flex justify-center" ref={canvasRef}></canvas>
    </div>
  );
}

export default ParticleText;
