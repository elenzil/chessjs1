
var gChess = {
    options: {
        viewAsWhite : true,
    },

    allFENCodes: ['p', 'r', 'n', 'b', 'q', 'k', 'P', 'R', 'N', 'B', 'Q', 'K'],

    pieces: [],
}

function gebid(id) {
    return document.getElementById(id);
}

function InitializeStandardChessPieces(containerElement) {
    const pieces = gChess.pieces = [];

    const keys = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
                  'r', 'r', 'n', 'n', 'b', 'b', 'q', 'k',
                  'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
                  'R', 'R', 'N', 'N', 'B', 'B', 'Q', 'K',];

    for (var n = 0; n < keys.length; ++n) {
        const key = keys[n];
        const el = document.createElement("img");
        el.className = 'piece';
        el.src = GetImagePathForFENCode(key);
        containerElement.appendChild(el);

        const piece = {
            "FEN": key,
            "element": el,
            "taken": true,
            "dest": [n * 50, n * 50],
        }

        gChess.pieces[gChess.pieces.length] = piece;
    }
}

function GetPositionName(oneBasedRow, oneBasedCol) {
    if (!gChess.options.viewAsWhite) {
        oneBasedRow = 9 - oneBasedRow;
        oneBasedCol = 9 - oneBasedCol;
    }
    const colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return colNames[oneBasedCol - 1] + oneBasedRow;
}

function GetPieceholderID(row, col) {
    return 'cell_' + GetPositionName(row, col);
}

function GetPieceholderDiv(row, col) {
    return document.getElementById(GetPieceholderID(row, col));
}

function ClearAllPieces() {
    for (var row = 1; row <= 8; ++row) {
        for (var col = 1; col <= 8; ++col) {
            const ph = GetPieceholderDiv(row, col);
            ph.innerHTML = '';
        }
    }
}

function GetImagePathForFENCode(c) {
    const coreMap = {
        "r" : "rd",
        "n" : "nd",
        "b" : "bd",
        "q" : "qd",
        "k" : "kd",
        "p" : "pd",
        "R" : "rl",
        "N" : "nl",
        "B" : "bl",
        "Q" : "ql",
        "K" : "kl",
        "P" : "pl",
    }

    const pieceCore = coreMap[c];
    const filename  = "Chess_" + pieceCore + "t60.png";
    const path      = "assets/" + filename;
    return path;
}

function SetBoardStateFromFEN(FEN) {
    var row = 8;
    var col = 1;

    ClearAllPieces();

    while ((FEN.length > 0) && (row > 0)) {
        const op = FEN[0];
        FEN = FEN.substring(1);

        if (op == '/' || col > 8) {
            row -= 1;
            col  = 1;
        }
        else if (op >= '1' && op <= '8') {
            col += parseInt(op);
        }
        else {
            const ph = GetPieceholderDiv(row, col);
            ph.innerHTML = "<img class='piece' src='" + GetImagePathForFENCode(op) + "'/>";
            col += 1;
        }
    }
}

function GetNumberOfTakenPieces() {
    var ret = 0;
    gChess.pieces.array.forEach(element => {
        if (element.isTaken) {
            ret += 1;
        }
    });
    return ret;
}

function GetPieceBoxCellId(index) {
    "pieceBoxCell_" + n;
}

function GetPieceBoxCell(index) {
    return gebid(GetPieceBoxCellId(n));
}

function GetNextAvailablePieceBoxCell() {
    return GetPieceBoxCell(GetNumberOfTakenPieces() % (8 * 3));
}

function ResetBoardToStockBeginning() {
    InitializeStandardChessPieces(gebid('piecesLayer'));
  //  SetBoardStateFromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
}

function OnLoad() {
    ResetBoardToStockBeginning();
    window.requestAnimationFrame(Tick);
}

function FlipBoard() {
    gChess.options.viewAsWhite = !gChess.options.viewAsWhite;
    ResetBoardToStockBeginning();
}

let FirstTickTime;
function Tick(timestamp) {

    timestamp /= 1000;

    if (FirstTickTime === undefined) {
        FirstTickTime = timestamp;
    }

    const dt = timestamp - FirstTickTime;

    for (var n = 0; n < gChess.pieces.length; ++n) {
        const piece = gChess.pieces[n];
        const el    = piece.element;
        const rect = el.getBoundingClientRect();
        el.style.left = (Math.cos(n + dt / 2 * (1 + n/22.1)) * 0.5 + 0.5) * 640;
        el.style.top  = (Math.sin(n + dt / 2 * (1 + n/12.1)) * 0.5 + 0.5) * 640;
    }

    window.requestAnimationFrame(Tick);
}