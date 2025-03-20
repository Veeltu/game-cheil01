// mypoints.js
export const MyPoints = () => {
    const state = {
        myPointsAmount: 0
    };

    const handler = {
        set(target, prop, value) {
            if (prop === 'myPointsAmount') {
                if (typeof value === 'number' && value >= 0) {
                    target[prop] = value;
                    render(); // Call render function to update the UI
                }
            }
            return true;
        }
    };

    const proxyState = new Proxy(state, handler);

    const render = () => {
        document.getElementById('pointsDisplay').innerText = `Current Points: ${proxyState.myPointsAmount}`;
    };

    return {
        getPoints: () => proxyState.myPointsAmount,
        addPoints: (amount) => {
            if (amount > 0) {
                proxyState.myPointsAmount += amount;
            }
        },
        subtractPoints: (amount) => {
            if (amount > 0 && proxyState.myPointsAmount >= amount) {
                proxyState.myPointsAmount -= amount;
            }
        }
    };
};

