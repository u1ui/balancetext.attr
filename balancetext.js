//import {SelectorObserver} from 'https://cdn.jsdelivr.net/gh/u1ui/SelectorObserver.js@3.4.0/SelectorObserver.min.js'
import {SelectorObserver} from 'https://cdn.jsdelivr.net/gh/u1ui/SelectorObserver.js@3.6.0/SelectorObserver.min.js'

const resizeObs = new ResizeObserver(entries => {
    for (const entry of entries) balanceText(entry.target);
});

const selObs = new SelectorObserver({
    on(el){
        if (el.isContentEditable) return;
        resizeObs.observe(el);
        balanceText(el);
    },
    off(el){
        resizeObs.unobserve(el);
    }
});
selObs.observe('[u1-balancetext]');


function balanceAll(){
    for (let el of selObs.targets) balanceText(el);
}
document.addEventListener('DOMContentLoaded',balanceAll, {once:true});
document.addEventListener('load',balanceAll, {once:true});


function balanceText(el){
    require('https://cdn.jsdelivr.net/npm/balance-text@3.3.1/balancetext.min.js').then(balText=>{
        balText(el);
        balanceText = balText;
    });
}

/*
require('https://cdn.jsdelivr.net/npm/balance-text@3.3.1/balancetext.min.js').then(balText=>{
    balText('[u1-balancetext]', {watch:true});
});
*/
async function require(path){
    window.module = {exports:{}};
    await import(path);
    return module.exports;
}
