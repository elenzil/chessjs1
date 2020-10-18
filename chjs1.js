
var CHESS_OPTS = {
    "viewAsWhite" : true,
}


function GetPositionName(oneBasedRow, oneBasedCol) {
    if (!CHESS_OPTS.viewAsWhite) {
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

function ResetBoardToStockBeginning() {
    SetBoardStateFromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
}

function OnLoad() {
    ResetBoardToStockBeginning();
}

function FlipBoard() {
    CHESS_OPTS.viewAsWhite = !CHESS_OPTS.viewAsWhite;
    ResetBoardToStockBeginning();
}