/* Tiny synthesised sound effects (no audio files). KR.sfx.play(name) */
(function(){
  var ctx=null,muted=false,unlocked=false;
  try{muted=localStorage.getItem('kr-sound')==='off'}catch(e){}
  function ac(){if(!unlocked)return null;if(!ctx){var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A()}if(ctx.state==='suspended')ctx.resume();return ctx}
  function tone(f,t,dur,type,vol,slide){var c=ac();if(!c||muted||c.state!=='running')return;var o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,c.currentTime+t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,c.currentTime+t+dur);g.gain.setValueAtTime(0,c.currentTime+t);g.gain.linearRampToValueAtTime(vol||.08,c.currentTime+t+.006);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+t+dur);o.connect(g).connect(c.destination);o.start(c.currentTime+t);o.stop(c.currentTime+t+dur+.02)}
  function noise(t,dur,vol){var c=ac();if(!c||muted||c.state!=='running')return;var n=c.sampleRate*dur,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);var s=c.createBufferSource(),g=c.createGain(),f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;s.buffer=b;g.gain.value=vol||.12;s.connect(f).connect(g).connect(c.destination);s.start(c.currentTime+t)}
  function air(m,v){m=m||1;v=v||1;var c=ac();if(!c||muted||c.state!=='running')return;var d=.45,n=c.sampleRate*d,b=c.createBuffer(1,n,c.sampleRate),x=b.getChannelData(0);for(var i=0;i<n;i++)x[i]=(Math.random()*2-1);
    var src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain(),t=c.currentTime;f.type='bandpass';f.Q.value=.8;f.frequency.setValueAtTime(350*m,t);f.frequency.exponentialRampToValueAtTime(1400*m,t+d*.6);f.frequency.exponentialRampToValueAtTime(700*m,t+d);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05*v,t+.12);g.gain.exponentialRampToValueAtTime(.0001,t+d);src.buffer=b;src.connect(f).connect(g).connect(c.destination);src.start(t);tone(1568*m,.05,.25,'sine',.006*v)}
  /* continuous soft 8-bit 'cloud' hum while dragging the carousel */
  var cl=null;
  function cloudStart(){return;var c=ac();if(!c||muted||c.state!=='running'||cl)return;var t=c.currentTime,o=c.createOscillator(),o2=c.createOscillator(),lfo=c.createOscillator(),ld=c.createGain(),f=c.createBiquadFilter(),g=c.createGain();
    o.type='triangle';o2.type='square';o.frequency.value=392;o2.frequency.value=784;lfo.frequency.value=5.2;ld.gain.value=7;lfo.connect(ld);ld.connect(o.frequency);ld.connect(o2.frequency);
    f.type='lowpass';f.frequency.value=1100;var g2=c.createGain();g2.gain.value=.12;o.connect(f);o2.connect(g2);g2.connect(f);f.connect(g);g.connect(c.destination);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.022,t+.18);o.start(t);o2.start(t);lfo.start(t);cl={o:o,o2:o2,lfo:lfo,g:g,c:c}}
  function cloudSet(m){if(!cl)return;var t=cl.c.currentTime;cl.o.frequency.setTargetAtTime(392*m,t,.12);cl.o2.frequency.setTargetAtTime(784*m,t,.12)}
  function cloudStop(){if(!cl)return;var x=cl,t=x.c.currentTime;cl=null;x.g.gain.cancelScheduledValues(t);x.g.gain.setTargetAtTime(0,t,.09);setTimeout(function(){try{x.o.stop();x.o2.stop();x.lfo.stop()}catch(e){}},600)}
  function warpSnd(){var c=ac();if(!c||muted||c.state!=='running')return;var T0=c.currentTime,d=2.1;
    var o=c.createOscillator(),o2=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type='sawtooth';o2.type='square';
    o.frequency.setValueAtTime(70,T0);o.frequency.exponentialRampToValueAtTime(520,T0+d);o2.frequency.setValueAtTime(140,T0);o2.frequency.exponentialRampToValueAtTime(1040,T0+d);
    f.type='lowpass';f.frequency.setValueAtTime(300,T0);f.frequency.exponentialRampToValueAtTime(3200,T0+d);
    g.gain.setValueAtTime(0,T0);g.gain.linearRampToValueAtTime(.05,T0+.5);g.gain.linearRampToValueAtTime(.07,T0+d-.2);g.gain.exponentialRampToValueAtTime(.0001,T0+d+.15);
    o.connect(f);o2.connect(f);f.connect(g);g.connect(c.destination);o.start(T0);o2.start(T0);o.stop(T0+d+.2);o2.stop(T0+d+.2);
    var n=c.sampleRate*d,b=c.createBuffer(1,n,c.sampleRate),x=b.getChannelData(0);for(var i=0;i<n;i++)x[i]=Math.random()*2-1;
    var src=c.createBufferSource(),bf=c.createBiquadFilter(),ng=c.createGain();bf.type='bandpass';bf.Q.value=1.2;bf.frequency.setValueAtTime(400,T0);bf.frequency.exponentialRampToValueAtTime(5000,T0+d);
    ng.gain.setValueAtTime(0,T0);ng.gain.linearRampToValueAtTime(.05,T0+d*.8);ng.gain.exponentialRampToValueAtTime(.0001,T0+d+.1);src.buffer=b;src.connect(bf).connect(ng).connect(c.destination);src.start(T0)}
  var S={
    hover:function(){tone(1600,0,.035,'sine',.025)},
    padA:function(){tone(660,0,.06,'square',.05);tone(990,.05,.1,'square',.045);noise(0,.03,.04)},
    warp:function(){warpSnd()},
    plouf:function(){tone(1100,0,.22,'sine',.09,180);tone(520,.06,.18,'sine',.05,140);noise(.02,.25,.06);[1568,1976,2349].forEach(function(f,i){tone(f,.18+i*.05,.08,'sine',.02)})},
    air:function(){air()},
    airAt:function(m,v){air(m,v)},
    click:function(){tone(520,0,.06,'triangle',.07);tone(1040,.02,.05,'sine',.04)},
    toggle:function(){tone(400,0,.08,'sine',.06,760)},
    jump:function(){tone(330,0,.12,'square',.05,660)},
    bonus:function(){tone(660,0,.09,'triangle',.07);tone(880,.08,.09,'triangle',.07);tone(1320,.16,.14,'triangle',.08)},
    break:function(){noise(0,.14,.14);tone(180,0,.12,'sawtooth',.05,80)},
    over:function(){tone(440,0,.18,'triangle',.08,330);tone(330,.18,.2,'triangle',.08,220);tone(220,.38,.4,'triangle',.08,110)},
    record:function(){[523,659,784,1047].forEach(function(f,i){tone(f,i*.09,.16,'triangle',.08)})},
    heal:function(){[659,784,988,1319,1568].forEach(function(f,i){tone(f,i*.045,.09,'square',.03)});tone(1976,.24,.22,'triangle',.05);tone(2637,.3,.18,'sine',.03)},
    hurt:function(){[523,466,392,349].forEach(function(f,k){tone(f/2,k*.11,.16,'square',.035)});[175,147,131].forEach(function(f,k){tone(f,.5+k*.04,.7,'triangle',.06)});tone(98,.52,.8,'sine',.05)},
    ouch:function(){tone(330,0,.1,'square',.04,220);tone(247,.08,.14,'triangle',.05,160)},
    stage0:function(){noise(0,.12,.08);tone(220,0,.09,'square',.04,140);tone(180,.08,.1,'square',.035,110)},
    stage1:function(){[523,659,784].forEach(function(f,i){tone(f,i*.06,.08,'square',.035)})},
    stage2:function(){[392,523,659,784,988].forEach(function(f,i){tone(f,i*.05,.07,'square',.03)})},
    stage3:function(){[523,659,784,1047].forEach(function(f,k){tone(f,k*.08,.09,'square',.03)});[988,1047].forEach(function(f,k){tone(f,.42+k*.1,.12,'square',.03)});[262,330,392,523].forEach(function(f,k){tone(f,.62+k*.03,.6,'triangle',.045)});tone(1319,.66,.5,'sine',.02)}
  };
  function unlock(){if(unlocked)return;unlocked=true;ac();var h=document.getElementById('kr-snd-hint');if(h){h.classList.add('bye');setTimeout(function(){h.remove()},400)}}
  ['pointerdown','keydown','touchend'].forEach(function(ev){document.addEventListener(ev,unlock,{capture:true,passive:true})});
  /* small hint while the browser keeps sound locked */
  function hint(){if(unlocked||muted||document.getElementById('kr-snd-hint')||!document.body)return;var fr=(document.documentElement.lang||'fr').indexOf('en')!==0;
    var b=document.createElement('button');b.id='kr-snd-hint';b.type='button';b.setAttribute('data-silent','');b.textContent=fr?'🔊 Cliquez pour activer le son':'🔊 Click to turn sound on';
    var st=document.createElement('style');st.textContent='#kr-snd-hint{position:fixed;left:16px;bottom:16px;z-index:60;border:1px solid rgba(12,58,62,.18);background:#FAF7F0;color:#0C3A3E;font:600 13px/1 Archivo,system-ui,sans-serif;padding:10px 14px;border-radius:999px;box-shadow:0 10px 24px -12px rgba(12,58,62,.45);cursor:pointer;animation:krh .5s 1.2s both;transition:opacity .35s,transform .35s}#kr-snd-hint.bye{opacity:0;transform:translateY(10px)}@keyframes krh{from{opacity:0;transform:translateY(10px)}}';
    document.head.appendChild(st);document.body.appendChild(b)}

  window.KR=window.KR||{};
  window.KR.sfx={cloud:{start:cloudStart,set:cloudSet,stop:cloudStop},play:function(n,a,b){try{S[n]&&S[n](a,b)}catch(e){}},mute:function(m){muted=!!m;try{localStorage.setItem('kr-sound',m?'off':'on')}catch(e){}},isMuted:function(){return muted}};
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
  document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('a,button');if(!el||el.dataset.silent!=null||el.closest('.foot,[data-silent],.c-marquee'))return;uiClick(el)},true);
  /* Hover sounds only on the top menu, never while the page is scrolling (it fired by itself under the cursor). */
  var lastScroll=0;window.addEventListener('scroll',function(){lastScroll=Date.now()},{passive:true});
  document.addEventListener('mouseover',function(e){if(Date.now()-lastScroll<500)return;var cd=e.target.closest&&e.target.closest('.c-game-in');if(cd&&!cd._a&&!(e.relatedTarget&&cd.contains(e.relatedTarget))){cd._a=1;setTimeout(function(){cd._a=0},600);tone(988,0,.07,'square',.03);tone(1319,.07,.22,'square',.028)}},true);
  document.addEventListener('mouseover',function(e){if(Date.now()-lastScroll<500)return;var el=e.target.closest&&e.target.closest('.nav a.l,.nav .li');if(!el||el._h)return;el._h=1;setTimeout(function(){el._h=0},300);var i=navIdx(el);if(i>-1)navNote(i,true);else tone(rnd(1450,1750),0,.035,'sine',.02)},true);
})();
