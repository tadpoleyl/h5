import "../js/particles";
import $ from  "../js/jquery-1.11.0.min";
import "../js/digit";
const init={
    init:function(){
        "use strict";
        this.bindEvent();
        this.particles();
        this.clock("header-clock");
    },
    bindEvent:function(){
        "use strict";
        window.addEventListener('resize', ()=> {
        });
    },
    particles:function() {
        "use strict";
        particlesJS('particles-js', {
            particles: {
                color: '#5ce55c',//#fff
                shape: 'edge', // "circle", "edge" or "triangle"
                opacity: 1,
                size: 1,
                size_random: true,
                nb: 80,
                line_linked: {
                    enable_auto: true,
                    distance: 80,
                    color: '#24b33c',//#fff
                    opacity: 1,
                    width: 1,
                    condensed_mode: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 600
                    }
                },
                anim: {
                    enable: true,
                    speed: 5
                }
            },
            interactivity: {
                enable: true,
                mouse: {
                    distance: 300
                },
                detect_on: 'canvas', // "canvas" or "window"
                mode: 'grab',
                line_linked: {
                    opacity: .6
                },
                events: {
                    onclick: {
                        enable: false,
                        mode: 'push', // "push" or "remove"
                        nb: 4
                    }
                }
            },
            /* Retina Display Support */
            retina_detect: true
        });
    },
    clock:function(id){
        "use strict";
        var can=document.getElementById(id);
        var ctx=can.getContext("2d");
        var x= 20,y=75, R=1.25,balls=[];
        var colors=["#008000","#FF6600","#f92672","#e67e22","#960050","#aaffaa","#ae81ff","#a3dbec","#c7254e","#00A000"];
        var hours= 0,minutes= 0,seconds= 0,lastSeconds= 0,lastMinutes= 0,lastHours=0;
        var nowDate = new Date();
        lastHours = nowDate.getHours();
        lastMinutes = nowDate.getMinutes();
        lastSeconds = nowDate.getSeconds();

        init();

        setInterval(function(){
            init();
        },50);

        function init() {
            nowDate = new Date();
            hours = nowDate.getHours();
            minutes = nowDate.getMinutes();
            seconds = nowDate.getSeconds();
            update(hours, minutes, seconds);
            time();
        }

        function time() {
            if (seconds != lastSeconds) {
                if (parseInt(seconds / 10) != parseInt(lastSeconds / 10)) {
                    addBalls(x + 79 * (R + 1), y, parseInt(seconds / 10));
                }
                if (parseInt(seconds % 10) != parseInt(lastSeconds % 10)) {
                    addBalls(x + 96 * (R + 1), y, parseInt(seconds % 10));
                }
                lastSeconds = seconds;
            }
            if (minutes != lastMinutes) {
                if (parseInt(minutes / 10) != parseInt(lastMinutes / 10)) {
                    addBalls(x + 38 * (R + 1), y, parseInt(minutes / 10));
                }
                if (parseInt(minutes % 10) != parseInt(lastMinutes % 10)) {
                    addBalls(x + 55 * (R + 1), y, parseInt(minutes % 10));
                }
                lastMinutes = minutes;
            }
            if (hours != lastHours) {
                if (parseInt(hours / 10) != parseInt(lastHours / 10)) {
                    addBalls(x, y, parseInt(hours / 10));
                }
                if (parseInt(hours % 10) != parseInt(lastHours % 10)) {
                    addBalls(x + 15 * (R + 1), y, parseInt(hours % 10));
                }
                lastHours = hours;
            }

            updateBall();
            clearBall();
        }

        function update(hours,minutes,seconds){
            ctx.clearRect(0,0,can.width,can.height);

            drawArc(x,y,parseInt(hours/10),ctx);
            drawArc(x+15*(R+1),y,hours%10,ctx);
            drawArc(x+29*(R+1),y,10,ctx);

            drawArc(x+38*(R+1),y,parseInt(minutes/10),ctx);
            drawArc(x+55*(R+1),y,minutes%10,ctx);
            drawArc(x+70*(R+1),y,10,ctx);

            drawArc(x+79*(R+1),y,parseInt(seconds/10),ctx);
            drawArc(x+96*(R+1),y,seconds%10,ctx);

            for(var i= 0;i<balls.length;i++) {
                ctx.beginPath();
                ctx.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI, true);
                ctx.fillStyle = balls[i].color;
                ctx.closePath();
                ctx.fill();
            }
        }

        function drawArc(sx,sy,num,ctx){
            for(var i=0;i<digit[num].length;i++){
                for(var j=0;j<digit[num][i].length;j++) {
                    if (digit[num][i][j] == 1) {
                        var centerX = sx + j * 2 * (R + 1) + (R + 1);
                        var centerY = sy + i * 2 * (R + 1) + (R + 1);
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, R, 0, 2 * Math.PI, true);
                        ctx.fillStyle = "#445588";
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
        }

        function addBalls(sx,sy,num){
            for(var i=0;i<digit[num].length;i++){
                for(var j=0;j<digit[num][i].length;j++) {
                    if (digit[num][i][j] == 1) {
                        var centerX = sx + j * 2 * (R + 1) + (R + 1);
                        var centerY = sy + i * 2 * (R + 1) + (R + 1);
                        var ball = {
                            x: centerX,
                            y: centerY,
                            g: 3.5 + Math.random(),
                            vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                            vy: -2,
                            color: colors[Math.floor(Math.random() * colors.length)]
                        };
                        balls.push(ball);
                    }
                }
            }
        }

        function updateBall(){
            for(var i= 0;i<balls.length;i++) {
                balls[i].x+=balls[i].vx;
                balls[i].y+=balls[i].vy;
                balls[i].vy+=balls[i].g;
                if(balls[i].y>=can.height-R) {
                    balls[i].y = can.height - R;
                    balls[i].vy = -balls[i].vy * 0.75;
                }
            }
        }

        function clearBall() {
            var cnt = 0;
            for (var i = 0; i < balls.length; i++) {
                if (balls[i].x + R > 0 && balls[i].x - R < can.width) {
                    balls[cnt++] = balls[i];
                }
            }
            while (balls.length > cnt) {
                balls.pop();
            }
        }
    }
};

init.init();