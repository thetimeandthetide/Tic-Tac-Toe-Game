let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg");
let msgs = document.querySelector("#ms");
let turnO = true;
let count = 0;

// Fixed: last pattern was [6,7,9] — index 9 doesn't exist. Corrected to [6,7,8]
const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]  // <-- was [6,7,9], which is invalid
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        // Fixed: only call checkwinner once and use its return value
        let isWinner = checkwinner();

        if (count === 9 && !isWinner) {
            gamedraw();
        }
    });
});

const gamedraw = () => {
    msgs.innerText = "Game was a Draw";
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msgs.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of win) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;
        if (p1 !== "" && p2 !== "" && p3 !== "") {
            if (p1 === p2 && p2 === p3) {
                showWinner(p1);
                return true;
            }
        }
    }
    return false;
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    msgcontainer.classList.add("hide");
    count = 0; // Fixed: moved outside the loop — only needs to reset once
};

const resetGame = () => {
    turnO = true;
    enableboxes();
};

newgame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);