class Meditation {
    constructor(time) {
        this.time = time;
    }

    start() {
        let interval = setInterval(() => {
            if (this.time > 0) {
                console.log(this.time);
                this.time--;
            } else {
                clearInterval(interval);
                console.log("Jay Guru Dev");
            }
        }, 1000);
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);
