'use strict';

(function initLogo() {
    bindEvents();
    placeCursor();
})()

function placeCursor() {
    const $logo = document.querySelector('[data-logo]');
    const logoText = $logo.text;
    const logoSpans = logoText.split('').map(spanify).join('');

    $logo.innerHTML = logoSpans;
}

function spanify(ch) {
    const isCap = ch !== ch.toLowerCase();
    const className = isCap ? 'logo__active' : '';
    const dataName = isCap ? 'data-active-char' : '';
    return `<span class="${className}" ${dataName}>${ch}</span>`;
}

function bindEvents() {
    document.addEventListener('keydown', moveCursor);
}

function moveCursor(e) {
    const $activeChar = document.querySelector('[data-active-char]');

    if (isArrow(e.which, 'left')) {
        const $prevSibling = $activeChar.previousSibling;
        $prevSibling && transferCursor($activeChar, $prevSibling); // Only transfer if has prevSibling
    } else if (isArrow(e.which, 'right')) {
        const $nextSibling = $activeChar.nextSibling;
        $nextSibling && transferCursor($activeChar, $nextSibling); // Only transfer if has nextSibling
    }
}

function isArrow(keyCode, dir) {
    if (dir === 'left') {
        return keyCode === 37;
    } else if (dir === 'right') {
        return keyCode === 39;
    } else {
        return keyCode === 37 || e.which === 39;
    }
}

function transferCursor($from, $to) {
    $from.setAttribute('class', '');
    $from.removeAttribute('data-active-char');
    $to.setAttribute('class', 'logo__active');
    $to.setAttribute('data-active-char', true);
}
