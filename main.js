// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let typeCount = 0;

// インデックスを管理する変数
let currentIndex = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typeCountField = document.getElementById('typeCount');

// 複数のテキストを格納する配列
const textLists = [
    "Hey there! Got 30 seconds?",
    "I'm Misa, and this is my first typing game!",
    "I create clean and user-friendly websites.",
    "Type fast, learn about me, and let's have fun!"
];

// ランダムなテキストを表示
const createText = () => {

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    // 配列の最後まで表示したら最初に戻る
    if (currentIndex >= textLists.length) {
        currentIndex = 0; // 最初に戻す
    }

    // 現在のインデックスのテキストを取得し画面に表示
    untyped = textLists[currentIndex];
    untypedfield.textContent = untyped;

    // 次のテキストに進むためにインデックスをインクリメント
    currentIndex++;
};

// キー入力の判定
const keyPress = e => {

    // 誤タイプの場合
    if(e.key !== untyped.substring(0,1)) {
        wrap.classList.add('mistyped');
        // 100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }

    // 正タイプの場合

    // スコアのインクリメント
    score++;
    typeCount++; // タイプ数をインクリメント
    typeCountField.textContent = typeCount; // タイプ数を更新
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 80) {
        text = `Your rank is C.\nYou need ${80 - score} more points to reach B rank.`;
    } else if(score < 120) {
        text = `Your rank is B.\nYou need ${120 - score} more points to reach A rank.`;
    } else if(score < 157) {
        text = `Your rank is A.\nYou need ${157- score} more points to reach S rank.`;    
    } else if(score >= 157) {
        text =`Your rank is S.\nCongratulations!`;    
    }

    // 生成したメッセージと一緒に文字列を返す
    return `${score} points typed!\n${text}\n[OK] Retry / [Cancel] Quit`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);

        // 「タイムアップ！」を表示
        typedfield.textContent = ''; // 既存のtypedフィールドをクリア
        untypedfield.innerHTML = "Great job!<br>You learned a bit about me :)";

    // 「タイムアップ！」表示の100ミリ秒後にゲーム判定結果のダイアログを表示
    setTimeout(() => {
        const result = confirm(rankCheck(score));

        // OKボタンをクリックされたらリロードする
        if(result == true) {
            window.location.reload();
        }
    }, 100);
};

// カウントダウンタイマー
const timer = () => {

    // タイマー部分のHTML要素（p要素）を取得する
    let time = count.textContent;

    const id = setInterval(() => {

        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止する
        if(time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

    // カウントダウンタイマーを開始する
    timer();
    
    // ランダムなテキストを表示する
    createText();

    // 「スタート」ボタンを非表示にする
    start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent ='Press the Start button to begin!';
