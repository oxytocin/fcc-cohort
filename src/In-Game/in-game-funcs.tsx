

// changes answer cards to indicate correct answer after time expires
export function displayCorrect (elements: HTMLCollection, correctArray: boolean[]) {
    for (let i = 0; i < elements.length; i++) {
        const elementClass = elements[i].classList;
        if (correctArray[i] === true) {
            elementClass.remove("bg-light");
            elementClass.add("bg-success");
        }
    };
};

export function unmarkCorrect (elements: HTMLCollection) {
    for (let i = 0; i < elements.length; i++) {
        const elementClass = elements[i].classList;
        elementClass.add("bg-light");
        elementClass.remove("bg-success");
    };
};

export function checkAns(correctArray: boolean[], userAnswer: boolean[]) {
    for (let i = 0; i < correctArray.length; i++) {
        if (!correctArray[i] === (userAnswer[i])) {
            return false
        }
    }
    return true
};