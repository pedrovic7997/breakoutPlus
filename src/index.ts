import {Bola} from './Bola';

const bola = new Bola(4, 4, 'red');

const el = document.createElement('div');

el.setAttribute('width', `${bola.width}`);
el.setAttribute('height', `${bola.height}`);
el.setAttribute('', `${bola.height}`);

document.appendChild(el);
