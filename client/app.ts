import getModule from './module';
import * as Thread from 'async-threading';

var calculationManager = null;
(async () => {
    let module = (await getModule()).instance.exports;
    calculationManager = new CalculationManager(module.fib);
})();

const SOCKET_ADDRESS = 'ws://localhost:9001';

interface IComputedCallback {
    (input: number, output: number) : void;
}

class Calculation {
    private connection: WebSocket;

    private calculationInputBuffer = Array<number>();

    private func: any;

    //private memory = Array<number>();

    private asyncCallerThread: Thread;

    private callback: IComputedCallback;

    constructor(connection: WebSocket, func: any, callback: IComputedCallback) {
        connection.onopen = this.onopen.bind(this);
        this.connection = connection;

        this.func = func;
        this.callback = callback;
    }

    private step() {
        let input = this.calculationInputBuffer.shift();
        if (!input) return;

        let output: number;

        //if (this.memory[input]) {
        //    output = this.memory[input];
        //} else {
            output = this.func(input);
        //}

        this.connection.send(output.toString());

        //this.memory[input] = output;

        this.callback(input, output);
    }

    public onopen() {
        this.connection.onmessage = this.incomingdata.bind(this);
        this.connection.onerror = this.error.bind(this);

        this.asyncCallerThread = new Thread(this.step.bind(this), 1000 / 30);

        this.connection.send('ready.'); // Full byte sent. Slave thread is ready for calculation input.
    }

    private incomingdata(data: any) {
        this.calculationInputBuffer.push(data.data);
    }

    private error() {

    }

    private close() {
        this.connection.close();
    }
}

class CalculationManager {

    private calculations = Array<Calculation>();

    private funcReference: any;

    private calculationCountElement: HTMLHeadElement;
    private calculationBufferElement: HTMLParagraphElement;

    constructor(func: any) {

        this.funcReference = func;

        let newCalculationButton = <HTMLButtonElement> document.getElementById('new-calculation-button');
        newCalculationButton.onclick = this.createNewCalculation.bind(this);

        this.calculationCountElement = <HTMLHeadElement> document.getElementById('calculation-count');
        this.calculationBufferElement = <HTMLParagraphElement> document.getElementById('calculation-buffer');
    }

    public createNewCalculation() {
        let connection = new WebSocket(SOCKET_ADDRESS);
        let calculation = new Calculation(connection, this.funcReference, this.valueCalculated.bind(this));
        this.calculations.push(calculation);

        this.calculationCountElement.innerHTML = this.calculations.length.toString();
    }

    private valueCalculated(input: number, output: number) {
        this.calculationBufferElement.innerHTML = `<i>fib(${input})</i> = ${output}<hr>` + this.calculationBufferElement.innerHTML;
    }
}