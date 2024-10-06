export default function wait(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export const DEFAULT_WAIT_TIME = 2000;
