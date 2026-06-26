import { LightningElement } from 'lwc';

export default class Clock extends LightningElement {

      currentTime;
    timer;

    connectedCallback() {
        this.updateClock();

        this.timer = setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    updateClock() {
        const now = new Date();

        this.currentTime = now.toLocaleTimeString(
            'en-IN',
            {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        );
    }

    disconnectedCallback() {
        clearInterval(this.timer);
    }
}