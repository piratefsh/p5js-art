import p5Src from 'file!p5';
import p5Sound from 'file!p5/lib/p5.sound';

export default function init() {
    addScript(p5Src).onload = function(){
        addScript(p5Sound)
    }
}

function addScript(src){
    const p5Script = document.createElement('script');
    p5Script.setAttribute('src', src);
    document.body.appendChild(p5Script);
    return p5Script;
}