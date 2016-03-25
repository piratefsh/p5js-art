import p5Src from 'file!p5';

export default function init() {
    const p5Script = document.createElement('script');
    p5Script.setAttribute('src', p5Src);
    document.body.appendChild(p5Script);
}