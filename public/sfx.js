/* Tiny synthesised sound effects (no audio files). KR.sfx.play(name) */
(function(){
  var ctx=null,muted=false;
  try{muted=localStorage.getItem('kr-sound')==='off'}catch(e){}
  function ac(){if(!ctx){var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A()}if(ctx.state==='suspended')ctx.resume();return ctx}
  function tone(f,t,dur,type,vol,slide){var c=ac();if(!c||muted)return;var o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,c.currentTime+t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,c.currentTime+t+dur);g.gain.setValueAtTime(0,c.currentTime+t);g.gain.linearRampToValueAtTime(vol||.08,c.currentTime+t+.006);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+t+dur);o.connect(g).connect(c.destination);o.start(c.currentTime+t);o.stop(c.currentTime+t+dur+.02)}
  function noise(t,dur,vol){var c=ac();if(!c||muted)return;var n=c.sampleRate*dur,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);var s=c.createBufferSource(),g=c.createGain(),f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;s.buffer=b;g.gain.value=vol||.12;s.connect(f).connect(g).connect(c.destination);s.start(c.currentTime+t)}
  function air(){var c=ac();if(!c||muted)return;var d=.45,n=c.sampleRate*d,b=c.createBuffer(1,n,c.sampleRate),x=b.getChannelData(0);for(var i=0;i<n;i++)x[i]=(Math.random()*2-1);
    var src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain(),t=c.currentTime;f.type='bandpass';f.Q.value=.8;f.frequency.setValueAtTime(350,t);f.frequency.exponentialRampToValueAtTime(1400,t+d*.6);f.frequency.exponentialRampToValueAtTime(700,t+d);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+.12);g.gain.exponentialRampToValueAtTime(.0001,t+d);src.buffer=b;src.connect(f).connect(g).connect(c.destination);src.start(t);tone(1568,.05,.25,'sine',.006)}
  var S={
    hover:function(){tone(1600,0,.035,'sine',.025)},
    air:function(){air()},
    click:function(){tone(520,0,.06,'triangle',.07);tone(1040,.02,.05,'sine',.04)},
    toggle:function(){tone(400,0,.08,'sine',.06,760)},
    jump:function(){tone(330,0,.12,'square',.05,660)},
    bonus:function(){tone(660,0,.09,'triangle',.07);tone(880,.08,.09,'triangle',.07);tone(1320,.16,.14,'triangle',.08)},
    break:function(){noise(0,.14,.14);tone(180,0,.12,'sawtooth',.05,80)},
    over:function(){tone(440,0,.18,'triangle',.08,330);tone(330,.18,.2,'triangle',.08,220);tone(220,.38,.4,'triangle',.08,110)},
    record:function(){[523,659,784,1047].forEach(function(f,i){tone(f,i*.09,.16,'triangle',.08)})},
    heal:function(){[659,784,988,1319,1568].forEach(function(f,i){tone(f,i*.045,.09,'square',.03)});tone(1976,.24,.22,'triangle',.05);tone(2637,.3,.18,'sine',.03)},
    stage0:function(){noise(0,.12,.08);tone(220,0,.09,'square',.04,140);tone(180,.08,.1,'square',.035,110)},
    stage1:function(){[523,659,784].forEach(function(f,i){tone(f,i*.06,.08,'square',.035)})},
    stage2:function(){[392,523,659,784,988].forEach(function(f,i){tone(f,i*.05,.07,'square',.03)})},
    stage3:function(){[523,659,784,1047].forEach(function(f,k){tone(f,k*.08,.09,'square',.03)});[988,1047].forEach(function(f,k){tone(f,.42+k*.1,.12,'square',.03)});[262,330,392,523].forEach(function(f,k){tone(f,.62+k*.03,.6,'triangle',.045)});tone(1319,.66,.5,'sine',.02)}
  };
  window.KR=window.KR||{};
  window.KR.sfx={play:function(n){try{S[n]&&S[n]()}catch(e){}},mute:function(m){muted=!!m;try{localStorage.setItem('kr-sound',m?'off':'on')}catch(e){}},isMuted:function(){return muted}};
  /* UI sounds on the site. Nav links each get their own note of a pentatonic scale,
     so clicking through the menu plays a small melody; other clicks vary slightly. */
  var SCALE=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.51];
  function navIdx(el){var l=[].slice.call(document.querySelectorAll('.nav a.l'));return l.indexOf(el)}
  function rnd(a,b){return a+Math.random()*(b-a)}
  function navNote(i,soft){var f=SCALE[i%SCALE.length]/2;if(soft){tone(f,0,.05,'sine',.018);return}
    tone(f,0,.11,'triangle',.06);tone(f*1.5,.03,.08,'sine',.018)}
  function uiClick(el){
    var i=navIdx(el);if(i>-1)return navNote(i);
    if(el.classList.contains('logo')){[0,2,4].forEach(function(k,j){tone(SCALE[k],j*.05,.14,'triangle',.06)});return}
    if(el.classList.contains('li')){tone(659.25,0,.08,'sine',.06);tone(987.77,.06,.14,'sine',.06);return}
    if(el.classList.contains('cta')||el.classList.contains('p')){tone(523.25,0,.1,'triangle',.07);tone(783.99,.05,.1,'triangle',.06);tone(1046.5,.1,.16,'sine',.05);return}
    if(el.classList.contains('ic')){tone(rnd(700,820),0,.05,'sine',.06,rnd(1100,1300));return}
    var f=rnd(470,580);tone(f,0,.06,'triangle',.07);tone(f*2,.02,.05,'sine',.04)}
  document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('a,button');if(!el||el.dataset.silent!=null||el.closest('.foot,[data-silent]'))return;uiClick(el)},true);
  /* Hover sounds only on the top menu, never while the page is scrolling (it fired by itself under the cursor). */
  var lastScroll=0;window.addEventListener('scroll',function(){lastScroll=Date.now()},{passive:true});
  document.addEventListener('mouseover',function(e){if(Date.now()-lastScroll<500)return;var cd=e.target.closest&&e.target.closest('.pr,.sk-cat,.pc,.c-aud-l button,.c-game-in');if(cd&&!cd._a&&!(e.relatedTarget&&cd.contains(e.relatedTarget))){cd._a=1;setTimeout(function(){cd._a=0},600);air()}},true);
  document.addEventListener('mouseover',function(e){if(Date.now()-lastScroll<500)return;var el=e.target.closest&&e.target.closest('.nav a.l,.nav .li');if(!el||el._h)return;el._h=1;setTimeout(function(){el._h=0},300);var i=navIdx(el);if(i>-1)navNote(i,true);else tone(rnd(1450,1750),0,.035,'sine',.02)},true);
})();
